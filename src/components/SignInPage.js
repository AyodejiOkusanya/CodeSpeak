import React from 'react'
import { Button, Form, Segment, Divider, Checkbox } from 'semantic-ui-react'

class SignInPage extends React.Component {

    state = {
        username: '',
        password: ''
    }

    handleSubmit = (event) => {
        this.props.signIn(this.state.username, this.state.password)
    }

    handleChange = (event) => {
    
        this.setState({
            [event.target.name] : event.target.value 
        })
    }


  render () {
    return (
      <div
        style={{
          backgroundColor: 'black',
          backgroundSize: 'cover',
          height: '1000px',
          width: '100%'
        }}
      >
        <div>
          <Form
            className='inverted'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onSubmit = {this.handleSubmit}
          >
            <Form.Field style={{ padding: '10px' }}>
              <label>Username</label>
              <input onChange={this.handleChange} value={this.state.username} name = 'username' placeholder='Username' />
            </Form.Field>
            <Form.Field style={{ padding: '10px' }}>
              <label>Password</label>
              <input onChange={this.handleChange} value={this.state.password} name = 'password' placeholder='Password' />
            </Form.Field>

            <Button type='submit'>Submit</Button>
          </Form>
        </div>
      </div>
    )
  }
}
export default SignInPage
