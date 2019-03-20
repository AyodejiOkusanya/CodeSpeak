import React from 'react'
import './Button.css'

class Button extends React.Component {

  state = {
    recording: false 
  }

  handleClick = () => {
    this.props.toggleListen()
    this.setState({recording: !this.state.recording})
  }
  render () {
    return (
      <button class={`standardButton ${this.state.recording ? 'Rec' : 'notRec'}`} style={{position:'relative', top:'150px'}} onClick={this.handleClick}>
        {this.state.recording ? 'Stop' : 'Speak'}
      </button>
    )
  }
}

export default Button




{/* <button style={{backgroundColor:'black', border:'none'}} onClick={this.props.toggleListen}>
      
      <img style={{backgroundColor:'black'}} src={require('../images/microphone.jpeg')} />
    </button> */}