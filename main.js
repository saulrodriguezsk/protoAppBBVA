import { UsernameInput } from "./src/components/login-page.js";
import { PasswordInput } from "./src/components/login-page.js";
import { LoginButton } from "./src/components/login-page.js";
import { LoginPage } from "./src/components/login-page.js";
import { BbvaApp } from "./src/components/bbva-app.js";
import { Dashboard } from "./src/components/dashboard-page.js";

window.customElements.define("login-page", LoginPage);
window.customElements.define("username-input", UsernameInput);
window.customElements.define("password-input", PasswordInput);
window.customElements.define("login-button", LoginButton);

window.customElements.define("bbva-app", BbvaApp);
window.customElements.define("dashboard-page", Dashboard);
