import React from 'react'

export default class Dialog extends React.PureComponent {
  render () {
    return (
      <div className="b__dialog">
        {
          this.props.children
        }
      </div>
    )
  }
}
