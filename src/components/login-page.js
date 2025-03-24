import { LitElement, html, css } from "lit";
import { Task } from "@lit/task";
export class LoginPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      max-width: 400px;
      margin: 20px auto;
      padding: 20px;
      border-radius: 10px;
      justify-content: center;
      align-items: center;
    }

    h2 {
      text-align: center;
      color: #ffffff;
      margin-bottom: 20px;
      font-size: 24px;
      font-weight: 600;
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    @media (max-width: auto) {
      :host {
        padding: 10px;
        margin: 10px;
      }

      h2 {
        font-size: 26px;
      }
    }
  `;

  static properties = {
    data: {
      type: Object,
    },

    user: {
      type: Object,
    },
  };
  constructor() {
    super();
    this.data = [];
    this.user = {
      username: "",
      password: "",
    };
  }

  _getDataTask = new Task(this, {
    task: async () => {
      const response = await fetch(`http://localhost:3000/users`);
      const data = await response.json();
      if (Array.isArray(data)) { 
        this.data = data;
      } else {
        console.error("La respuesta del servidor no es un array:", data);
        this.data = [];
      }
    },
    args: () => [],
  });

  connectedCallback() {
    super.connectedCallback();
    this._getDataTask.run();
  }

  _handleLogin() {
    const { username, password } = this.user;
    if (!username && !password) {
      return;
    }
  
    if (!Array.isArray(this.data)) {  
      console.error("this.data no es un array:", this.data);
      return;
    }

    const dataFindUser = this.data.find(
      (user) => username === user.username && password === user.password
    );

    if (dataFindUser) {
      const loginSuccess = new CustomEvent("onLoginSuccess", {
        detail: {
          name: "loginSuccess",
          value: dataFindUser,
        },
      });
      this.dispatchEvent(loginSuccess);
    } else {
      alert("credenciales invalidas");
    }
  }
  _onclick() {
    console.log(this.data);
  }

  _handleUserLogin(e) {
    const { name, value } = e.detail;
    this.user = { ...this.user, [name]: value };
  }

  render() {
    return html`
      <header></header>
      <h2>Iniciar Sesión</h2>
      <section class="form">
        <username-input
          @onUserChange="${this._handleUserLogin}"
        ></username-input>
        <password-input
          @onPasswordChange="${this._handleUserLogin}"
        ></password-input>
        <login-button @onLogin="${this._handleLogin}"></login-button>
      </section>
    `;
  }
}

export class UsernameInput extends LitElement {
  static styles = css`
    label {
      display: flex;
      margin-bottom: 10px;
      color: #ffffff;
      font-size: 14px;
      font-weight: 500;
    }

    input {
      width: 92%;
      padding: 10px;
      border: 1px solid #d5cccc;
      border-radius: 0px;
      font-size: 14px;
      transition: border-color 0.3s ease;
    }

    input:focus {
      border-color: #007bff;
      outline: none;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }

    @media (max-width: auto) {
      input {
        font-size: 14px;
        padding: 10px;
      }
    }
  `;

  static properties = {
    username: { type: String },
  };

  constructor() {
    super();
    this.username = "";
  }

  handleUsernameChange(event) {
    this.username = event.target.value;
    const userLogin = new CustomEvent("onUserChange", {
      detail: {
        name: "username",
        value: this.username,
      },
    });
    this.dispatchEvent(userLogin);
  }

  render() {
    return html`
      <label for="username">Usuario: </label>
      <input
        type="text"
        id="username"
        .value="${this.username}"
        @input="${this.handleUsernameChange}"
      />
    `;
  }
}

export class PasswordInput extends LitElement {
  static styles = css`
    label {
      display: flex;
      margin-top: 10px;
      margin-bottom: 10px;
      color: #ffffff;
      font-size: 14px;
      font-weight: 500;
    }

    input {
      width: 92%;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #d5cccc;
      border-radius: 0px;
      font-size: 14px;
      transition: border-color 0.3s ease;
    }

    @media (max-width: auto) {
      input {
        font-size: 14px;
        padding: 10px;
      }
    }
  `;

  static properties = {
    password: { type: String },
  };

  constructor() {
    super();
    this.password = "";
  }

  handlePasswordChange(event) {
    this.password = event.target.value;
    const passwordLogin = new CustomEvent("onPasswordChange", {
      detail: {
        name: "password",
        value: this.password,
      },
    });
    this.dispatchEvent(passwordLogin);
  }

  render() {
    return html`
      <label for="password">Contraseña: </label>
      <input
        type="text"
        id="password"
        .value="${this.password}"
        @input="${this.handlePasswordChange}"
      />
    `;
  }
}

export class LoginButton extends LitElement {
  static styles = css`
    button {
      width: 250px;
      padding: 10px;
      background-color: #ffffff;
      color: #0e3470fb;
      border: none;
      border-radius: 0px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
    }

    button:active {
      background-color: #0057b3a5;
      transition: background-color 0.05s ease;
    }

    @media (max-width: quto) {
      button {
        font-size: 14px;
      }
    }
  `;

  static properties = {
    username: { type: String },
    password: { type: String },
  };

  constructor() {
    super();
    this.username = "";
    this.password = "";
  }

  handleUsernameChange(event) {
    this.username = event.target.value;
  }

  handlePasswordChange(event) {
    this.password = event.target.value;
  }

  handleLogin() {
    const event = new CustomEvent("onLogin");
    this.dispatchEvent(event);
  }

  render() {
    return html` <button @click="${this.handleLogin}">Iniciar Sesión</button> `;
  }
}
