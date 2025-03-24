import { LitElement, css, html } from "lit";

export class BbvaApp extends LitElement {
  static properties = {
    dataUser: {
      type: Object,
    },
    logged: {
      type: Boolean,
    },

    cardDataClicked: {
      type: Object,
    },
  };

  constructor() {
    super();
    this.dataUser = {};
    this.logged = false;
    this.cardDataClicked = true;
  }

  handleLoginSuccess(e) {
    const { value: userInfo } = e.detail;
    this.dataUser = { ...userInfo };
    this.logged = true;
  }
  render() {
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
