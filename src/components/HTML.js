import React from 'react'
import Button from './Button'
import brace from 'brace'
import AceEditor from 'react-ace'
import FuzzySet from 'fuzzyset.js'
import Soundex from 'soundex-phonetics'
import 'brace/mode/html'
import 'brace/theme/terminal'
import SaveButton from './SaveButton'
import { Container, Segment } from 'semantic-ui-react'
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
    backgroundColor: 'white',
    keywords: [],
    structure: null,
    textColor: null,
    justifyContent: null,
    flexDirection: null,
    flexWrap: null,
    understood: true,
    showingSavedDisplay: false,
    selectedYouTubeVideo: null 
  }

  onChange = event => {
    this.setState({ content: event })
    this.setState({ showingSavedDisplay: false })
  }

  handleListen = () => {
    console.log('listening?', this.state.listening)
    this.setState({ showingSavedDisplay: false })

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

  showSavedDisplay = () => {
    this.setState({showingSavedDisplay: true})
  }

  h1Tag = (name, className) => {
    let normalTitle = name ? `${name}` : ''

    this.setState({
      jsxArray: [
        ...this.state.jsxArray,
        () => {
          return (
            <h1 className={className} style={{}}>
              {normalTitle}
            </h1>
          )
        }
      ]
    })

    return `\n <h1 class="${className}">  ${normalTitle}  </h1> \n`
  }

  h2Tag = (name, className) => {
    let normalTitle = name ? `${name}` : ''

    this.setState({
      jsxArray: [
        ...this.state.jsxArray,
        () => {
          return <h2 className={className}>{normalTitle}</h2>
        }
      ]
    })

    return `\n <h2 class="${className}">  ${normalTitle}  </h2> \n`
  }

  h3Tag = (name, className) => {
    let normalTitle = name ? `${name}` : ''

    this.setState({
      jsxArray: [
        ...this.state.jsxArray,
        () => {
          return <h3 className={className}>{normalTitle}</h3>
        }
      ]
    })

    return `\n <h3 class="${className}">  ${normalTitle}  </h3> \n`
  }

  h4Tag = (name, className) => {
    let normalTitle = name ? `${name}` : ''

    this.setState({
      jsxArray: [
        ...this.state.jsxArray,
        () => {
          return <h4 className={className}>{normalTitle}</h4>
        }
      ]
    })

    return `\n <h4 class="${className}">  ${normalTitle}  </h4> \n`
  }

  pTag = (name, className) => {
    let normalTitle = name ? `${name}` : ''

    this.setState({
      jsxArray: [
        ...this.state.jsxArray,
        () => {
          return <p className={className}>{normalTitle}</p>
        }
      ]
    })

    return `\n <p class="${className}">  ${normalTitle}  </p> \n`
  }

  boxShape = (num, color) => {
    let result = ''
    let nums = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
      ten: 10
    }

    num = nums[num] || num
    for (let i = 0; i < num; i++) {
      this.setState({
        jsxArray: [
          ...this.state.jsxArray,
          () => {
            return (
              <div
                style={{
                  margin: '10px',
                  width: '100px',
                  height: '100px',
                  backgroundColor: `${color}`
                }}
              />
            )
          }
        ]
      })

      result += `<div
      style={{
        margin: '10px',
        width: '100px',
        height: '100px',
        backgroundColor: ${color}
      }}
    />`
    }
    // console.log(num)
    return result
  }

  addContentToState = newFinalTranscript => {
    let text = newFinalTranscript
    let textArray = text.replace(/-/g, ' ').split(' ')
    let theClassName = null
    this.setState({ understood: true })

    console.log(`the text is this: ${text}`)

    // let keyWord = null
    // if (
    //   this.state.keywords.find(word => {
    //     keyWord = word
    //     return text.includes(word)
    //   })
    // ) {

    // }

    if (text.includes('class')) {
      theClassName = textArray[textArray.indexOf('class') + 1]
      this.setState({ keywords: [...this.state.keywords, theClassName] })
      console.table(textArray)
      textArray = textArray.filter(word => {
        return (
          word !== 'class' && word !== textArray[textArray.indexOf('class') + 1]
        )
      })
      console.table(textArray)
    }

    if (text.includes('H1')) {
      console.log('in the html')
      let tagContent = textArray.slice(textArray.indexOf('H1') + 2).join(' ')

      return this.setState({
        content:
          this.state.content + '\n' + this.h1Tag(tagContent, theClassName)
      })
    } else if (text.includes('H2')) {
      console.log('in the html')
      let tagContent = textArray.slice(textArray.indexOf('H2') + 2).join(' ')

      return this.setState({
        content:
          this.state.content + '\n' + this.h2Tag(tagContent, theClassName)
      })
    } else if (text.includes('H3')) {
      console.log('in the html')
      let tagContent = textArray.slice(textArray.indexOf('H3') + 2).join(' ')

      return this.setState({
        content:
          this.state.content + '\n' + this.h3Tag(tagContent, theClassName)
      })
    } else if (text.includes('H4')) {
      console.log('in the html')
      let tagContent = textArray.slice(textArray.indexOf('H4') + 2).join(' ')

      return this.setState({
        content:
          this.state.content + '\n' + this.h4Tag(tagContent, theClassName)
      })
    } else if (text.includes('display')) {
      let display = textArray[textArray.indexOf('display') + 1]
      this.setState({ structure: display })
    } else if (text.includes('flex-wrap')) {
      // console.log(textArray)
      let wrap = textArray
        .slice(textArray.indexOf('wrap') + 1)
        .join(' ')
        .replace(' ', '-')
      console.log(wrap)
      this.setState({ flexWrap: wrap })
    } else if (text.includes('flex-direction')) {
      // console.log(textArray)
      let direction = textArray
        .slice(textArray.indexOf('direction') + 1)
        .join(' ')
      console.log(direction)
      this.setState({ flexDirection: direction })
    } else if (text.includes('p') || text.includes('tag')) {
      console.log('in the html')
      let tagContent = textArray.slice(textArray.indexOf('p') + 2).join(' ')

      return this.setState({
        content:
          this.state.content + '\n' + this.pTag(tagContent, theClassName)
      })
    } else if (text.includes('colour') && text.includes('text')) {
      let colour = textArray[textArray.indexOf('colour') + 1]
      this.setState({ textColor: colour })
    } else if (text.includes('colour')) {
      let colour = textArray[textArray.indexOf('colour') + 1]
      this.setState({ backgroundColor: colour })
    } else if (text.includes('clear')) {
      this.setState({ content: '', jsxArray: [] })
    } else if (text.includes('justify') && text.includes('content')) {
      let position = textArray[textArray.indexOf('content') + 1]
      console.log('we made it')
      this.setState({ justifyContent: position })
    } else if (text.includes('box') || text.includes('boxes')) {
      if (text.includes('boxes')) {
        let color = textArray[textArray.indexOf('boxes') - 1]
        let num = textArray[textArray.indexOf('boxes') - 2]
        console.log(num)
        return this.setState({
          content: this.state.content + '\n' + this.boxShape(num, color)
        })
      } else {
        let color = textArray[textArray.indexOf('box') - 1]
        let num = 1
        // console.log(num)
        return this.setState({
          content: this.state.content + '\n' + this.boxShape(num, color)
        })
      }
    } else if (text.includes('video')) {
        let searchTerm = textArray.slice(textArray.indexOf('video') + 1).join(' ')
        searchTerm = searchTerm.split(' ').join('+')
        const YOUTUBE = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchTerm}+&key=AIzaSyCvd5ISDIyQ1if06rQ7NC1fvPuqi3zUhlY`
        return (
          fetch(YOUTUBE)
            .then(resp => resp.json())
            // .then(console.log)
            .then(obj => this.setState({ selectedYouTubeVideo: obj.items[0] }))
        )
    
    } else {
      this.setState({ understood: false })
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

  renderVideo = () => {
      const video = this.state.selectedYouTubeVideo 
    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}?autoplay=1`


    return <iframe  width="300px" height="200px" src={videoSrc} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

  }

  render () {
    return (
      <div>
        <header
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '50px'
          }}
          className='header'
        >
          <h1 className='h1 mega montserrat bold color-emphasis-1'>Dexter</h1>
        </header>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <AceEditor
            placeholder='Placeholder Text'
            mode='html'
            theme='terminal'
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
            showSavedDisplay={this.showSavedDisplay}
            showingSavedDisplay={this.state.showingSavedDisplay}
            snippet={this.state.content}
            username={this.props.username}
            editID={this.props.editID}
          />
          <Container
            style={{
              flexWrap: `${this.state.flexWrap}`,
              flexDirection: `${this.state.flexDirection}`,
              justifyContent: `${this.state.justifyContent}`,
              color: `${this.state.textColor}`,
              display: `${this.state.structure}`,
              backgroundColor: `${this.state.backgroundColor}`
            }}
            className='inverted'
          >
            {this.renderHTML()}
            {this.state.selectedYouTubeVideo ? this.renderVideo() : null }
          </Container>
        </div>
        {this.state.understood ? (
          <Segment
            style={{
              fontSize: '20px',
              marginTop: '50px',
              height: '300px',
              width: '500px'
            }}
            inverted
          >
            Example Commands:
            <ul>
              <p style={{ fontSize: '17px', margin: '15px' }}>
                "Dexter, background colour gold!"
              </p>
              <p style={{ fontSize: '17px', margin: '15px' }}>
                "Dexter, h1 tag website!"
              </p>
              <p style={{ fontSize: '17px', margin: '15px' }}>
                "Dexter, give me five gold boxes!"
              </p>
              <p style={{ fontSize: '17px', margin: '15px' }}>
                "Dexter, display flex!"
              </p>
              <p style={{ fontSize: '17px', margin: '15px', color: 'red' }}>
                You can try more HTML and CSS commands!
              </p>

              <br />
            </ul>
          </Segment>
        ) : (
          <Segment style={{ fontSize: '50px', marginRight: '10px' }} inverted>
            {' '}
            <p style={{ fontSize: '20px', margin: '15px', color: 'red' }}>
              Dexter - "Sorry I don't understand, please try again."
            </p>{' '}
          </Segment>
        )}
      </div>
    )
  }
}

export default HTML
