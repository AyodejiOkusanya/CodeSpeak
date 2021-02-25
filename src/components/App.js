import React from 'react'
import CodeContainer from './CodeContainer'
import { Route, withRouter, Switch } from 'react-router-dom'
import Navbar from './Navbar'
import HTML from './HTML'
import './Header.css'

class App extends React.Component {
  state = {
    username: '',
    editContent: '',
    editID: null
  }

  handleEditContent = (content, id) => {
    this.setState({ editContent: content, editID: id })
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
        <Navbar
          signOut={this.signOut}
          username={this.state.username}
          handleEditContent={this.handleEditContent}
        />

        <main>
          <Switch>
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
            <Route path='/html' component={() => <HTML />} />
            <Route
              exact
              path='/'
              component={() => (
                <CodeContainer
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
