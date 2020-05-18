import * as React from 'react'
import styled from 'styled-components'
import './header.sass'
import aniStepMaker from '../../scripts/aniStepMaker'
import { defaultKeyframes } from '../../styles/variables'
import headerImage from '../../assets/header-bg.jpg'
import ClockCom from '../../components/clock/clock'

const aniStepDoms = aniStepMaker([
  {
    // cutton
    dom: styled.div`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: ${(props) => props.theme.color.blue};
      animation-name: ${defaultKeyframes.cutton};
      animation-timing-function: ease-out;
      animation-fill-mode: both;
    `,
    duraion: 1.2
  },
  {
    // sejin's
    dom: styled.div`
      opacity: 0;
      animation-name: ${defaultKeyframes.appearFromRight};
      animation-timing-function: ease-out;
      animation-fill-mode: both;
    `,
    duraion: .5,
    delay: .6,
    startSameNext: true
  },
  {
    // portfolio
    dom: styled.div`
      opacity: 0;
      animation-name: ${defaultKeyframes.appearFromLeft};
      animation-timing-function: ease-out;
      animation-fill-mode: both;
    `,
    duraion: .5,
    delay: .6,
    startSameNext: true
  },
  {
    // wellcome to
    dom: styled.div`
      opacity: 0;
      animation-name: ${defaultKeyframes.fadeOutIn};
      animation-timing-function: ease-out;
      animation-fill-mode: both;
    `,
    duraion: 1,
    startSameNext: true
  },
  {
    // bg image
    dom: styled.div`
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: url(${headerImage}) no-repeat;
      background-size: cover;
      opacity: .1;
      z-index: -1;
      animation-name: ${defaultKeyframes.scaleDown};
      animation-timing-function: ease-out;
      animation-fill-mode: both;
    `,
    duraion: 1
  },
  {
    dom: styled(ClockCom)`
      opacity: 0;
      animation-name: ${defaultKeyframes.fadeOutIn};
      animation-fill-mode: both;
    `,
    duraion: 1,
    delay: .5
  }
])

const Cutton = aniStepDoms[0]
const TextAppearFromUp = aniStepDoms[1]
const TextAppearFromDown = aniStepDoms[2]
const WellcomeText = aniStepDoms[3]
const BackgroundImage = aniStepDoms[4]
const Clock = aniStepDoms[5]

export default class Header extends React.Component {
  constructor (props: {}) {
    super(props)

    this.state = {
      scrollYPos: 0
    }
  }

  render () {
    return (
      <header>
        <Cutton />
        <div className="content-box text__center text__white header__title">
          <h1 className="text__title-1">
            <WellcomeText>WELLCOME TO</WellcomeText>
            <TextAppearFromUp>SEJIN'S</TextAppearFromUp>
            <TextAppearFromDown>PORTFOLIO</TextAppearFromDown>
          </h1>
          <Clock className="header__clock text__title-1" />
        </div>
        <BackgroundImage />
      </header>
    )
  }
}
