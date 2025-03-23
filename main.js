import { UsernameInput } from "./src/components/login-page.js";
import { PasswordInput } from "./src/components/login-page.js";
import { LoginButton } from "./src/components/login-page.js";
import { LoginPage } from "./src/components/login-page.js";

window.customElements.define("login-page", LoginPage);
window.customElements.define("username-input", UsernameInput);
window.customElements.define("password-input", PasswordInput);
window.customElements.define("login-button", LoginButton);
