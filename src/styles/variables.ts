import { DefaultTheme, keyframes } from 'styled-components'

const theme: DefaultTheme = {
  color: {
    blue: '#0D3F98',
    bgGray: '#F4F4F8',
    textNormalBlueBg: '#F4F4F8',
    textNormalGrayBg: '#787880',
    textEmGrayBg: '#0D3F98'
  }
}

const defaultKeyframes = {
  cutton: keyframes`
    0% {
      transform: translateX(-100%)
    }
    25% {
      transform: translateX(0%)
    }
    75% {
      transform: translateX(0%)
    }
    100% {
      transform: translateX(100%)
    }
  `,
  scaleDown: keyframes`
    from {
      transform: scale(1.3)
    }
    to {
      transform: scale(1)
    }
  `,
  fadeOutIn: keyframes`
    from {
      opacity: 0
    }
    to {
      opacity: 1
    }
  `,
  appearFromRight: keyframes`
    from {
      transform: translateX(50%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  `,
  appearFromLeft: keyframes`
    from {
      transform: translateX(-50%);
      opacity: 0;
    }

    to {
      transform: translateX(0);
      opacity: 1;
    }
  `
}

export { theme, defaultKeyframes }