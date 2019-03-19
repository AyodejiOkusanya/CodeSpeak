import React from 'react'
import API from './API'

class Snippets extends React.Component {
  state = {
    snippets: []
  }
  getSnippets = () => {
    API.getSnippets().then(snippets => this.setState({ snippets }))
  }

  componentDidMount () {
    const { history, username } = this.props
    if (!username) {
      history.push('/')
    } else {
      this.getSnippets()
    }
  }
  render () {
    return <div>Snippets </div>
  }
}

export default Snippets
