import { LitElement, html } from 'lit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { customElement, property, query } from 'lit/decorators.js';
import { CORE, PASTE_DISPLAY, TABLE_STYLES, FORM_STYLES } from '../css/index.js';
import '@polymer/paper-dialog/paper-dialog.js';
import { Paste } from '../models/Paste.js';

let apiUrl: String = 'http://localhost:6789/api/v1';
let httpUrl: String = 'http://localhost:6789';
@customElement('display-paste')
class DisplayPaste extends LitElement {
  static styles = [CORE, PASTE_DISPLAY, TABLE_STYLES, FORM_STYLES];

  @property({ type: String })
  declare pasteID: string;

  @property({ type: String })
  declare userID: string;

  @property({ type: String })
  declare mode: string;

  @query('#dialog')
  private declare dialog: HTMLElement;

  @query('#paste-text-area')
  private declare pasteContent: HTMLInputElement;

  @query('#title-input')
  private declare titleInput: HTMLInputElement;

  declare username: String;

  @property({ type: Object })
  declare paste: Paste;

  render() {
    this.firstUpdated();
    return html`
      ${this.paste !== null && this.paste !== undefined
        ? html`
        <div>
          <paper-dialog id="dialog" hidden>
              <h1 class="heading">Confirmation</h1>
              <p class="subtitle">Are you sure you want to Delete this Paste?</p>
              <div>
                <button class="paste-button" @click="${this.confirmDelete}">
                  OK
                </button>
                <button class="paste-button" @click="${this.cancelDelete}">
                  Cancel
                </button>
              </div>
            </paper-dialog>
        </div>
            ${this.paste.editable
            ? html`
              <center>
                <input
                  type="text"
                  class="form__field"
                  id="title-input"
                  .value=${this.paste.title}
                />
              </center>
                `
            : html`
            <div>
                <h1 class="paste-title">
                    ${this.paste.title}
                </h1>
            </div>
            `
          }
              </h1>
            </div>
            <div>
              <h1 class="heading">Created By: ${this.username}</h1>
            </div>
            <div>
              <p class="subtitle">Date: ${this.paste.date}</p>
            </div>

            <div>
              <table class="styled-table">
                <tbody>
                  ${this.mode === 'edit' ? this.pasteElement(this.paste) : this.pasteCreateElement(this.paste)}
                </tbody>
              </table>
            </div>
          `
        : html`<p class="subtitle">No paste Found</p>`}
    `;
  }

  // Function to render a single paste row and adds logic to display the content of the paste
  private pasteElement = (paste: Paste) =>
    html`
      <tr>
        <td colspan="3">
          ${paste.editable
        ? html`
                <textarea id = "paste-text-area" .value=${paste.content} autosize="true"></textarea>
              `
        : html` <p>${paste.content}</p> `}
        </td>
      </tr>
      <tr>
        <td colspan="1">
          <button class="paste-button" @click=${this.makeEditable}>
            ${paste.editable ? 'Save' : 'Edit'}
          </button>
        </td>
        <td colspan="1"></td>
        <td colspan="1">
          <button class="paste-button" @click=${this.deletePasteDialog}>
            Delete
          </button>
        </td>
      </tr>
    `;

  private pasteCreateElement = (paste: Paste) =>
    html`
      <tr>
        <td colspan="3">
          ${paste.editable
        ? html`
                <textarea id = "paste-text-area" .placeholder=${paste.content} autosize="true"></textarea>
              `
        : html` <p>${paste.content}</p> `}
        </td>
      </tr>
      <tr>
        <td colspan="3">
          <button class="paste-button" @click=${this.createPaste}>
            Create
          </button>
        </td>
      </tr>
    `;

  makeEditable = () => {
    this.requestUpdate();
    const selectedPaste = this.paste;
    if (selectedPaste !== undefined) {
      selectedPaste.editable = !selectedPaste.editable;
      this.requestUpdate('editedPaste');
      if (selectedPaste.editable === false) {
        selectedPaste.title = this.titleInput.value;
        selectedPaste.content = this.pasteContent.value;
        this.updatePaste(selectedPaste);
      }
    }
  };

  private async updatePaste(paste: Paste) {
    let url = new URL(`${apiUrl}/paste/update`);
    if (paste.pasteID === undefined) {
      paste.pasteID = 0;
    }
    var requestPaste = {
      pasteID: paste.pasteID,
      title: paste.title,
      content: paste.content,
      date: paste.date,
    }
    url.searchParams.append('pasteID', "" + paste.pasteID);
    url.searchParams.append('userID', this.userID);
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestPaste),
    });
  }
  async createPaste() {
    this.paste.title = this.titleInput.value;
    this.paste.content = this.pasteContent.value;
    let url = new URL(`${apiUrl}/paste/create`);
    url.searchParams.append('userID', this.userID);
    var requestPaste = {
      pasteID: this.paste.pasteID,
      title: this.paste.title,
      content: this.paste.content,
      date: this.paste.date,
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(requestPaste),
    });
    const data = await response.json();
    window.location.href = `${httpUrl}/user/${this.userID}`;
  }

  async firstUpdated() {
    if (!this.paste) {
      let url = new URL(`${apiUrl}/user/find`);
      url.searchParams.append('userID', this.userID);
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      this.username = data.username;
      if (this.pasteID === "-1") {
        this.paste = {
          pasteID: -1,
          title: "New Paste",
          content: "Enter your content here",
          date: new Date().toLocaleString(),
          editable: true,
        }
      }
      else {
        url = new URL(`${apiUrl}/paste/find`);
        url.searchParams.append('pasteID', this.pasteID);
        url.searchParams.append('userID', this.userID);
        const response = await fetch(url, {
          method: 'GET',
          headers: { 'content-type': 'application/json' },
        });
        const data = await response.json();
        this.paste = {
          pasteID: data.pasteID ? data.pasteID : 0,
          title: data.title,
          content: data.content,
          date: data.date,
          editable: false,
        }
      }
      this.requestUpdate();
    }
  }

  private async deletePaste() {
    let url = new URL(`${apiUrl}/paste/delete`);
    url.searchParams.append('pasteID', this.pasteID);
    url.searchParams.append('userID', this.userID);
    await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    window.location.href = `${httpUrl}/user/${this.userID}`;
  }

  confirmDelete() {
    this.dialog.toggleAttribute('hidden');
    this.deletePaste();
  }

  cancelDelete() {
    // Cancel the Delete operation
    this.dialog.toggleAttribute('hidden');
  }

  deletePasteDialog() {
    this.dialog.toggleAttribute('hidden');
  }
}

export default DisplayPaste;
