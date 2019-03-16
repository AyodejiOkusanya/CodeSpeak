import React from 'react'
import Highlight from 'react-highlight'
import Typist from 'react-typist';

class ClassCoomp extends React.Component {

    createClass = () => {
        let classTitle = this.props.classTitle ? this.props.classTitle : 'Please specify a class name'
        let code = `class ${classTitle.toUpperCase()} {
        
                }`

        return (
            <Typist>
            <Highlight language="javascript">
                {code}
            </Highlight>
            </Typist>
        )
    }


    render() {
        return (
            <div>{this.createClass()}</div>
        )
    }
}

export default ClassCoomp