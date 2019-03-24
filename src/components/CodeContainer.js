import React from 'react'
import Button from './Button'
import brace from 'brace'
import AceEditor from 'react-ace'
import FuzzySet from 'fuzzyset.js'
import Soundex from 'soundex-phonetics'
import 'brace/mode/javascript'
import 'brace/theme/solarized_dark'
import SaveButton from './SaveButton'
import { Segment } from 'semantic-ui-react'
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

  componentDidMount () {
    if (this.props.editContent) {
      this.setState({ content: this.props.editContent })
    }
  }

  onChange = event => {
    this.setState({ content: event })
  }

  handleListen = () => {
    console.log('listening?', this.state.listening)
    if (this.state.listening) {
      recognition.start()
      recognition.onend = () => {
        // console.log('...continue listening...')
        // recognition.start()
        this.setState({ listening: false })
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
      let fTArray = finalTranscript.split(' ').map(word => {
        // console.log(this.fuzzyMatchBox.get(word)[1] )
        return this.fuzzyMatchBox.get(word)
          ? this.fuzzyMatchBox.get(word)[0][1]
          : word
      })

      let completeTranscript = fTArray.join(' ')
      // if (Soundex('for loop')=== Soundex('phone')) {
      //   console.log('yes')
      // } else {
      //   console.log('no')
      // }
      // console.log(finalTranscript)
      // console.log(completeTranscript)
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
    let classTitleArray = classTitle.split('')
    classTitleArray[0] = classTitleArray[0].toUpperCase()
    classTitle = classTitleArray.join('')
    return ` \n class ${classTitle} {   } \n`
  }

  arrowFn = name => {
    let arrowTitle = name ? `${name} = ` : ''

    return ` \n ${arrowTitle}() => {   } \n `
  }

  normalFn = name => {
    let normalTitle = name ? `${name}` : ''

    return `\n function ${normalTitle} () {   } \n`
  }

  innerClassFn = name => {
    let title = name ? `${name}` : ''
    return ` \n ${title} () {   } \n `
  }

  letPhrase = (name, array) => {
    let calc = {
      add: '+',
      plus: '+',
      minus: '-',
      subtract: '-',
      multiply: '*',
      x: '*',
      times: '*',
      divide: '/',
      in: ' '
    }
    // console.log(array)
    let newA = array.map(word => {
      return calc[word] || word
    })
    // console.log(newA)
    let result = newA.join(' ')

    return ` \n let ${name} = ${result} \n `
  }

  constPhrase = (name, array) => {
    let calc = {
      add: '+',
      plus: '+',
      minus: '-',
      subtract: '-',
      multiply: '*',
      x: '*',
      times: '*',
      divide: '/',
      in: ' '
    }
    // console.log(array)
    let newA = array.map(word => {
      return calc[word] || word
    })
    // console.log(newA)
    let result = newA.join(' ')

    return ` \n const ${name} = ${result} \n `
  }

  consoleLogPhrase = (string, array) => {
    let calc = {
      add: '+',
      plus: '+',
      minus: '-',
      subtract: '-',
      multiply: '*',
      x: '*',
      times: '*',
      divide: '/',
      in: ' ',
      string: ' '
    }
    console.log(array)
    let newA = array.map(word => {
      return calc[word] || word
    })

    let result = newA.join(' ')

    return string ? `\n console.log('${result}')` : `console.log(${result}) \n `
  }

  fuzzyMatchBox = FuzzySet(['for', 'loop', 'class', 'function', 'clear'])

  injectNewCode = (text, keyWord, textArray) => {
    let lowerKeyWord = keyWord
    if (
      this.state.keywords.find(word => {
        keyWord = word

        if (word) {
          lowerKeyWord = word.toLowerCase()
        }
        return text.includes(lowerKeyWord)
      })
    ) {
      // console.log('i ran')
      console.log('inside', `keyword is ${keyWord}`)
      let keyWordIndex = textArray.indexOf(lowerKeyWord)
      let parsedTranscript = textArray.slice(0, keyWordIndex).join(' ')

      let injectHere = this.state.content.split(' ').indexOf(keyWord)
      // console.log(this.state.content.split(' ')[injectHere + 1])

      // console.log(`injectHere: ${injectHere}`)
      // console.log(`contentArray:${this.state.content.split(' ')}`)

      if (this.state.content.split(' ')[injectHere - 1] === 'class') {
        return this.setState({
          content: [
            ...this.state.content.split(' ').slice(0, injectHere + 2),
            this.returnCodeSnippetWithoutChangingState(
              parsedTranscript,
              'here'
            ),
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
      } else if (this.state.content.split(' ')[injectHere - 1] === 'function') {
        // console.log('got here')
        return this.setState({
          content: [
            ...this.state.content.split(' ').slice(0, injectHere + 4),
            this.returnCodeSnippetWithoutChangingState(parsedTranscript),
            this.state.content.split(' ').slice(injectHere + 4)
          ]
            .join(' ')
            .split(',')
            .join(' ')
        })
      } else if (this.state.content.split(' ')[injectHere + 1] === '()') {
        return this.setState({
          content: [
            ...this.state.content.split(' ').slice(0, injectHere + 4),
            this.returnCodeSnippetWithoutChangingState(parsedTranscript),
            this.state.content.split(' ').slice(injectHere + 4)
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
    } else if (
      text.includes('class') ||
      text.includes('cross') ||
      text.includes('glass')
    ) {
      let classTitle = textArray[textArray.indexOf('class') + 1]
      if (classTitle !== '') {
        this.fuzzyMatchBox.add(classTitle)
        let classTitleArray = classTitle.split('')
        classTitleArray[0] = classTitleArray[0].toUpperCase()
        classTitle = classTitleArray.join('')

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
    } else if (text.includes('function')) {
      let functionName = textArray[textArray.indexOf('function') + 1]

      if (functionName !== '') {
        this.setState({ keywords: [...this.state.keywords, functionName] })
      }

      return this.setState({
        content: this.state.content + '\n' + this.normalFn(functionName)
      })
    } else if (text.includes('let')) {
      let functionName = textArray[textArray.indexOf('let') + 1]
      let phraseArray
      if (text.includes('=')) {
        phraseArray = textArray.slice(textArray.indexOf('=') + 1)
      } else {
        phraseArray = textArray.slice(textArray.indexOf('equal') + 1)
      }

      return this.setState({
        content:
          this.state.content + '\n' + this.letPhrase(functionName, phraseArray)
      })
    } else if (text.includes('constant')) {
      let functionName = textArray[textArray.indexOf('constant') + 1]
      let phraseArray
      if (text.includes('=')) {
        phraseArray = textArray.slice(textArray.indexOf('=') + 1)
      } else {
        phraseArray = textArray.slice(textArray.indexOf('equal') + 1)
      }

      return this.setState({
        content:
          this.state.content +
          '\n' +
          this.constPhrase(functionName, phraseArray)
      })
    } else if (text.includes('console')) {
      let phraseArray
      phraseArray = textArray.slice(textArray.indexOf('console.log') + 1)
      let string = text.includes('string')

      return this.setState({
        content:
          this.state.content +
          '\n' +
          this.consoleLogPhrase(string, phraseArray)
      })
    }
  }

  returnCodeSnippetWithoutChangingState = (
    newFinalTranscript,
    classDets = null
  ) => {
    console.log(newFinalTranscript)

    let text = newFinalTranscript.toLowerCase()
    let textArray = text.split(' ')
    let keyWord = null

    if (this.injectNewCode(text, keyWord, textArray) !== 'end') {
      return
    }

    if (text.includes('function') && classDets) {
      let functionName = textArray[textArray.indexOf('function') + 1]
      this.setState({ keywords: [...this.state.keywords, functionName] })
      return this.innerClassFn(functionName)
    }

    if (text.includes('for') || text.includes('loop')) {
      return this.forLoop()
    } else if (
      text.includes('class') ||
      text.includes('cross') ||
      text.includes('glass')
    ) {
      let classTitle = textArray[textArray.indexOf('class') + 1]
      if (classTitle !== '') {
        let classTitleArray = classTitle.split('')
        classTitleArray[0] = classTitleArray[0].toUpperCase()
        classTitle = classTitleArray.join('')

        this.setState({ keywords: [...this.state.keywords, classTitle] })
      }

      return this.classFn(classTitle)
    } else if (text.includes('arrow') && text.includes('function')) {
      let functionName = textArray[textArray.indexOf('function') + 1]
      this.setState({ keywords: [...this.state.keywords, functionName] })

      return this.arrowFn(functionName)
    } else if (text.includes('clear')) {
      return this.setState({ content: '' })
    } else if (text.includes('function')) {
      let functionName = textArray[textArray.indexOf('function') + 1]
      this.setState({ keywords: [...this.state.keywords, functionName] })
      return this.normalFn(functionName)
    } else if (text.includes('let')) {
      let functionName = textArray[textArray.indexOf('let') + 1]
      let phraseArray
      if (text.includes('=')) {
        phraseArray = textArray.slice(textArray.indexOf('=') + 1)
      } else {
        phraseArray = textArray.slice(textArray.indexOf('equal') + 1)
      }

      return this.letPhrase(functionName, phraseArray)
    } else if (text.includes('constant')) {
      let functionName = textArray[textArray.indexOf('constant') + 1]
      let phraseArray
      if (text.includes('=')) {
        phraseArray = textArray.slice(textArray.indexOf('=') + 1)
      } else {
        phraseArray = textArray.slice(textArray.indexOf('equal') + 1)
      }

      return this.constPhrase(functionName, phraseArray)
    } else if (text.includes('console')) {
      let phraseArray
      phraseArray = textArray.slice(textArray.indexOf('console.log') + 1)
      let string = text.includes('string')

      return this.consoleLogPhrase(string, phraseArray)
    }
  }

  onChange = event => {
    // console.log(event)
    this.setState({ content: event })
    // let someHtml = '<h1>hello</h1>'
    // let execute = () => {
    // return <div className="Container" dangerouslySetInnerHTML={{__html:
    //   someHtml}}></div>
    // }

    // console.log(execute(),(<h2>hello</h2>) )
  }

  render () {
    return (

      <div>
        <header style={{display:"flex", justifyContent:"center", marginBottom:"50px"}} className="header">
        <h1 className="mega montserrat bold color-emphasis-1" >Dexter</h1>
        </header>
     
      <div style={{ display: 'flex', justifyContent: 'center' }}>
       
         <Segment style={{fontSize:"50px",marginRight:"10px", }}inverted>
          Example Commands: 
          <ul>
            <p style={{fontSize:"20px",margin:"15px"}}>"Dexter, please make the function, hogwarts!"</p>
            <p style={{fontSize:"20px",margin:"15px"}}>"Dexter, please make the class movies!"</p>
            <p style={{fontSize:"20px",margin:"15px"}}>"Dexter, console log string welcome to javascript!"</p>
            <p style={{fontSize:"20px",margin:"15px"}}>"Dexter, console log string welcome to javascript!"</p>
            <p style={{fontSize:"20px",margin:"15px"}}>"Dexter, put a loop in my hogwarts funciton!"</p>
            <br></br>
            <h1>Feel free to try other javascript commands!</h1>



          </ul>
         
         
         
         
         
         </Segment>
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
          value={this.state.content}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2
          }}
        />

        <Button
          toggleListen={this.toggleListen}
          listening={this.state.listening}
        />
        <SaveButton
          snippet={this.state.content}
          username={this.props.username}
          editID={this.props.editID}
        />
      </div>
      </div>
    )
  }
}

export default CodeContainer
