import * as React from 'react'
import Tetris from '../components/tetris'
import Dialog from '../components/dialog'

export default class Footer extends React.PureComponent {
  state: {
    playTetris: boolean
  } = {
    playTetris: false
  }

  toggleTetris () {
    this.setState({
      playTetris: !this.state.playTetris
    })
  }

  render () {
    return (
      <footer>
        <address className='b__content-box'>
          <p>EMAIL: <a href="mailto:dbstpwlswork32@gmail.com">dbstpwlswork32@gmail.com</a></p>

          <a href="https://stopsapzil.tistory.com/" target="blank">Tistory</a>
          <a href="https://github.com/dbstpwlsWork32" target="blank">GitHub</a>
          <a href="https://github.com/dbstpwls" target="blank">GitHub (Legacy)</a>
          <a href="http://dbstpwls.github.io/" target="blank">Legacy Protfolio</a>
        </address>

        {
          window.innerWidth > 500 &&
          <div className="b__content-box" style={ { marginTop: '1rem' } }>
            <button onClick={this.toggleTetris.bind(this)}>심심풀이...</button>
          </div>
        }

        {
          (this.state.playTetris === true && window.innerWidth > 500) &&
          <Dialog>
            <Tetris />
            <p className="text__color-em">(keyboard arrow, d, s)</p>
            <button className="b__dialog__close" onClick={this.toggleTetris.bind(this)}>X</button>
          </Dialog>
        }
      </footer>
    )
  }
}
