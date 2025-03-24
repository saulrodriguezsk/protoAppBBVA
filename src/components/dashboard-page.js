import { LitElement, html, css } from "lit";

export class Dashboard extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: start;
      font-family: "Segoe UI", sans-serif;
      background-color: #0e3470fb;
      padding: 20px;
      min-height: 100vh;
    }

    h1 {
      color: white;
    }

    .screen-isloading {
      display: flex;
      justify-content: center;

      height: 100vh;
      font-size: 24px;
      color: #fffffffa;
      background-color: #ffffff00;
    }

    .account-card {
      color: #ffffff;
      border-radius: 15px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
      position: relative;
      overflow: hidden;
      font-family: "Arial", sans-serif;
      font-weight: bold;
    }

    .account-card::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url("https://i.pinimg.com/474x/55/cc/0c/55cc0c5225f3024e2c13921c7691f48d.jpg");
      background-size: cover;
      background-position: center;
      opacity: 0.3;
      z-index: 1;
    }

    .account-card .content {
      position: relative;
      z-index: 4;
    }

    .account-card .action-button {
      background-color: rgba(255, 255, 255, 0.1);
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 5px;
      padding: 8px 15px;
      margin-top: 15px;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.2s ease;
    }

    .account-card .action-button:hover {
      background-color: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }

    .account-card:hover {
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
      transform: translateY(-5px);
      transition: box-shadow 0.3s ease, transform 0.3s ease;
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
    const returnLogin = new CustomEvent("returnLogin", {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(returnLogin);
  }

  cardAccountClicked(account) {
    const cardAccountClicked = new CustomEvent("cardAccountClicked", {
      detail: {
        name: "CardAccountClicked",
        value: account,
      },
    });
    this.dispatchEvent(cardAccountClicked);
    console.log(cardAccountClicked);
  }

  render() {
    if (this.loading) {
      return html`<loading-page></loading-page>`;
    }

    const visibleaccounts = this.showAll
      ? this.dataUser.accounts
      : this.dataUser.accounts.slice(0, 3);

    return html`
      <h1>Bienvenido ${this.dataUser.name}</h1>
      <section>
        <button class="back-button" @click="${this.goBackToLogin}">←</button>
        ${visibleaccounts.map(
          (account) => html`
            <section
              @click="${() => {
                this.cardAccountClicked(account);
              }}"
              class="account-card"
            >
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
          : this.dataUser.accounts.length < 3
          ? ""
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
