import React,{ useState} from 'react'
import { Container, Breadcrumb, Grid, Menu } from 'semantic-ui-react'
import LeftMenu from '../layouts/LeftMenu'

function Dashbord() {

  const [activeItem,setActiveItem] = useState('Dashboard');

  const handleItemClick = (e, { name }) => setActiveItem({ name });

  return (
    <Container fluid style={{ marginTop: '5em' }}>
      <LeftMenu />
      <Breadcrumb size='big' >
            <Breadcrumb.Section link>Home</Breadcrumb.Section>
            <Breadcrumb.Divider>/</Breadcrumb.Divider>
            <Breadcrumb.Section active>Dashboard</Breadcrumb.Section>
      </Breadcrumb>
      {/* <Grid style={{ height: "100vh" }} doubling stackable >
        <Grid.Column width={3}>
        <Menu pointing secondary vertical style={{ marginTop: '5em' }} size='huge' fixed='left'>
        <Menu.Item
          name='Dashboard'
          active={activeItem === 'Dashboard'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='Reservation'
          active={activeItem === 'Reservation'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='Cars'
          active={activeItem === 'Cars'}
          onClick={handleItemClick}
        />
      </Menu>
        </Grid.Column>
        <Grid.Column width={13} textAlign='left'>
          <Breadcrumb size='big'>
            <Breadcrumb.Section link>Home</Breadcrumb.Section>
            <Breadcrumb.Divider>/</Breadcrumb.Divider>
            <Breadcrumb.Section active>Dashboard</Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid> */}

    </Container>

  )
}

export default Dashbord
