import { LitElement, html, css } from "lit";
import { Task } from "@lit/task";
export class LoginPage extends LitElement {
  static styles = css`
    header {
      background-image: url("https://www.contrapunto-fbbva.es/wp-content/uploads/sites/4/2019/11/fbbva_headerweb_cicloBilbao.jpg");
      background-size: cover;
      background-position: center;
      width: 100%;
      height: 150px;
      padding: 0px;
      margin: 0px;
    }

    :host {
      display: block;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      max-width: 400px;
      margin: 20px auto;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0px 0px 10px #0000ff46;
    }

    h2 {
      text-align: center;
      color: #090909;
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
        font-size: 20px;
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
    this.data = {};
    this.user = {
      username: "",
      password: "",
    };
  }

  _getDataTask = new Task(this, {
    task: async () => {
      const response = await fetch(`http://localhost:3000/users`);
      this.data = await response.json();
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
      display: block;
      margin-bottom: 8px;
      color: #4d4a4a;
      font-size: 14px;
      font-weight: 500;
    }

    input {
      width: 100%;
      padding: 10px;
      border: 1px solid #d5cccc;
      border-radius: 8px;
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
      <label for="username">Usuario o Correo: </label>
      <input
        type="text"
        id="username"
        .value="${this.username}"
        @input="${this.handleUsernameChange}"
        placeholder="Ingresa tu usuario o correo..."
      />
    `;
  }
}

export class PasswordInput extends LitElement {
  static styles = css`
    label {
      display: block;
      margin-top: 8px;
      margin-bottom: 8px;
      color: #4d4a4a;
      font-size: 14px;
      font-weight: 500;
    }

    input {
      width: 100%;
      padding: 12px;
      border: 1px solid #d5cccc;
      border-radius: 8px;
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
        placeholder="Ingresa tu contraseña"
      />
    `;
  }
}

export class LoginButton extends LitElement {
  static styles = css`
    button {
      width: 100%;
      padding: 12px;
      background-color: #007bff;
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: #0056b3;
    }

    @media (max-width: quto) {
      button {
        font-size: 14px;
        padding: 10px;
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
