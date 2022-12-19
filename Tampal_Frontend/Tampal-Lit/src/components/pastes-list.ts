import { LitElement, html } from 'lit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { customElement, property } from 'lit/decorators.js';

import { CORE, PASTE_DISPLAY, TABLE_STYLES } from '../css/index.js';
import { Paste } from '../models/Paste.js';

@customElement('pastes-list')
class PastesList extends LitElement {
  //  array of Paste
  @property({ type: Array<Paste> })
  declare pastes: Paste[];

  @property({ type: Object })
  declare editedPaste: Paste;

  private currentlyEditable = -1;

  private currentlyEditing = false;

  static styles = [CORE, PASTE_DISPLAY, TABLE_STYLES];

  render() {
    return html`
      <div>
        ${'content' in this.pastes[0]
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
    const selectedPaste = this.pastes.find(paste => paste.ID === ID);
    if (selectedPaste !== undefined) {
      this.currentlyEditable = ID;
      this.currentlyEditing = !this.currentlyEditing;
      selectedPaste.editable = !selectedPaste.editable;
      this.editedPaste = selectedPaste;
      this.requestUpdate('editedPaste');
      if (selectedPaste.editable === false) {
        this.currentlyEditable = -1;
        this.currentlyEditing = false;
        selectedPaste.content = (
          this.renderRoot.querySelector('textArea') as HTMLTextAreaElement
        ).value;
      }
    }
  };

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
        <td>${paste.ID}</td>
        <td>${paste.title}</td>
        <td>${paste.date}</td>
      </tr>
      <tr class="hidden-row">
        <td colspan="2">
          ${paste.editable
        ? html`
                <textarea .value=${paste.content} autosize="true"></textarea>
              `
        : html` <p>${paste.content}</p> `}
        </td>
        <td colspan="1">
          <button
            class="paste-button"
            @click=${() => this.makeEditable(paste.ID)}
            ?disabled="${paste.ID !== this.currentlyEditable && this.currentlyEditing}"
          >
            ${paste.editable ? 'Save' : 'Edit'}
          </button>
          <button class="paste-button">View</button>
        </td>
      </tr>
    `;
}

export default PastesList;
