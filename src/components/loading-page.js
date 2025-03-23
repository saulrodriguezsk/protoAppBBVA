import { LitElement, html, css } from 'lit';

export class LoadingPage extends LitElement {
    static styles = css`
        :host {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh; 
            background-color: #0e3470fb; 
            
        }

        .loading-container {
            text-align: center;
        }

        .loading-gif {
            width: 100px; 
            height: 100px;
        }

        .loading-text {
            margin-top: 10px;
            font-size: 18px;
            color: #0e3470fb;
        }
    `;

    render() {
        return html`
            <section class="loading-container">
                <img class="loading-gif" src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTI3eTQwbTE0bWJqZDV4dWJ6MGk1N3M0aTE0NHVpeDZwb2t1dXVnbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7bu3XilJ5BOiSGic/giphy.gif" alt="Cargando...">
            </section>
        `;
    }
}
