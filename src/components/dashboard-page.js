import { LitElement, html, css  } from "lit";

export class Dashboard extends LitElement {
    static styles = css`
        :host {
            display: block;
            font-family: 'Segoe UI', sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
            min-height: 100vh;
        }

        .pantalla-loading {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-size: 24px;
            color: #007bff;
        }

        .cuenta-card {
            background: linear-gradient(135deg, #007bff, #0056b3);
            color: white;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 15px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .cuenta-card h3 {
            margin: 0;
            font-size: 18px;
        }

        .cuenta-card p {
            margin: 5px 0;
            font-size: 14px;
        }

        .cargar-mas {
            display: block;
            width: 100%;
            padding: 10px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            margin-top: 10px;
        }

        .cargar-mas:hover {
            background-color: #0056b3;
        }

        .prev-button {
            display: block;
            width: 100%;
            padding: 10px;
            background-color: #6c757d;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            margin-top: 20px;
        }

        .prev-button:hover {
            background-color: #5a6268;
        }
    `;

    static properties = {
        cuentas: { 
            type: Array 
        },
        mostrarTodo: { 
            type: Boolean 
        },
        loading: {
            type: Boolean 
        }
    };

    constructor() {
        super();
        this.cuentas = [];
        this.mostrarTodo = false;
        this.loading = true;
    }

    connectedCallback() {
        super.connectedCallback();
        this._simulateLoading();
    }

    _simulateLoading() {
        setTimeout(() => {
            this.loading = false;
            this.loadAccounts();
        }, 2000); 
    }

    loadAccounts() {
        fetch('./db.json')
            .then(response => response.json())
            .then(data => {
                this.cuentas = data.cuentas;
            });
    }

    toggleShowAll() {
        this.mostrarTodo = !this.mostrarTodo;
    }

    goBackToLogin() {
        window.location.href = './login-page.js';
    }

    render() {
        if (this.loading) {
            return html`<section class="pantalla-loading">Cargando...</section>`;
        }

        const visiblecuentas = this.mostrarTodo ? this.cuentas : this.cuentas.slice(0, 3);

        return html`
            <section>
                ${visiblecuentas.map(account => html`
                    <section class="cuenta-card">
                        <h3>${account.type}</h3>
                        <p>Número: ${account.number}</p>
                        <p>Saldo: ${account.balance}</p>
                    </section>
                `)}
                ${this.cuentas.length > 3 && !this.mostrarTodo ? html`
                    <button class="cargar-mas" @click="${this.toggleShowAll}">Ver más</button>
                ` : ''}
                <button class="prev-button" @click="${this.goBackToLogin}">Regresar al Login</button>
            </section>
        `;
    }
}