import React from 'react'
import {
  Icon,
  Menu,
  Sidebar,
} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
const LeftMenu = (props) => {
  console.log();
  const [activeItem,setActiveItem] = React.useState(props.itemSelected);

  const [selectedHome,setSelectedHome] = React.useState('');
  
  // React.useEffect(() => {
  //   selectedItem == 'home' ? setSelectedHome("header style={{borderLeft : '5px solid #fff'}}") : setSelectedHome('');
    
  // }, [selectedItem])
  // 'header style={{borderLeft : '5px solid #fff'}}': ''

 const  handleItemClick = (e, { name }) => setActiveItem(name)

  return (
          <Sidebar
            as={Menu}
            animation='push'
            icon='labeled'
            vertical
            inverted
            visible
            style={{height:'100vh',paddingTop:'15vh'}}
            width='thin'
            fixed="left"
          >
            
            <Menu.Item as={Link} to='/admin/home' name='home' active={activeItem === 'home'} onClick={handleItemClick}>
              <Icon name='home' color='red' />
              Home
            </Menu.Item>
            <Menu.Item as={Link} to='/admin/reservations' name='reservations' active={activeItem === 'reservations'} onClick={handleItemClick}>
              <Icon name='opencart' color='orange'/>
              Reservations
            </Menu.Item>
            <Menu.Item as={Link} to='/admin/vehicules' name='vehicules' active={activeItem === 'vehicules'} onClick={handleItemClick}>
              <Icon name='car' color='yellow'/>
              Vehicules
            </Menu.Item>
            <Menu.Item as={Link} to='/admin/categories' name='categories' active={activeItem === 'categories'} onClick={handleItemClick}>
              <Icon name='tag' color='green'/>
              Categories
            </Menu.Item>
            <Menu.Item as={Link} to='/admin/users' name='users' active={activeItem === 'users'} onClick={handleItemClick}>
              <Icon name='users'color='violet'/>
              Users
            </Menu.Item>
            <Menu.Item as={Link} to=''>
              <Icon name='talk' color='purple'/>
              Message
            </Menu.Item>
          </Sidebar>
  )
}

export default LeftMenu
