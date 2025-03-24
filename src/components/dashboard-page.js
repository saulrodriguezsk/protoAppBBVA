import { LitElement, html, css } from "lit";

export class Dashboard extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: "Segoe UI", sans-serif;
      background-color: #0e3470fb;
      padding: 20px;
      min-height: 100vh;
    }

    .screen-isloading {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      font-size: 24px;
      color: #fffffffa;
      background-color: #ffffff00;
    }

    .account-card {
      background: linear-gradient(135deg, #007bff, #0056b3);
      color: white;
      border-radius: 10px;
      padding: 15px;
      margin-bottom: 15px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    .account-card h3 {
      margin: 0;
      font-size: 18px;
    }

    .account-card p {
      margin: 5px 0;
      font-size: 14px;
    }

    .load-more {
      display: block;
      width: 100%;
      padding: 10px;
      background-color: #ffffff;
      color: #0057b3;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 10px;
    }

    .load-less {
      display: block;
      width: 100%;
      padding: 10px;
      background-color: #ffffff;
      color: #0057b3;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 10px;
    }

    .load-more:hover {
      background-color: #0057b3;
      color: #fff;
    }

    .back-button {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 40px;
      height: 40px;
      padding: 0px;
      background-color: #0e3470fb;
      color: #ffffff;
      border: none;
      border-radius: 50%;
      font-size: 20px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: background-color 0.3s ease;
    }

    .back-button:hover {
      background-color: #0056b3;
    }
  `;
  static properties = {
    dataUser: {
      type: Object,
    },

    showAll: {
      type: Boolean,
    },
    loading: {
      type: Boolean,
    },

    account: {
      type: Object,
    },
  };

  constructor() {
    super();
    this.dataUser = {};
    this.showAll = false;
    this.loading = true;
    this.account = {};
  }

  connectedCallback() {
    super.connectedCallback();
    this._simulateLoading();
    console.log(this.dataUser);
  }

  _simulateLoading() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
  }

  goBackToLogin() {
    window.location.href = "./login-page.js";
  }

  cardAccountClicked(account) {
    const cardAccountClicked = new CustomEvent("cardAccountClicked", {
      detail: {
        name: "CardAccountClicked",
        value: account,
      },
    });
    this.dispatchEvent(cardAccountClicked);
  }

  render() {
    if (this.loading) {
      return html`<loading-page></loading-page>`;
    }

    const visibleaccounts = this.showAll
      ? this.dataUser.accounts
      : this.dataUser.accounts.slice(0, 3);

    return html`
      <section>
        <button class="back-button" @click="${this.goBackToLogin}">←</button>
        ${visibleaccounts.map(
          (account) => html`
            <section class="account-card">
              <h3>${account.typeAccount}</h3>
              <p>Número: ${account.accountNumber}</p>
              <p>Saldo: ${account.amount}</p>
            </section>
          `
        )}
        ${this.dataUser.accounts.length > 3 && !this.showAll
          ? html`
              <button class="load-more" @click="${this.toggleShowAll}">
                Ver más
              </button>
            `
          : html`
              <button class="load-less" @click="${this.toggleShowAll}">
                mostrar menos
              </button>
            `}
      </section>
    `;
  }

  /*   render() {
    if (this.loading) {
      return html`<loading-page></loading-page>`;
    }

    const visibleaccounts = this.showAll
      ? this.dataUser.accounts
      : this.dataUser.accounts.slice(0, 3);

    return html`
      <section>
        <button class="back-button" @click="${this.goBack}">←</button>
        ${visibleaccounts.map((account) => {
          return html`
            <section
              @click="${() => this.cardAccountClicked(account)}"
              class="account-card"
            >
              <h3>${account.typeAccount}</h3>
              <p>Número: ${account.accountNumber}</p>
              <p>Saldo: ${account.amount}</p>
            </section>
          `;
        })}
        ${this.dataUser.accounts.length > 3 && !this.showAll
          ? html`
              <button class="load-more" @click="${this.toggleShowAll}">
                Ver más
              </button>
            `
          : html`
              <button class="load-less" @click="${this.toggleShowAll}">
                mostrar menos
              </button>
            `}
      </section>
    `;
  } */
}
