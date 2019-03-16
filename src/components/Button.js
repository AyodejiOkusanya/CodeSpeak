import React from 'react'

class Button extends React.Component {
  render () {
    return (
      <button onClick={this.props.toggleListen}>
      
        <img src={require('../images/microphone.jpeg')} />
      </button>
    )
  }
}

export default Button
