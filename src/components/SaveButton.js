import React from 'react'
import API from './API'
import { Popup } from 'semantic-ui-react'
import './Button.css'

class SaveButton extends React.Component {
  state = {
    clicked: false
  }

  handleClick = () => {
      this.props.showSavedDisplay() 
    if (this.props.editID) {
      return API.editSnippet(this.props.editID,this.props.snippet)
    } else {
      API.createSnippet({ snippet: this.props.snippet })
      this.toggleClick()
    }
  }

  toggleClick = () => {
    const click = setTimeout(
      this.setState({ clicked: !this.state.clicked }),
      1000
    )
    clearTimeout(click)
    this.setState({ clicked: !this.state.clicked })
  }

  render () {
    return (
        <div> 
            {this.props.showingSavedDisplay ?
            
            <Popup
        trigger={
          <button
            className={`standardSaveButton ${
              this.state.clicked ? 'saved' : null
            }`}
            style={{ position: 'relative', top: '150px' }}
            onClick={this.handleClick}
          >
            Your snippet has been saved! 
          </button>
        }
        content={
          this.props.username ? 'Save me!' : 'Sign up to save your snippets!'
        }
      />
            
            
            
            
            :
      <Popup
        trigger={
          <button
            className={`standardSaveButton ${
              this.state.clicked ? 'saved' : null
            }`}
            style={{ position: 'relative', top: '150px' }}
            onClick={this.handleClick}
          >
            Save
          </button>
        }
        content={
          this.props.username ? 'Save me!' : 'Sign up to save your snippets!'
        }
      />
    }
    </div>
    )
    
  }
}
export default SaveButton
