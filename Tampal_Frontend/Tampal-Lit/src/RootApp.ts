/* eslint-disable @typescript-eslint/no-unused-vars */
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import './components/index.js';
import { CORE } from './css/index.js';

@customElement('root-app')
export class RootApp extends LitElement {
  Paste = {
    ID: 1,
    title: 'Paste Title',
    content: `Occaecat magna enim adipisicing enim officia. Ad sunt aute amet anim. Excepteur aliquip in velit in fugiat velit sint officia est.

Lorem excepteur velit amet qui incididunt ex commodo minim. Cillum do tempor exercitation enim proident magna ea aute est est magna. Eiusmod sit occaecat officia culpa anim. Tempor nisi qui velit qui velit esse.

Quis sit minim qui consequat proident pariatur in reprehenderit consequat qui. Lorem cillum velit deserunt ipsum incididunt magna eu id eiusmod sunt eu ipsum et deserunt. Voluptate pariatur labore reprehenderit est tempor sunt id ipsum quis fugiat. Culpa fugiat aliquip quis ipsum nisi do aute aliqua eu duis in.

Occaecat cupidatat non ullamco reprehenderit nostrud ut occaecat sit anim. Ex sint tempor ut deserunt ut laboris incididunt. Ad proident magna in exercitation tempor ipsum. Exercitation incididunt aliquip ipsum velit anim laboris minim culpa do sunt.

Pariatur pariatur nulla qui fugiat occaecat dolor magna ullamco et ipsum excepteur. Deserunt ad aliquip do excepteur fugiat tempor elit commodo velit laborum commodo magna laborum. Labore quis eiusmod aliquip consectetur. Do aute quis non dolor cillum ullamco consectetur do cupidatat Lorem nulla commodo.

Enim adipisicing irure cillum minim est culpa labore. Culpa nisi labore elit voluptate. Esse aliquip ad excepteur sunt anim commodo occaecat Lorem excepteur in ullamco mollit aliquip et. Est adipisicing exercitation reprehenderit pariatur.

Id sit irure cillum qui ut adipisicing do sint eu. Irure non ex nostrud id mollit fugiat ex nulla fugiat ea commodo anim qui enim. Duis velit consectetur pariatur elit anim deserunt consectetur deserunt nisi anim do proident ullamco irure. Aliquip eiusmod irure sit ullamco elit eiusmod. Do ut quis exercitation et et sint pariatur mollit cillum dolor. Qui enim elit non id.

Pariatur officia labore occaecat ex sint eiusmod ullamco occaecat. Anim nisi eiusmod ad duis magna mollit ut ullamco nulla ut nulla esse voluptate aliqua. Ut est dolore do sunt voluptate eiusmod in. Elit ipsum ipsum nisi incididunt sint.

Quis eiusmod velit voluptate voluptate minim ut deserunt minim in sunt amet occaecat pariatur cupidatat. Reprehenderit non deserunt minim commodo magna quis voluptate reprehenderit id veniam consequat magna reprehenderit nulla. Dolor velit mollit tempor velit elit eiusmod nisi magna. Ex esse dolore culpa quis ullamco non. Et magna aute eiusmod anim ipsum.

Non velit quis magna exercitation proident aliquip nulla aliqua officia sint cupidatat. Dolor eiusmod est ut laboris amet do tempor qui aliqua sit. Adipisicing excepteur laborum do amet occaecat. Sint laborum ullamco aliquip occaecat esse adipisicing exercitation Lorem ullamco labore minim tempor. Ea irure reprehenderit sint voluptate anim ad.`,
    date: '21/12/2020',
    editable: false,
  };

  static styles = CORE;

  render() {
    return html`
      <div>
        <main>
          <login-screen></login-screen>
        </main>
      </div>
      <br />
      <br />
      <hr />
      <br />
      <br />
      <div>
        <main>
          <register-screen></register-screen>
        </main>
      </div>
      <br />
      <br />
      <hr />
      <br />
      <br />
      <user-profile></user-profile>
      <br />
      <br />
      <hr />
      <br />
      <br />
      <display-paste
        paste=${JSON.stringify(this.Paste)}
        user="John Doe"
      ></display-paste>
    `;
  }
}
