import React from 'react'
import CodeContainer from './CodeContainer'
import { Route, withRouter, Switch, Link } from 'react-router-dom'
import Navbar from './Navbar'
import SignInPage from './SignInPage'
import API from './API'
import Snippets from './Snippets'
import HTML from './HTML'
import { Header } from 'semantic-ui-react'
import './Header.css'


class App extends React.Component {
  state = {
    username: '',
    editContent: '',
    editID: null 
  }

  // signIn = (username, password) => {
  //   this.setState({ username, password })
  // }

  

  signIn = user => {
    localStorage.setItem('token', user.token)
    this.setState({ username: user.username })
  }

  signOut = () => {
    localStorage.removeItem('token')
    this.setState({ username: '' })
  }

  componentDidMount () {
    API.validate().then(userData => {
      if (userData.error) {
        this.signOut()
      } else {
        this.signIn(userData)
        this.props.history.push('/snippets')
      }
    })
  }

  handleEditContent = (content, id) => {
    this.setState({ editContent: content, editID:id })
  }

  render () {
    return (
      <div
        style={{
          backgroundColor: 'black',
          backgroundSize: 'cover',
          height: '2000px',
          width: '100%'
        }}
      >
        <Navbar signOut={this.signOut} username={this.state.username} handleEditContent={this.handleEditContent}/>
       
        <main>
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
              <Snippets
                username={this.state.username}
                {...routerProps}
                handleEditContent={this.handleEditContent}
              />
            )}
          />
          <Route
            path='/record'
            component={() => (
              <CodeContainer
                username={this.state.username}
                editContent={this.state.editContent}
                editID={this.state.editID}
              />
            )}
          />
           <Route
            path='/html'
            component={() => (
              <HTML
                username={this.state.username}
                editContent={this.state.editContent}
                editID={this.state.editID}
              />
            )}
          />
        </Switch>
        </main>
      </div>
    )
  }
}

export default withRouter(App)
