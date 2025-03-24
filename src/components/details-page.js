import { LitElement, html, css } from "lit";

export class Details extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: "Segoe UI", sans-serif;
      background-color: #0e3470fb;
      padding: 20px;
      min-height: 100vh;
      box-sizing: border-box;
    }

    .resumen img {
      width: 100%;
      max-width: 270px;
      height: 150px;
      border-radius: 0px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      background-color: #0e3470fb;
      cursor: pointer;
      transition: transform 0.3s ease;
    }

    .resumen img:hover {
      transform: scale(1.05);
    }

    .credit-imgcard {
      padding: 10px;
      background-color: #ffffff;
    }

    .resumen h3 {
      margin-top: 100px;
      font-size: 20px;
      color: #ffffff;
      margin-bottom: 10px;
    }

    .resumen p {
      margin: 20px 0;
      font-size: 16px;
      color: #ffffff;
    }

    .resumen p strong {
      color: #ffffff;
      font-size: 16px;
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

    @media (max-width: 480px) {
      .resumen {
        padding: 15px;
      }

      .resumen h3 {
        font-size: 20px;
      }

      .resumen p {
        font-size: 14px;
      }

      .back-button {
        padding: 10px;
      }
    }
  `;

  static properties = {
    account: {
      type: Object,
    },
    showFront: {
      type: Boolean,
    },
    isLoading: {
      type: Boolean,
    },
  };

  constructor() {
    super();
    this.account = {};
    this.showFront = true;
    this.isLoading = true;
  }

  connectedCallback() {
    super.connectedCallback();
    this.simulateisloading();
    this.loadAccountDetails();
  }

  simulateisloading() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  loadAccountDetails() {
    const params = new URLSearchParams(window.location.search);
    const accountId = params.get("id");
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => {
        this.account = data.account.find((account) => account.id === accountId);
      });
  }

  toggleImage() {
    this.showFront = !this.showFront;
  }

  goBackToDash() {
    const returnDashEvent = new CustomEvent('returnDash', {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(returnDashEvent);
  }

  render() {
    if (this.isLoading) {
      return html`<loading-page></loading-page>`;
    }

    const frontImage =
      "https://i.pinimg.com/474x/55/cc/0c/55cc0c5225f3024e2c13921c7691f48d.jpg";
    const backImage =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1pbB_Fs54rpBEI4xLLATn9sW5IBSpUqiF4YfsLeNMKZl7TYNsgIMXcZUyedxQLMKXkS8&usqp=CAU";

    return html`
      <section class="resumen">
        <button class="back-button" @click="${this.goBackToDash}">←</button>
        <section class="credit-imgcard">
          <img
            src="${this.showFront ? frontImage : backImage}"
            alt="card"
            @click="${this.toggleImage}"
          />
        </section>
        <h3>${this.account.type}</h3>
        <p><strong>Número:</strong> ${this.account.number}</p>
        <p><strong>Saldo disponible:</strong> ${this.account.balance}</p>
      </section>
    `;
  }
}
