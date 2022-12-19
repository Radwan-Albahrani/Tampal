import { css } from 'lit';

const FORM_STYLES = css`
.form__group {
    position: relative;
    padding: 15px 0 0;
    margin-top: 10px;
    width: 50%;
    place-content: space-around center;
  }

  .form__field {
    font-family: inherit;
    width: 90%;
    text-align: center;
    border: 0;
    border-bottom: 2px solid #9b9b9b;
    outline: 0;
    font-size: 1.3rem;
    color: #fff;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
  }
  .form__field::placeholder {
    color: transparent;
  }
  .form__field:placeholder-shown ~ .form__label {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;
  }

  .form__label {
    position: absolute;
    top: 0;
    display: flex;
    transition: 0.2s;
    font-size: 1rem;
    color: #9b9b9b;
  }

  .form__field:focus {
    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, #11998e, #38ef7d);
    border-image-slice: 1;
  }
  .form__field:focus ~ .form__label {
    position: absolute;
    top: 0;
    display: flex;
    transition: 0.2s;
    font-size: 0.8rem;
    color: #11998e;
    font-weight: 700;
  }

  /* reset input */
  .form__field:required,
  .form__field:invalid {
    box-shadow: none;
  }

  /* CSS */
  .login-button {
    font-family: 'Open Sans', sans-serif;
    width: 50%;
    margin-left: 25%;
    margin-right: 25%;
    margin-top: 5%;
    margin-bottom: 0;
    font-size: 16px;
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
    position: relative;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }

  .login-button:active {
    box-shadow: 0px 0px 0px 0px;
    top: 5px;
    left: 5px;
  }
  .login-button:hover {
    background-color: darkgrey;
  }
  @media (min-width: 768px) {
    .login-button {
      padding: 0.25em 0.75em;
    }
  }
  `;


export { FORM_STYLES };