import { css } from 'lit';

const PASTE_DISPLAY = css`

  .paste-title {
    color: darkgray;
    text-align: center;
    font-size: 50px;
    padding: 20px;
    padding-bottom: 0;
  }

  .paste-button {
    font-family: 'Open Sans', sans-serif;
    width: 100%;
    font-size: 11px;
    letter-spacing: 2px;
    text-decoration: none;
    text-transform: uppercase;
    background-color: grey;
    color: #000;
    cursor: pointer;
    border: 3px solid;
    padding: 0.25em 0.5em;
    box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px,
      4px 4px 0px 0px, 5px 5px 0px 0px;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }

  .paste-button:active {
    box-shadow: 0px 0px 0px 0px;
    top: 5px;
    left: 5px;
  }
  .paste-button:hover {
    background-color: darkgrey;
  }

  #dialog
  {
    background-color: #1C1C1C;
  }

`;

export { PASTE_DISPLAY };
