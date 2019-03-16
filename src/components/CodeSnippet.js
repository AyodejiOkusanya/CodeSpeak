import React from 'react'
import ForLoop from './ForLoop'
import ClassComp from './ClassComp'
import ArrowFunction from './ArrowFunction'

class CodeSnippet extends React.Component {
  produceSnippet = () => {
    let text = this.props.codeText.toLowerCase()
    let textArray = text.split(' ')
    if (text.includes('for') || text.includes('loop')) {
      return <ForLoop />
    } else if (text.includes('class')) {
      let classTitle = textArray[textArray.indexOf('class') + 1]
      this.props.returnKeyWord(classTitle)

      return <ClassComp classTitle={classTitle} />
    } else if (text.includes('arrow') && text.includes('function')) {
      let functionName = textArray[textArray.indexOf('function') + 1]
      this.props.returnKeyWord(functionName)
      return <ArrowFunction functionName={functionName} text={text} />
    }
  }

  render () {
    return <div>{this.produceSnippet()}</div>
  }
}

export default CodeSnippet
