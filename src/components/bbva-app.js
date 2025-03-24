import { LitElement, css, html } from "lit";

export class BbvaApp extends LitElement {
  static properties = {
    dataUser: {
      type: Object,
    },
    logged: {
      type: Boolean,
    },
  };

  constructor() {
    super();
    this.dataUser = {};
    this.logged = false;
    this.showDetails = false;
  }

  handleLoginSuccess(e) {
    const { value: userInfo } = e.detail;
    this.dataUser = { ...userInfo };
    this.logged = true;
  }

  handleLogout() {
    this.logged = false;
    this.dataUser = {};
    this.showDetails = false;
  }

  handleReturnDash() {
    this.showDetails = false;
  }

  render() {
    if (!this.logged) {
      return html`<login-page
        @onLoginSuccess="${this.handleLoginSuccess}"
      ></login-page>`;
    }
    return this.showDetails
      ? html`<details-page
          @returnDash="${this.handleReturnDash}"
        ></details-page>`
      : html`<dashboard-page
          .dataUser="${this.dataUser}"
          @onLogout="${this.handleLogout}"
        ></dashboard-page>`;
  }
}

/*
return !this.logged
      ? html` <login-page
          @onLoginSuccess="${this.handleLoginSuccess}"
        ></login-page>`
      : html`<dashboard-page
          .dataUser="${this.dataUser}"
          @cardAccountClicked="${(e) => {
            console.log(e);
          }}"
        ></dashboard-page>`;
  }
}

        
      : html`<dashboard-page .dataUser="${this.dataUser}"
      @onLogout="${this.handleLogout}"></dashboard-page>`;
    */
