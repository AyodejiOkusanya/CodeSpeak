import React from 'react'
import API from './API'
import 'brace/mode/javascript'
import 'brace/theme/solarized_dark'
import AceEditor from 'react-ace'
import './alert.css'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Grid, Button } from 'semantic-ui-react'
import Popup from 'reactjs-popup'
class Snippets extends React.Component {
  state = {
    snippets: [],
    value: '',
    copied: false
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

  handleEdit = (event, codesnip, id) => {
    this.props.handleEditContent(codesnip, id)

    this.props.history.push('/record')
  }

  // copyFunction = (event, codesnip) => {
  //   let copyText = codesnip
  // }

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
            <Button
              secondary
              style={{ marginTop: '10px' }}
              onClick={(event, codesnip, id) =>
                this.handleEdit(event, content.codesnippet, content.id)
              }
            >
              Edit
            </Button>
            <Button
              secondary
              id={content.id}
              style={{ marginTop: '10px' }}
              onClick={this.handleDelete}
            >
              Delete
            </Button>
            (
            <CopyToClipboard
              text={content.codesnippet}
              onCopy={() => {
                alert('Copied!')
              }}
            >
            <Button
                  secondary
                  style={{
                    fontSize: '17px',
                    marginRight: '0px',
                    marginLeft: '106px',
                    marginTop: '10px'
                  }}
                >
                  Copy to clipboard
                </Button>
            
            </CopyToClipboard>
            {/* <Popup
              trigger={
                <Button
                  secondary
                  style={{
                    fontSize: '17px',
                    marginRight: '0px',
                    marginLeft: '7px',
                    marginTop: '10px'
                  }}
                >
                  Copy to clipboard
                </Button>
              }
              position='top left'
            >
              {close => (
                <div>
                  Copied!
                  <a className='close' onClick={close}>
                    &times;
                  </a>
                </div>
              )}
            </Popup> */}
            )}
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
          {this.renderCodeSnippets()
            .slice()
            .reverse()}
        </Grid>
        {/* </div> */}
      </div>
    )
  }
}

export default Snippets
