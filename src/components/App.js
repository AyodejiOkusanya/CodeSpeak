import React from 'react'
import CodeContainer from './CodeContainer'
import { Route, withRouter, Switch, Link } from "react-router-dom"
import Navbar from './Navbar'
import SignInPage from './SignInPage'
import API from './API'
import Snippets from './Snippets'

class App extends React.Component {
  state = {
    username: '',
    password: ''
  }

  // signIn = (username, password) => {
  //   this.setState({ username, password })
  // }

  signIn = user => {
    localStorage.setItem('token', user.token)
    this.setState({ username: user.name })
  }

  signOut = () => {
    localStorage.removeItem('token')
    this.setState({ username: '' })
  }

  componentDidMount() {
    API.validate().then(userData => {
      if (userData.error) {
        this.signOut() 
      } else {
        this.signIn(userData)
        this.props.history.push('/snippets')
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
        <Navbar signOut={this.signOut}/>
        <Switch>
          <Route
            exact
            path='/'
            component={routerProps => (
              <SignInPage signIn={this.signIn} {...routerProps} />
            )}
          />
          <Route
            
            path='/snippets'
            component={routerProps => (
              <Snippets username={this.state.username} {...routerProps} />
            )}
          />
          <Route  path='/record' component={() => <CodeContainer />} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);
