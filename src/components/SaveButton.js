import React from 'react'
import API from './API'
import { Popup } from 'semantic-ui-react'

class SaveButton extends React.Component {
  handleClick = () => {
    API.createSnippet({ snippet: this.props.snippet })
  }

  render () {
    return (
      <Popup
        trigger={<button onClick={this.handleClick}>Save</button>}
        content={
          this.props.username ? 'Save me!' : 'Sign Up to be able to save snippets!'
        }
      />
    )
  }
}
export default SaveButton
