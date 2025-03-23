import { UsernameInput } from "./src/components/login-page.js";
import { PasswordInput } from "./src/components/login-page.js";
import { LoginButton } from "./src/components/login-page.js";
import { LoginPage } from "./src/components/login-page.js";
import { Dashboard } from "./src/components/dashboard-page.js";
import { Details } from "./src/components/details-page.js";
import { LoadingPage } from "./src/components/loading-page.js";


window.customElements.define("login-page", LoginPage);
window.customElements.define("username-input", UsernameInput);
window.customElements.define("password-input", PasswordInput);
window.customElements.define("login-button", LoginButton);
window.customElements.define("dashboard-page", Dashboard);
window.customElements.define("details-page", Details);
window.customElements.define("loading-page", LoadingPage);
