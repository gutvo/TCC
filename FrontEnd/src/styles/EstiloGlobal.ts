import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

  *{
    text-decoration: none;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }
  body {
    font-family: 'Roboto', sans-serif;
  }
`

export default GlobalStyle
