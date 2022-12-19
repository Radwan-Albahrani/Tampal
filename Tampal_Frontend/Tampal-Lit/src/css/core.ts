import { css } from 'lit';

const CORE = css`
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  textArea {
    width: 100%;
    height: 30rem;
    border: none;
    outline: none;
    background-color: #414141;
    color: white;
    font-family: inherit;
  }

  p
  {
    white-space: pre-wrap;
  }

  hr {
    border: none;
    border-top: 5px dotted #5f5f5f;
    height: 1px;
    width: auto;
  }

  button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .subtitle {
    position: relative;
    justify-content: center;
    text-align: center;
    color: #ffffff;
    text-decoration: none;
    font-size: 1.5rem;
  }
  .heading {
    color: grey;
    text-align: center;
    font-size: 50px;
    padding: 20px;
    padding-top: 0;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  .display-block
  {
    display: block;
  }

  .hidden
  {
    display: none;
  }
  `;

export { CORE };