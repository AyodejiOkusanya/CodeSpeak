import React from 'react'

class Button extends React.Component {
  render () {
    return (
      <button style={{backgroundColor:'black', border:'none'}} onClick={this.props.toggleListen}>
      
        <img style={{backgroundColor:'black'}} src={require('../images/microphone.jpeg')} />
      </button>
    )
  }
}

export default Button
