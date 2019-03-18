import React from 'react'
import CodeSnippet from './CodeSnippet'
import Button from './Button'
import brace from 'brace'
import AceEditor from 'react-ace'
import FuzzySet from 'fuzzyset.js'
import Soundex from 'soundex-phonetics'
import 'brace/mode/javascript'
import 'brace/theme/monokai'

const SpeechRecognition = window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.continous = true
recognition.interimResults = false
recognition.lang = 'en-US'

class CodeContainer extends React.Component {
  state = {
    listening: false,
    content: `function onload(editor) {
    console.log("Welcome to CodeSpeak")
  }`,
    keywords: []
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
      let fTArray = finalTranscript.split(' ').map((word) => {
        // console.log(this.fuzzyMatchBox.get(word)[1] )
        return this.fuzzyMatchBox.get(word) ? this.fuzzyMatchBox.get(word)[0][1] : word 
      })

      let completeTranscript = fTArray.join(' ')
      // if (Soundex('for loop')=== Soundex('phone')) {
      //   console.log('yes')
      // } else {
      //   console.log('no')
      // }
      console.log(finalTranscript)
      console.log(completeTranscript)
      // this.setState({ codeText: finalTranscript }, this.addTexttoTextArray)
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

  forLoop = () => {
    return ` \n for (let i = 0; i < n; i++) {   } \n`
  }

  classFn = title => {
    let classTitle = title || `Enter name here`

    return ` \n class ${classTitle} {   } \n`
  }

  arrowFn = name => {
    let arrowTitle = name ? `${name} = ` : ''

    return ` \n ${arrowTitle}() => {   } \n `
  }

  fuzzyMatchBox = FuzzySet(['for','loop','class','arrow','function','clear'])

  injectNewCode = (text, keyWord, textArray) => {
    if (
      this.state.keywords.find(word => {
        keyWord = word
        return text.includes(word)
      })
    ) {
      console.log('i ran')
      console.log('inside', `keyword is ${keyWord}`)
      let keyWordIndex = textArray.indexOf(keyWord)
      let parsedTranscript = textArray.slice(0, keyWordIndex).join(' ')

      let injectHere = this.state.content.split(' ').indexOf(keyWord)

      console.log(`injectHere: ${injectHere}`)
      console.log(`contentArray:${this.state.content.split(' ')}`)

      if (this.state.content.split(' ')[injectHere - 1] === 'class') {
        return this.setState({
          content: [
            ...this.state.content.split(' ').slice(0, injectHere + 2),
            this.returnCodeSnippetWithoutChangingState(parsedTranscript),
            this.state.content.split(' ').slice(injectHere + 2)
          ]
            .join(' ')
            .split(',')
            .join(' ')
        })
      } else if (this.state.content.split(' ')[injectHere + 1] === '=') {
        return this.setState({
          content: [
            ...this.state.content.split(' ').slice(0, injectHere + 7),
            this.returnCodeSnippetWithoutChangingState(parsedTranscript),
            this.state.content.split(' ').slice(injectHere + 7)
          ]
            .join(' ')
            .split(',')
            .join(' ')
        })
      }

      

      
    }

    return 'end'
  }

  addContentToState = newFinalTranscript => {
    let text = newFinalTranscript.toLowerCase()
    let textArray = text.split(' ')
    let keyWord = null

    console.log(`the keyword is ${keyWord}`)
    console.log(`the text is this: ${text}`)

    if (this.injectNewCode(text, keyWord, textArray) !== 'end') {
      return
    }

    if (text.includes('for') || text.includes('loop')) {
      return this.setState({
        content: this.state.content + '\n' + this.forLoop()
      })
    } else if (text.includes('class') || text.includes('cross')) {
      let classTitle = textArray[textArray.indexOf('class') + 1]
      if (classTitle !== '') {
        this.fuzzyMatchBox.add(classTitle)
        this.setState({ keywords: [...this.state.keywords, classTitle] })
      }

      return this.setState({
        content: this.state.content + '\n' + this.classFn(classTitle)
      })
    } else if (text.includes('arrow') && text.includes('function')) {
      let functionName = textArray[textArray.indexOf('function') + 1]
      if (functionName !== '') {
        this.fuzzyMatchBox.add(functionName)
        this.setState({ keywords: [...this.state.keywords, functionName] })
      }

      return this.setState({
        content: this.state.content + '\n' + this.arrowFn(functionName)
      })
    } else if (text.includes('clear')) {
      this.setState({ content: '', keywords: [] })
    }
  }

  returnCodeSnippetWithoutChangingState = newFinalTranscript => {
    console.log(newFinalTranscript)

    let text = newFinalTranscript.toLowerCase()
    let textArray = text.split(' ')
    let keyWord = null

    if (this.injectNewCode(text, keyWord, textArray) !== 'end') {
      return
    }

    if (text.includes('for') || text.includes('loop')) {
      return this.forLoop()
    } else if (text.includes('class') || text.includes('cross')) {
      let classTitle = textArray[textArray.indexOf('class') + 1]
      this.setState({ keywords: [...this.state.keywords, classTitle] })

      return this.classFn(classTitle)
    } else if (text.includes('arrow') && text.includes('function')) {
      let functionName = textArray[textArray.indexOf('function') + 1]
      this.setState({ keywords: [...this.state.keywords, functionName] })

      return this.arrowFn(functionName)
    } else if (text.includes('clear')) {
      return this.setState({ content: '' })
    }
  }

  render () {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <AceEditor
          placeholder='Placeholder Text'
          mode='javascript'
          theme='monokai'
          name='blah2'
          onLoad={this.onLoad}
          onChange={this.onChange}
          fontSize={14}
          showPrintMargin
          showGutter
          highlightActiveLine={true}
          value={this.state.content}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2
          }}
        />

        <Button toggleListen={this.toggleListen} />
      </div>
    )
  }
}

export default CodeContainer
