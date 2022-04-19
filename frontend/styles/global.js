import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
  body{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
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
`;
export { GlobalStyle };
