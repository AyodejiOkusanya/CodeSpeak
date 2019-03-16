import React from 'react'
import Highlight from 'react-highlight'
import Typist from 'react-typist';


class ForLoop extends React.Component {
  createForLoop = () => {
    let code = `for let(i = 0; i < n; i++) {

                }
                `
  

    return (
      <Typist>
    <Highlight language="javascript">
        {code}
    </Highlight>
    </Typist>
    )
  }
  render () {
    return <div>{this.createForLoop()}</div>
  }
}

export default ForLoop
