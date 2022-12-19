import { css } from "lit"

const TABLE_STYLES = css`
.styled-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    width: 80%;
    table-layout: fixed;
  }

  .styled-table thead tr {
    background-color: #1a1a1a;
    color: #ffffff;
    text-align: left;
  }

  .styled-table th,
  .styled-table td {
    padding: 12px 15px;
  }

  .styled-table tbody tr {
    color: #ffffff;
    border-bottom: 1px solid #dddddd;
  }

  .styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #1a1a1a;
  }
  .styled-table thead th:first-child {
    width: 2%;
  }
  .styled-table thead th:nth-child(2) {
    width: 80%;
  }
  .styled-table thead th:nth-child(3) {
    text-align: center;
  }
  .styled-table tbody td:nth-child(3) {
    text-align: right;
  }

  .hidden-row {
    display: none;
  }
  .expand-row {
    cursor: pointer;
  }
  .expand-row:hover {
    background-color: #272727;
  }
  `;

export { TABLE_STYLES };