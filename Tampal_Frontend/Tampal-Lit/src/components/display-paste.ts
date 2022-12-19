import { LitElement, html } from 'lit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { customElement, property, query } from 'lit/decorators.js';
import { CORE, PASTE_DISPLAY, TABLE_STYLES } from '../css/index.js';
import '@polymer/paper-dialog/paper-dialog.js';


import { Paste } from '../models/Paste.js';

@customElement('display-paste')
class DisplayPaste extends LitElement {
  static styles = [CORE, PASTE_DISPLAY, TABLE_STYLES];

  @property({ type: Object })
  declare paste: Paste;

  @query('#dialog')
  private declare dialog: HTMLElement;

  @query('#paste-text-area')
  private declare textArea: HTMLInputElement;

  @property({ type: String })
  user = '';

  render() {
    return html`
      ${'content' in this.paste
        ? html`
            <div>
              <h1 class="paste-title">
                --------- ${this.paste.title} ---------
              </h1>
            </div>
            <div>
              <h1 class="heading">Created By: ${this.user}</h1>
            </div>
            <div>
              <p class="subtitle">Date: ${this.paste.date}</p>
            </div>

            <div>
              <table class="styled-table">
                <tbody>
                  ${this.pasteElement(this.paste)}
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
          <paper-dialog id="dialog">
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
        selectedPaste.content = this.textArea.value;
      }
    }
  };

  confirmDelete() {
    // TODO: Delete the paste
    this.dialog.toggleAttribute('opened');
  }

  cancelDelete() {
    // Cancel the Delete operation
    this.dialog.toggleAttribute('opened');
  }

  deletePasteDialog() {
    this.dialog.toggleAttribute('opened');
  }
}

export default DisplayPaste;
