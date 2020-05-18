import * as React from 'react'
import Main from './layout/main/main'
import Header from './layout/header/header'
import Footer from './layout/footer'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/variables'

export default class App extends React.Component {
  render () {
    return (
      <ThemeProvider theme={theme}>
        <div id="app">
          <Header />
          <Main />
          <Footer />
        </div>
      </ThemeProvider>
    );
  }
}
