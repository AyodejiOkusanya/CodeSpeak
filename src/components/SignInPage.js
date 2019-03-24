import React from 'react'
import { Button, Form, Segment, Divider, Checkbox, Popup } from 'semantic-ui-react'
import API from './API'

class SignInPage extends React.Component {
  state = {
    username: '',
    password: ''
  }

  handleSubmit = event => {
    // event.preventDefault();
    const { signIn, history } = this.props
    const user = this.state
    API.signin(user).then(data => {
      if (data.error) {
        alert('Username/Password combo not recognized!')
      } else {
        // console.log('here')
        signIn(data)
        history.push('/snippets')
      }
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSignUp = () => {
    const { signIn, history } = this.props
    const user = this.state
    API.signup(user).then(data => {
      if (data.error) {
        alert('That username is taken!')
      } else {
        // console.log('here')
        signIn(data)
        history.push('/record')
      }
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
        <div>
          <Form
            className='inverted'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onSubmit={this.handleSubmit}
          >
            <Form.Field style={{ padding: '10px' }}>
              <label>Username</label>
              <input
                onChange={this.handleChange}
                value={this.state.username}
                name='username'
                placeholder='Username'
              />
            </Form.Field>
            <Form.Field style={{ padding: '10px' }}>
              <label>Password</label>
              <input
                type="password"
                onChange={this.handleChange}
                value={this.state.password}
                name='password'
                placeholder='Password'
              />
            </Form.Field>

            <Button type='submit'>Login</Button>
            <Popup trigger={<Button type='button' onClick={this.handleSignUp}>
            Sign Up
          </Button>} content='Sign up to get access to extra features like saving snippets!' />
            
          </Form>
         
        </div>
      </div>
    )
  }
}
export default SignInPage
