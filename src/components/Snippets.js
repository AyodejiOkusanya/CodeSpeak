import React from 'react'
import API from './API'
import 'brace/mode/javascript'
import 'brace/theme/solarized_dark'
import AceEditor from 'react-ace'


class Snippets extends React.Component {
  state = {
    snippets: []
  }
  getSnippets = () => {
    return API.getSnippets().then(snippets => this.setState({ snippets }))
  }

  renderCodeSnippets = () => {
    return this.state.snippets.map((content) => {
      console.log(content)
        return (
          
          <div style={{padding:'10px'}}>
          <AceEditor
          placeholder='Placeholder Text'
          mode='javascript'
          theme='solarized_dark'
          name='blah2'
          onLoad={this.onLoad}
          onChange={this.onChange}
          fontSize={14}
          showPrintMargin
          showGutter
          highlightActiveLine
          value={content.codesnippet}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2
          }}
        />
        
        </div>
        )
    })
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
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {this.renderCodeSnippets()}
      </div>
    )
  }
}

export default Snippets
