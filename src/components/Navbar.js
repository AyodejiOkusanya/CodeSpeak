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

  handleRecordClick = (e, { name }) => {
    this.setState({ activeItem: name })
    this.props.handleEditContent(`function onload(editor) {
      console.log("My name is Dexter, talk to me...")
    }`)
  }

  render () {
    const { activeItem } = this.state

    return (
      <div style={{ marginBottom: '30px', padding: '10px' }}>
        <Menu inverted pointing secondary>
          <Link to='/record'>
            <Menu.Item
              name='JS'
              active={activeItem === 'JS'}
              onClick={this.handleRecordClick}
            />
          </Link>
          <Link to='/html'>
            <Menu.Item
              name='HTML'
              active={activeItem === 'HTML'}
              onClick={this.handleItemClick}
            />
          </Link>
        </Menu>
      </div>
    )
  }
}

export default Navbar
