import { LitElement, html } from 'lit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { customElement, property } from 'lit/decorators.js';

import './pastes-list.js';

import { CORE, TABLE_STYLES, FORM_STYLES } from '../css/index.js';
import { Paste } from '../models/Paste.js';

let apiUrl: String = 'http://localhost:6789/api/v1';
let httpUrl: String = 'http://localhost:6789';
@customElement('user-profile')
class UserProfile extends LitElement {
  @property({ type: String })
  private declare userID: string;

  @property({ type: String })
  declare editable: String;

  declare username: String;
  declare email: String;
  declare pastes: Array<Paste>;

  // eslint-disable-next-line class-methods-use-this
  displayContent(e: Event) {
    const target = e.target as HTMLElement;
    const row = target.parentNode as HTMLElement;
    const nextRow = row.nextElementSibling as HTMLElement;
    nextRow.classList.toggle('hidden-row');
  }

  static styles = [CORE, TABLE_STYLES, FORM_STYLES];

  render() {
    this.firstUpdated();
    return this.username !== "User does not exist" ?
      html`
      <div class="display-block">
        <h1 class="heading">
          ${this.username}'s Profile
        </h1>
        <p class="subtitle">Email: ${this.email}</p>
      </div>
      <pastes-list pastes=${JSON.stringify(this.pastes)} editable=${this.editable}, userID=${this.userID}></pastes-list>
      <div>
        <a href="${httpUrl}/user/${this.userID}/create" style="width: 100%">
              <button class="login-button">
                Create Paste
              </button>
        </a>
      </div>
    `:
      html`
       <div class="display-block">
        <h1 class="heading">
          ${this.username}
        </h1>
      </div>
    `;
  }

  async firstUpdated() {
    if (!this.pastes) {
      let url = new URL(`${apiUrl}/user/find`);
      url.searchParams.append('userID', this.userID);
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      this.username = data.username;
      this.email = data.email;
      if (data.pastes) {
        let tempPastes = data.pastes;
        // loop through pastes and add editable attribute to each, setting it to false
        for (let i = 0; i < tempPastes.length; i++) {
          tempPastes[i].editable = false;
        }
        this.pastes = tempPastes;
      }
    }
    this.requestUpdate();
  }
}

export default UserProfile;
