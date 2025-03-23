import { LitElement, html, css  } from "lit";

export class Dashboard extends LitElement {
    static styles = css`
        :host {
            display: block;
            font-family: 'Segoe UI', sans-serif;
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
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            margin-top: 10px;
        }

        .load-more:hover {
            background-color: #0057b3;
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
        accounts: { 
            type: Array 
        },
        showAll: { 
            type: Boolean 
        },
        isloading: {
            type: Boolean 
        }
    };

    constructor() {
        super();
        this.accounts = [];
        this.showAll = false;
        this.isloading = true;
    }

    connectedCallback() {
        super.connectedCallback();
        this.simulateisloading();
    }

    simulateisloading() {
        setTimeout(() => {
            this.isloading = false;
            this.loadAccounts();
        }, 2000); 
    }

    loadAccounts() {
        fetch('./db.json')
            .then(response => response.json())
            .then(data => {
                this.accounts = data.accounts;
            });
    }

    toggleShowAll() {
        this.showAll = !this.showAll;
    }

    goBackToLogin() {
        return html`<login-page></login-page>`;
    }

    render() {
        if (this.isloading) {
            return html`<loading-page></loading-page>`;
        }

        const visibleaccounts = this.showAll ? this.accounts : this.accounts.slice(0, 3);

        return html`
            <section>
            <button class="back-button" @click="${this.goBack}">←</button>
                ${visibleaccounts.map(account => html`
                    <section class="account-card">
                        <h3>${account.type}</h3>
                        <p>Número: ${account.number}</p>
                        <p>Saldo: ${account.balance}</p>
                    </section>
                `)}
                ${this.accounts.length > 3 && !this.showAll ? html`
                    <button class="load-more" @click="${this.toggleShowAll}">Ver más</button>
                ` : ''}
            </section>
        `;
    }
}