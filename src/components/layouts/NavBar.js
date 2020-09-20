import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Dropdown, Image, Menu, Button, Icon, Grid, Header } from "semantic-ui-react";
import { useAuth } from "../../context/auth";
import axios from 'axios';



function NavBar() {
  const { setAuthTokens, authTokens, setAuthUsers, authUsers,authRole } = useAuth();

  function logOut() {
    setAuthTokens("");
    setAuthUsers("");
  }

  useEffect(() => {
    if(authUsers === 'undefined'){
      logOut();
    }
    async function fetchData() {
      const result = await axios.get("http://127.0.0.1:8000/api/user", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens}`
        }
      });
      setAuthUsers(result.data.user);
      
      if(result.data.status){
        logOut();
      }
    }
    fetchData();
    
  }, []);

  return (
    
    <div>
      <Menu size='huge'  borderless fixed='top' inverted color='teal'>
        <Container fluid>
          <Menu.Item as={Link} to="/" header>
            <Image
              size="mini"
              src={process.env.PUBLIC_URL + "/image/logo.png"}
              style={{ marginRight: "1.5em" }}
            />
            Location
          </Menu.Item>

          {
            authTokens ? (

              <Menu.Menu position="right">

                <Dropdown  size='big' item trigger={<span> <Icon name="user circle" size='big' /></span>} icon={null} >


                  <Dropdown.Menu >
                  <Dropdown.Item text={'Bonjour '+ (authUsers ? authUsers.nom : '') }  />
                    {authRole == 'admin' ? (<Dropdown.Item icon='th' text='Dashboard' as={Link} to="/admin/home"/>):''}
                    <Dropdown.Item icon='clipboard' text='Reservation' as={Link} to="/account"/>
                    <Dropdown.Item icon='settings' text='Profile' as={Link} to="/profile"/>
                    <Dropdown.Item icon='sign out' text='logout' onClick={logOut} />

                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Menu>) : (

                <Menu.Menu position="right">
                  <Menu.Item >
                    <Button basic inverted as={Link} to="/login">Login</Button>
                  </Menu.Item>

                  <Menu.Item >
                    <Button inverted as={Link} to="/register">Register</Button>
                  </Menu.Item>

                </Menu.Menu>)
          }

        </Container>
      </Menu>
    </div>
  );
}

export default NavBar;
