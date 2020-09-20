import React, { useState } from "react";
import {
  Container,
  Breadcrumb,
  Grid,
  Header,
  Segment,
  Sidebar,
  Icon
} from "semantic-ui-react";
import LeftMenu from "../layouts/LeftMenu";
import UserDashbord from "./UserDashboard";
import { Redirect } from "react-router";
import CategoryDashboard from "./CategoryDashboard";
import ReservationDashboard from "./ReservationDashboard";
import VehiculeDashboard from "./VehiculeDashboard";
import HomeDashboard from "./HomeDashboard";

import { ToastProvider, useToasts } from 'react-toast-notifications'

function Dashbord() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [activeIcon, setActiveIcon] = useState('home');
  const handleItemClick = (e, { name }) => setActiveItem({ name });



  const switchRender = (param) => {
    
    switch (param) {
      case "/admin/home":
        return <HomeDashboard />;

      case "/admin/reservations":
        return <ReservationDashboard />;

      case "/admin/vehicules":
        return <VehiculeDashboard />;

      case "/admin/categories":
        return <CategoryDashboard />;

      case "/admin/users":
        return <UserDashbord />;

      default:
        return <Redirect to="/admin/home" />;
    }
  };

  return (
    <Container fluid style={{ marginTop: "5em",height: "100vh !important" }}>
      <Grid columns={1} style={{ height: "100vh"}}>
        <Grid.Column style={{padding: '0rem'}}>
          <Sidebar.Pushable as={Segment} style={{width:'100%'}}>
            <LeftMenu itemSelected = {window.location.pathname.split('/')[2]}/>

            <Sidebar.Pusher style={{ height: '100vh', overflowY : 'scroll', backgroundColor : '#f7f7f7'}}>>

              <Header as='h1' textAlign='left' style={{textTransform : 'capitalize', marginLeft : '2rem', marginTop : '2rem'}}>{window.location.pathname.split('/')[2]}</Header>

              <Breadcrumb size="big" style={{ width: "100%",textAlign : 'left', marginLeft : '2rem', marginBottom : '2rem'}}>
                <Breadcrumb.Section link>{window.location.pathname.split('/')[1]}</Breadcrumb.Section>
                <Breadcrumb.Divider>/</Breadcrumb.Divider>
                <Breadcrumb.Section active>{window.location.pathname.split('/')[2]}</Breadcrumb.Section>
              </Breadcrumb>
              
              <ToastProvider>
              {switchRender(window.location.pathname)}
              </ToastProvider>

          </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Grid.Column>
      </Grid>

      
    </Container>
  );
}

export default Dashbord;
