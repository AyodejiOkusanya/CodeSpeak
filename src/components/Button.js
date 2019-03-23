import React from 'react'
import './Button.css'

class Button extends React.Component {

  

  handleClick = () => {
    this.props.toggleListen()
    // this.setState({recording: this.props.listening})
  }
  render () {
    return (
      <button class={`standardButton ${this.props.listening ? 'Rec' : 'notRec'}`} style={{position:'relative', top:'150px'}} onClick={this.handleClick}>
        {this.props.listening ? 'Stop' : 'Speak'}
      </button>
    )
  }
}

export default Button




{/* <button style={{backgroundColor:'black', border:'none'}} onClick={this.props.toggleListen}>
      
      <img style={{backgroundColor:'black'}} src={require('../images/microphone.jpeg')} />
    </button> */}