import { LitElement, html } from 'lit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { customElement, query } from 'lit/decorators.js';
import { CORE, FORM_STYLES } from '../css/index.js';

let apiUrl: String = 'http://localhost:6789/api/v1';
let httpUrl: String = 'http://localhost:6789';

@customElement('login-screen')
class LoginScreen extends LitElement {
  static styles = [CORE, FORM_STYLES];

  @query('#username')
  private declare usernameInput: HTMLInputElement

  @query('#password')
  private declare passwordInput: HTMLInputElement;

  render() {
    return html`
    <div>
        <main>
          <h1 class="heading">Welcome to Tampal</h1>
          <form @submit=${this.login} method="post">
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
                  type="password"
                  class="form__field"
                  placeholder="Password"
                  name="Password"
                  id="password"
                  required
                />
                <label for="Password" class="form__label">Password</label>
              </div>
            </div>
            <div>
              <button type="submit" class="login-button">Login</button>
            </div>
          </form>
          <div>
            <a href="${httpUrl}/register" style="width: 100%">
              <button class="login-button">
                Register
              </button>
            </a>
          </div>
        </main>
      </div>
    `;
  }

  private login = async (e: Event) => {
    e.preventDefault();

    const username = this.usernameInput?.value;
    const password = this.passwordInput?.value;
    await fetch(`${apiUrl}/user/login`, {
      method: 'POST',
      headers: { "content-type": 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    window.location.href = `${httpUrl}/`
  };
}

export default LoginScreen;
