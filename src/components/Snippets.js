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

  handleDelete = event => {
    console.log(event.target.id)
    API.deleteSnippet(event.target.id)

    let newSnippets = this.state.snippets.slice().filter(snip => {
      console.log(
        `the id is : ${event.target.id}, and the snip id is ${snip.id}`
      )
      return snip.id.toString() !== event.target.id.toString()
    })

    console.log(newSnippets)

    this.setState({
      snippets: newSnippets
    })
  }

  handleEdit = (event,codesnip, id) => {
    this.props.handleEditContent(codesnip, id)
    
    this.props.history.push('/record')
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
            <button
              style={{ marginTop: '10px' }}
              onClick={(event, codesnip, id) => this.handleEdit(event, content.codesnippet, content.id)}
            >
              Edit
            </button>
            <button
              id={content.id}
              style={{ marginTop: '10px' }}
              onClick={this.handleDelete}
            >
              Delete
            </button>
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
        <header
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginRight: '50px'
          }}
          className='header'
        >
          <h1 className='h1 mega montserrat bold color-emphasis-1'>Dexter</h1>
        </header>
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
