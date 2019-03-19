import React from 'react'
import CodeContainer from './CodeContainer'
import { Route, Switch } from 'react-router-dom'
import Navbar from './Navbar'
import SignInPage from './SignInPage'

class App extends React.Component {
  state = {
    username: '',
    password: ''
  }

  signIn = (username, password) => {
    this.setState({ username, password })
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
        <Navbar />
        <Switch>
          <Route
            exact
            path='/'
            component={() => <SignInPage signIn={this.signIn} />}
          />

          <Route exact path='/record' component={() => <CodeContainer />} />
        </Switch>
      </div>
    )
  }
}

export default App
