import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
class Navbar extends React.Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  handleClick = (e, { name }) => {
    this.setState({ activeItem: name })
    console.log('logging out')
    this.props.signOut()
  }

  render () {
    const { activeItem } = this.state

    return (
      <div style={{ marginBottom: '30px', padding: '10px' }}>
        <Menu inverted pointing secondary>
          <Link to='/record'>
            <Menu.Item
              name='write code'
              active={activeItem === 'write code'}
              onClick={this.handleItemClick}
            />
          </Link>
          <Link to='/snippets'>
            <Menu.Item
              name='snippets'
              active={activeItem === 'snippets'}
              onClick={this.handleItemClick}
            />
          </Link>
          <Menu.Item
            name='share'
            active={activeItem === 'share'}
            onClick={this.handleItemClick}
          />
          {this.props.username ? (
            <Menu.Menu position='right'>
              <Link to='/'>
                <Menu.Item
                  name='logout'
                  active={activeItem === 'logout'}
                  onClick={this.handleClick}
                />
              </Link>
            </Menu.Menu>
          ) : (
            <Menu.Menu position='right'>
              <Link to='/'>
                <Menu.Item
                  name='login'
                  active={activeItem === 'login'}
                  onClick={this.handleClick}
                />
              </Link>
            </Menu.Menu>
          ) }
        </Menu>
      </div>
    )
  }
}

export default Navbar
