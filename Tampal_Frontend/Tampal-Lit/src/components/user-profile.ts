import { LitElement, html } from 'lit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { customElement, property } from 'lit/decorators.js';

import './pastes-list.js';

import { CORE, TABLE_STYLES } from '../css/index.js';

@customElement('user-profile')
class UserProfile extends LitElement {
  @property()
  ID = '1';

  @property()
  username = 'John Doe';

  @property()
  email = 'JohnDoe@gmail.com';

  @property()
  pastes = [
    {
      ID: '1',
      title: 'Paste 1 title',
      content: `Mollit enim sunt laborum occaecat reprehenderit proident sit nisi consectetur incididunt in nulla commodo velit. Excepteur magna fugiat esse Lorem ullamco ullamco esse consectetur eu ullamco sint. Lorem qui ea ea exercitation officia nisi deserunt quis ad. Cupidatat elit magna aliquip tempor pariatur dolore reprehenderit laboris fugiat magna proident aliquip ipsum. Eu deserunt anim duis aliquip velit voluptate cupidatat voluptate ex sint.

Anim sit veniam sit labore do fugiat do nisi dolor labore. Deserunt eiusmod dolor do cupidatat incididunt labore magna. Culpa ea ipsum adipisicing ut nisi irure nostrud ipsum cupidatat ad incididunt. Duis nulla adipisicing anim voluptate elit irure est.

Anim amet non adipisicing consectetur aute qui sint aliqua eu dolore do mollit. Non aliquip fugiat quis nisi irure esse cillum duis et. Exercitation nisi voluptate aliquip et sit labore ullamco. Voluptate do nisi deserunt laborum pariatur elit ipsum nisi. Consequat laboris voluptate cupidatat anim qui et aute. Eiusmod dolor id est exercitation quis laboris mollit exercitation cupidatat velit labore sunt.

Fugiat eiusmod occaecat occaecat id irure est deserunt tempor. Cillum qui est aliqua eiusmod et sit sint adipisicing consequat nisi ea proident dolor. Consequat excepteur commodo eu culpa nulla fugiat reprehenderit enim ullamco velit culpa eu consequat mollit. Aute voluptate consectetur pariatur velit sunt tempor anim esse. Ullamco magna ex deserunt aliqua enim velit ullamco. Ullamco culpa aute ad enim nostrud anim aliqua mollit dolore pariatur. Adipisicing velit deserunt sit nostrud ut exercitation fugiat.

In minim nisi cillum aute Lorem aliqua duis commodo cillum aute sint dolor. Consequat veniam commodo anim labore dolor mollit enim. Et ut in velit qui do magna eiusmod ea non reprehenderit. Deserunt dolore aliquip ipsum aute et. Eu nulla enim do labore aute.

Commodo deserunt quis pariatur esse non pariatur amet fugiat consequat nisi. Esse laboris ea proident mollit. Voluptate qui veniam sint laboris consectetur dolore est eu ipsum dolor duis proident cillum. Cupidatat ullamco deserunt velit quis proident pariatur aliqua. Quis cupidatat minim aliquip tempor culpa voluptate ipsum cupidatat non consectetur. Commodo reprehenderit id mollit sint. Duis Lorem ea laborum id exercitation reprehenderit velit.

Cupidatat amet eiusmod reprehenderit ullamco sit esse cillum. Qui ex qui in excepteur laborum minim veniam consequat ut consectetur consequat dolor occaecat labore. Exercitation non qui tempor sunt anim ea deserunt non.

Incididunt non est eu fugiat exercitation officia. Nostrud labore ullamco nisi veniam cupidatat officia non tempor culpa officia nisi amet deserunt occaecat. Eiusmod deserunt mollit aliqua do tempor fugiat in deserunt ea aute dolor minim. Laborum nulla exercitation adipisicing tempor qui ad nostrud cillum non commodo officia labore id laboris. Nulla cupidatat Lorem et minim aliqua pariatur quis cillum consequat ipsum. Non cupidatat dolor aute ea voluptate occaecat.

Aliqua duis qui reprehenderit reprehenderit labore Lorem nostrud aute reprehenderit. Enim mollit sunt pariatur id occaecat deserunt consectetur ea sit nulla. Ex minim dolor dolore ullamco adipisicing id culpa consectetur eu enim. Aliqua consectetur incididunt laboris non occaecat irure labore et. Anim sit consequat esse dolore irure id tempor ex. Cupidatat consequat minim commodo sunt voluptate dolore nulla non amet irure nostrud.

Voluptate enim ipsum ad eiusmod et pariatur. Dolor amet veniam enim aute nisi elit anim ex dolore adipisicing qui mollit. Irure ea Lorem ea ipsum nisi exercitation Lorem quis do sit amet ullamco quis duis. In reprehenderit nostrud laboris adipisicing ad consectetur. Nostrud aliqua consectetur anim Lorem laboris. Sunt quis quis aliquip pariatur Lorem commodo Lorem. Elit mollit consequat sunt Lorem mollit.`,
      date: '2021-01-01',
      editable: false,
    },
    {
      ID: '2',
      title: 'Paste 2 title',
      content: 'Paste 2 content',
      date: '2021-01-02',
      editable: false,
    },
    {
      ID: '3',
      title: 'Paste 3 title',
      content: 'Paste 3 content',
      date: '2021-01-03',
      editable: false,
    },
  ];

  // eslint-disable-next-line class-methods-use-this
  displayContent(e: Event) {
    const target = e.target as HTMLElement;
    const row = target.parentNode as HTMLElement;
    const nextRow = row.nextElementSibling as HTMLElement;
    nextRow.classList.toggle('hidden-row');
  }

  static styles = [CORE, TABLE_STYLES];

  render() {
    return html`
      <div class="display-block">
        <h1 class="heading">
          ${this.username}'s Profile
        </h1>
        <p class="subtitle">Email: ${this.email}</p>
      </div>
      <pastes-list pastes=${JSON.stringify(this.pastes)}></pastes-list>
    `;
  }
}

export default UserProfile;
