import React from 'react'
import { Menu } from 'semantic-ui-react'

class Navbar extends React.Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render () {
    const { activeItem } = this.state

    return (
      <div style={{marginBottom:'30px', padding: '10px'}}>
        <Menu inverted pointing secondary>
          <Menu.Item
            name='write code'
            active={activeItem === 'write code'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='snippets'
            active={activeItem === 'snippets'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='share'
            active={activeItem === 'share'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

export default Navbar
