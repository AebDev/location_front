import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { useAuth } from "../../context/auth";
import axios from "axios";


function Login(props) {

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens,authTokens,setAuthUsers,authUsers,setAuthRole,authRole } = useAuth();
  const [referer,setReferer] = useState("admin/dashboard");

  useEffect(() => {

    if(props.location.state){
      setReferer(props.location.state.referer);
    }
    
  }, []);
  
  
  function postLogin() {

    axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password
      })
      .then((result) => {
        if (result.status === 200) {
          setAuthTokens(result.data.token);
          setAuthRole(result.data.role);
          setLoggedIn(true);
        } else {
          setIsError(true);
        }
      })
      .catch((e) => {
        setIsError(true);
      });
  }
  if(authTokens){
    return <Redirect to={referer} />;
  }
  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Log-in to your account
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button color="teal" fluid size="large" onClick={postLogin}>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <Link to="/register">Sign Up</Link>
        </Message>
        {isError && (
          <Message error>The username or password provided were incorrect!</Message>
        )}
      </Grid.Column>
    </Grid>
  );
}

export default Login;
