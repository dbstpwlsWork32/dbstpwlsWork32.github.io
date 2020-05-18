import * as React from 'react'


interface ClockProps {
  className: string
}
export default class Clock extends React.Component<ClockProps, { date: Date, timerId: number }> {
  constructor (props: ClockProps) {
    super(props)

    this.state = {
      date: new Date(),
      timerId: 0
    }
  }

  public get localTime (): string {
    const dateTo10 = (num: number): string | number => {
      return num < 10 ? '0' + num : num
    }

    return `${dateTo10(this.state.date.getHours())} : ${dateTo10(this.state.date.getMinutes())} : ${dateTo10(this.state.date.getSeconds())}`
  }

  tick () {
    this.setState({ date: new Date() })
  }

  componentDidMount () {
    this.setState({
      timerId: setInterval(this.tick.bind(this), 1000)
    })
  }

  componentWillUnmount () {
    clearInterval(this.state.timerId)
  }

  render () {
    return (
      <p className={this.props.className}>
        {this.localTime}
      </p>
    )
  }
}
