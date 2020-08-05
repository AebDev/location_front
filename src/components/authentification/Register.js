import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

class Register extends Component {
    render() {
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
              Create your account
              </Header>
              <Form size='large' >
                <Segment stacked>
                  <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Re-Password'
                    type='password'
                  />
                  <Button color='teal' fluid size='large'>
                  Register
                  </Button>
                </Segment>
              </Form>
              <Message>
                New to us? <Link to='/login'>Log In</Link>
              </Message>
            </Grid.Column>
          </Grid>
        );
    }
}

export default Register;
