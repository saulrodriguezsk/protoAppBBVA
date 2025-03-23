import { LitElement, html, css } from "lit";

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

  render() {
    return html`
      <header></header>
      <h2>Iniciar Sesión</h2>
      <section class="form">
        <username-input></username-input>
        <password-input></password-input>
        <login-button></login-button>
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
    if (this.username && this.password) {
      alert(`Usuario: ${this.username} \n Contraseña: ${this.password}`);
    } else {
      alert("Completa todos los campos");
    }
  }

  render() {
    return html` <button @click="${this.handleLogin}">Iniciar Sesión</button> `;
  }
}
