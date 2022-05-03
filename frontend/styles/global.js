import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* @font-face {
    font-family: 'restart';
    src:url("/assets/fonts/restart.ttf") format('truetype');
    font-weight: bold;
    font-style: normal;
  } */

  // 1. 이서윤체
  @font-face {
    font-family: 'LeeSeoyun';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2202-2@1.0/LeeSeoyun.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  body{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'LeeSeoyun';
  }

  a {
    text-decoration: none;
  }

  button{
    cursor: pointer;
  }

  ul {
    padding: 0;
    margin: 0;
  }
  
  li{
    list-style: none;
  }
  .ant-picker-cell-in-view.ant-picker-cell-selected .ant-picker-cell-inner{
    background-color:#ffa53a;
  }
  .ant-picker-time-panel-column > li.ant-picker-time-panel-cell-selected .ant-picker-time-panel-cell-inner{
    background-color:#ffebd2;
  }
  .ant-picker-now-btn{
    color:#ffa53a;
  }
  .ant-picker-now-btn:hover{
    color:#ffebd2;
  }
  .ant-btn-primary{
    background-color:#ffa53a;
    border:none; 
  }
  .ant-btn-primary:hover{
    background-color:#ffebd2; 
    border:none; 
  }
  .ant-modal-body {
    padding: 0;
  }
  .ant-picker-time-panel-column{
    width:none;
  }
`;
export default GlobalStyle;
