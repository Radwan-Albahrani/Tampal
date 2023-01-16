import { LitElement, html } from 'lit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { customElement, property, query } from 'lit/decorators.js';

import { CORE, PASTE_DISPLAY, TABLE_STYLES, FORM_STYLES } from '../css/index.js';
import { Paste } from '../models/Paste.js';

let apiUrl: String = 'http://localhost:6789/api/v1';
let httpUrl: String = 'http://localhost:6789';
@customElement('pastes-list')
class PastesList extends LitElement {
  //  array of Paste
  @property({ type: Array<Paste> })
  declare pastes: Paste[];

  @property({ type: String })
  declare private userID: string;

  @property({ type: Object })
  declare editedPaste: Paste;

  @property({ type: String })
  declare editable: string;

  @query("#content-input")
  declare contentInput: HTMLInputElement;

  @query("#title-input")
  declare titleInput: HTMLInputElement;

  private currentlyEditable = -1;

  private currentlyEditing = false;

  static styles = [CORE, PASTE_DISPLAY, TABLE_STYLES, FORM_STYLES];

  render() {
    return html`
      <div>
        ${this.pastes !== null
        ? html`
              <table class="styled-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.pastes.map(paste => html` ${this.pasteRow(paste)} `)}
                </tbody>
              </table>
            `
        : html`<p class="subtitle">No pastes yet</p>`}
      </div>
    `;
  }

  // Function to toggle the editability of the paste content
  makeEditable = (ID: number) => {
    const selectedPaste = this.pastes.find(paste => paste.pasteID === ID);
    if (selectedPaste !== undefined) {
      this.currentlyEditable = ID;
      this.currentlyEditing = !this.currentlyEditing;
      selectedPaste.editable = !selectedPaste.editable;
      this.editedPaste = selectedPaste;
      this.requestUpdate('editedPaste');
      if (selectedPaste.editable === false) {
        this.currentlyEditable = -1;
        this.currentlyEditing = false;
        selectedPaste.title = this.titleInput.value;
        selectedPaste.content = this.contentInput.value;
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
  // Function to render a single paste row and adds logic to display the content of the paste
  private pasteRow = (paste: Paste) =>
    html`
      <tr
        class="expand-row"
        @click=${(e: Event) => {
        const target = e.target as HTMLElement;
        const row = target.parentNode as HTMLElement;
        const nextRow = row.nextElementSibling as HTMLElement;
        nextRow.classList.toggle('hidden-row');
      }}
      >
        <td>${paste.pasteID ? paste.pasteID : 0}</td>
        <td>${paste.editable
        ? html`
                <input id = "title-input" class="form__field" type="text" .value=${paste.title} />
                `
        : html`${paste.title}`}</td>
        <td>${paste.date}</td>
      </tr>
      <tr class="hidden-row">
        <td colspan="2">
          ${paste.editable
        ? html`
                <textarea id = "content-input" .value=${paste.content} autosize="true"></textarea>
              `
        : html` <p>${paste.content}</p> `}
        </td>
        <td colspan="1">
          <button
            class="paste-button"
            @click=${() => this.makeEditable(paste.pasteID)}
            ?disabled="${paste.pasteID !== this.currentlyEditable && this.currentlyEditing}"
            ?hidden="${this.editable === "false"}"
          >
            ${paste.editable ? 'Save' : 'Edit'}
          </button>
          <a href="${httpUrl}/user/${this.userID}/edit/${paste.pasteID ? paste.pasteID : 0}" style="width: 100%">
              <button class="paste-button">
                view
              </button>
          </a>
        </td>
      </tr>
    `;
}

export default PastesList;
