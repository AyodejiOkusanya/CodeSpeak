import React from 'react'
import API from './API'
import 'brace/mode/javascript'
import 'brace/theme/solarized_dark'
import AceEditor from 'react-ace'
import { Grid } from 'semantic-ui-react'
class Snippets extends React.Component {
  state = {
    snippets: []
  }
  getSnippets = () => {
    return API.getSnippets().then(snippets => this.setState({ snippets }))
  }

  renderCodeSnippets = () => {
    return this.state.snippets.map(content => {
      console.log(content)
      return (
        <div style={{ padding: '10px' }}>
          <Grid.Column>
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
            <button style={{ marginTop: '10px' }}>Edit</button>
            <button style={{ marginTop: '10px' }}>Delete</button>
          </Grid.Column>
        </div>
        // </div>
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
      <div>
        <h1
          style={{
            color: 'white',
            padding: '10px',
            position: 'relative',
            left: '750px'
          }}
        >
          Your Snippets
        </h1>

        {/* <div style={{ display: 'flex', justifyContent: 'center' }}> */}
        <Grid container columns={3}>
          {this.renderCodeSnippets()}
        </Grid>
        {/* </div> */}
      </div>
    )
  }
}

export default Snippets
