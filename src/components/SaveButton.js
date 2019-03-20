import React from 'react'
import API from './API'
import { Popup } from 'semantic-ui-react'
import "./Button.css"

class SaveButton extends React.Component {

    state = {
        clicked: false 
    }

    
  handleClick = () => {
    API.createSnippet({ snippet: this.props.snippet })
    this.toggleClick()
  }

  toggleClick = () => {
      const click = setTimeout(this.setState({clicked:!this.state.clicked}),1000)
      clearTimeout(click)
      this.setState({clicked:!this.state.clicked})
  }

  render () {
    return (
      <Popup
        trigger={<button className={`standardSaveButton ${this.state.clicked ? 'saved' : null}`} style={{ position:'relative', top:'150px'}} onClick={this.handleClick}>Save</button>}
        content={
          this.props.username ? 'Save me!' : 'Sign up to save your snippets!'
        }
      />
    )
  }
}
export default SaveButton
