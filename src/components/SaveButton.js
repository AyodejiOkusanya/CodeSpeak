import React from 'react'
import API from './API'

class SaveButton extends React.Component {

    handleClick = () => {
        API.createSnippet({snippet: this.props.snippet})
    }


    render() {
        return <button onClick={this.handleClick}>Save</button>
    }
}
export default SaveButton; 