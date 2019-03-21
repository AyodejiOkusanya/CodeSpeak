import React from 'react'
import Button from './Button'
import brace from 'brace'
import AceEditor from 'react-ace'
import FuzzySet from 'fuzzyset.js'
import Soundex from 'soundex-phonetics'
import 'brace/mode/html'
import 'brace/theme/solarized_dark'
import SaveButton from './SaveButton'
import { Container } from 'semantic-ui-react'
const SpeechRecognition = window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.continous = true
recognition.interimResults = false
recognition.lang = 'en-US'

class HTML extends React.Component {
  state = {
    listening: false,
    content: ``,
    jsxArray: [],
    backgroundColor: 'white'
  }

  onChange = event => {
    this.setState({ content: event })
  }

  handleListen = () => {
    console.log('listening?', this.state.listening)
    if (this.state.listening) {
      recognition.start()
      recognition.onend = () => {
        console.log('...continue listening...')
        recognition.start()
      }
    } else {
      recognition.stop()
      recognition.onend = () => {
        console.log('Stopped listening per click')
      }
    }

    recognition.onstart = () => {
      console.log('Listening!')
    }

    let finalTranscript = ''
    recognition.onresult = event => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' '
        }
      }

      // if (Soundex('for loop')=== Soundex('phone')) {
      //   console.log('yes')
      // } else {
      //   console.log('no')
      // }
      console.log(finalTranscript)
      // this.addContentToState(completeTranscript)
      this.addContentToState(finalTranscript)
    }
  }
  toggleListen = () => {
    this.setState(
      {
        listening: !this.state.listening
      },
      this.handleListen
    )
  }

  addTexttoTextArray = () => {
    this.setState({ textArray: [...this.state.textArray, this.state.codeText] })
  }

  h1Tag = name => {
    let normalTitle = name ? `${name}` : ''

    this.setState({
      jsxArray: [
        ...this.state.jsxArray,
        () => {
          return <h1>{normalTitle}</h1>
        }
      ]
    })

    return `\n <h1>  ${normalTitle}  </h1> \n`
  }

  h2Tag = name => {
    let normalTitle = name ? `${name}` : ''

    this.setState({
      jsxArray: [
        ...this.state.jsxArray,
        () => {
          return <h2>{normalTitle}</h2>
        }
      ]
    })

    return `\n <h2>  ${normalTitle}  </h2> \n`
  }

  h3Tag = name => {
    let normalTitle = name ? `${name}` : ''

    this.setState({
      jsxArray: [
        ...this.state.jsxArray,
        () => {
          return <h3>{normalTitle}</h3>
        }
      ]
    })

    return `\n <h3>  ${normalTitle}  </h3> \n`
  }

  h4Tag = name => {
    let normalTitle = name ? `${name}` : ''

    this.setState({
      jsxArray: [
        ...this.state.jsxArray,
        () => {
          return <h4>{normalTitle}</h4>
        }
      ]
    })

    return `\n <h4>  ${normalTitle}  </h4> \n`
  }

  pTag = name => {
    let normalTitle = name ? `${name}` : ''

    this.setState({
      jsxArray: [
        ...this.state.jsxArray,
        () => {
          return <p>{normalTitle}</p>
        }
      ]
    })

    return `\n <p>  ${normalTitle}  </p> \n`
  }

  addContentToState = newFinalTranscript => {
    let text = newFinalTranscript
    let textArray = text.split(' ')

    console.log(`the text is this: ${text}`)

    if (text.includes('H1')) {
      console.log('in the html')
      let tagContent = textArray.slice(textArray.indexOf('H1') + 2).join(' ')

      return this.setState({
        content: this.state.content + '\n' + this.h1Tag(tagContent)
      })
    } else if (text.includes('H2')) {
      console.log('in the html')
      let tagContent = textArray.slice(textArray.indexOf('H2') + 2).join(' ')

      return this.setState({
        content: this.state.content + '\n' + this.h2Tag(tagContent)
      })
    } else if (text.includes('H3')) {
      console.log('in the html')
      let tagContent = textArray.slice(textArray.indexOf('H3') + 2).join(' ')

      return this.setState({
        content: this.state.content + '\n' + this.h3Tag(tagContent)
      })
    } else if (text.includes('H4')) {
      console.log('in the html')
      let tagContent = textArray.slice(textArray.indexOf('H4') + 2).join(' ')

      return this.setState({
        content: this.state.content + '\n' + this.h4Tag(tagContent)
      })
    } else if (text.includes('p') || text.includes('tag')) {
      console.log('in the html')
      let tagContent = textArray.slice(textArray.indexOf('p') + 2).join(' ')

      return this.setState({
        content: this.state.content + '\n' + this.pTag(tagContent)
      })
    } else if(text.includes('colour')) {
        let colour = textArray[textArray.indexOf('colour') + 1]
        this.setState({backgroundColor:colour})
    }else if (text.includes('clear')) {
        this.setState({ content: '', jsxArray:[] })
      }
  }

  //   onChange = () => {

  // let someHtml = '<h1>hello</h1>'
  // let execute = () => {
  // return <div className="Container" dangerouslySetInnerHTML={{__html:
  //   someHtml}}></div>
  // }

  // console.log(execute(),(<h2>hello</h2>) )
  //   }

  renderHTML = () => {
    return this.state.jsxArray.map(fn => {
      return fn()
    })
  }

  render () {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <AceEditor
          placeholder='Placeholder Text'
          mode='html'
          theme='solarized_dark'
          name='blah2'
          onLoad={this.onLoad}
          onChange={this.onChange}
          fontSize={14}
          showPrintMargin
          showGutter
          highlightActiveLine
          value={this.state.content}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2
          }}
        />

        <Button toggleListen={this.toggleListen} />
        <SaveButton
          snippet={this.state.content}
          username={this.props.username}
          editID={this.props.editID}
        />
        <Container style={{ backgroundColor: `${this.state.backgroundColor}` }} className='inverted'>
          {this.renderHTML()}
        </Container>
      </div>
    )
  }
}

export default HTML
