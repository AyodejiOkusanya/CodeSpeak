import React from 'react'
import Highlight from 'react-highlight'
import CodeSnippet from './CodeSnippet'
import Typist from 'react-typist';


class ArrowFunction extends React.Component {
  state = {
    content: []
  }

  makeArrowFunction = () => {
    let functionName = this.props.functionName + ' =' || null
    let renderedContent = null
    if (this.props.text.includes(functionName)) {
      this.setState(
        {
          content: [
            ...this.state.content,
            () => {
              return <CodeSnippet codeText={this.props.text} />
            }
          ]
        },

        (renderedContent = this.state.content.map(fn => {
          return fn()
        }))
      )
    } else {
      let content = () => null
    }

    let code = `${functionName} () => {
                    ${renderedContent}
                }
                `

    return (
      <Typist>
        <Highlight language='javascript'>{code}</Highlight>
        </Typist>
        )
  }
  render () {
    return <div>{this.makeArrowFunction()}</div>
  }
}

export default ArrowFunction
