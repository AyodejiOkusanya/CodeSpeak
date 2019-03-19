import React from 'react'
import { Button, Form, Segment, Divider, Checkbox } from 'semantic-ui-react'
import API from './API';

class SignInPage extends React.Component {

    state = {
        username: '',
        password: ''
    }

    handleSubmit = (event) => {
        event.preventDefault(); 
        const {signIn, history} = this.props
        const user = this.state 
        API.signin(user).then(data => {
            if (data.error) {
                alert('something is wrong')
            } else {
                signIn(data)
                history.push('/snippets')
            }
        })
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
