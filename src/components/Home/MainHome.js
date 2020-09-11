import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Button, Form, Grid, Header, Segment, Icon } from "semantic-ui-react";

import { DateInput } from 'semantic-ui-calendar-react';


function MainHome(props) {

  const today = new Date();
  const [startDate, setStartDate] = useState(today.getDate()+'-'+today.getMonth()+'-'+today.getFullYear());
  const [endDate, setEndDate] = useState(startDate);
  const [minDate, setMinDate] = useState(startDate);
  const [age, setAge] = useState('');

  const onChangeStart = (event, data) => {
    setStartDate(data.value);
    setEndDate(data.value);
    setMinDate(data.value);
  }
  const onChangeEnd = (event, data) => setEndDate(data.value);
  const onChangeAge = (event, data) => setAge(data.value);

  return (
    <Grid textAlign="center" style={{ margin: '0rem',height: "100vh",backgroundSize: 'cover',BackgroundPosition: 'center', backgroundImage: 'url("https://ticketschool.com/wp-content/uploads/2018/05/driver-hands-on-steering-wheel-driving-on-highway-road.jpg")'}} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }} >
        <Form size="large" >
          <Segment stacked >
            <Header as="h2" color="teal" textAlign="center">
            Louer une voiture
            </Header>

            <Header as="h4" textAlign='left' color="grey">DATE DE PRISE EN CHARGE</Header>
            <DateInput
          name="startDate"
          dateFormat='DD-MM-YYYY'
          minDate = {startDate}
          placeholder="Date Time"
          value={startDate}
          iconPosition="left"
          onChange={onChangeStart}
        />
            

            <Header as="h4" textAlign='left' color="grey">DATE DE RESTITUTION</Header>
            <DateInput
          name="endDate"
          dateFormat='DD-MM-YYYY'
          minDate = {minDate}
          placeholder="Date Time"
          value={endDate}
          iconPosition="left"
          onChange={onChangeEnd}
        />

        
            <Header as="h4" textAlign='left' color="grey">Âge du conducteur </Header>
            
            <Form.Input
              fluid
              icon="users"
              iconPosition="left"
              placeholder="Entre 20 et 55"
              type='number'
              min="20"
              max="55"
              onChange={onChangeAge}
              required
            />
           
            <Button as={Link} to={`/search/${startDate}/${endDate}/${age}`} color="teal" fluid size="large">
            RECHERCHER MAINTENANT
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default MainHome;
