import { LitElement, html } from 'lit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { customElement, query } from 'lit/decorators.js';
import { CORE, FORM_STYLES, ALERTS } from '../css/index.js';

@customElement('register-screen')
class RegisterScreen extends LitElement {
  static styles = [CORE, FORM_STYLES, ALERTS];

  @query('#username')
  private usernameInput: any;

  @query('#password')
  private passwordInput: any;

  @query('#email')
  private emailInput: any;

  @query('#confirm_password')
  private confirmPasswordInput: any;

  @query('#alert-password')
  private alertPassword: any;

  render() {
    return html`
      <h1 class="heading">Register Now!</h1>
      <form @submit=${this.register} method="post">
        <div>
          <div class="form__group field">
            <input
              type="text"
              class="form__field"
              placeholder="Username"
              name="Username"
              id="username"
              required
            />
            <label for="Username" class="form__label">Username</label>
          </div>
          <div class="form__group field">
            <input
              type="text"
              class="form__field"
              placeholder="Subtitle"
              name="Subtitle"
              id="email"
              required
            />
            <label for="subtitle" class="form__label">Email</label>
          </div>
        </div>
        <div>
          <div class="form__group field">
            <input
              type="text"
              class="form__field"
              placeholder="Password"
              name="Password"
              id="password"
              required
            />
            <label for="Password" class="form__label">Password</label>
          </div>
          <div class="form__group field">
            <input
              type="text"
              class="form__field"
              placeholder="ConfirmPassword"
              name="ConfirmPassword"
              id="confirm_password"
              required
            />
            <label for="ConfirmPassword" class="form__label">Confirm Password</label>
          </div>
        </div>
        <div>
          <button type="submit" class="login-button">Register</button>
        </div>
        <div>
          <p class="alert hidden" id="alert-password"></p>
        </div>
      </form>
    `;
  }

  register(e: Event) {
    e.preventDefault();
    const username = this.usernameInput.value;
    const password = this.passwordInput.value;
    const email = this.emailInput.value;
    const confirmPassword = this.confirmPasswordInput.value;

    if (password !== confirmPassword) {
      this.alertPassword.classList.remove('hidden');
      this.alertPassword.innerText = 'Password does not match';
      return;
    }

    // TODO: Register user
    console.log(username, password, email, confirmPassword);
  }
}

export default RegisterScreen;
