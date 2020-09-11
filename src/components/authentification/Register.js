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
import { DateInput } from "semantic-ui-calendar-react";
import { useAuth } from "../../context/auth";
import axios from 'axios';

function Register(props) {
  

  const { setAuthTokens,authTokens,setAuthUsers,authUsers,setAuthRole,authRole } = useAuth();

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [referer,setReferer] = useState("admin/home");

  const [nom,setNom] = useState();
  const [prenom,setPrenom] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [repassword,setRepassword] = useState();
  const [cin,setCin] = useState();
  const [dateNaissance,setDateNaissance] = useState();
  const [adresse,setAdresse] = useState('');
  const [telephone,setTelephone] = useState();
  const [ville,setVille] = useState('');
  const [pays,setPays] = useState('');
  const [postal,setPostal] = useState('');

  useEffect(() => {

    if(props.location.state){
      setReferer(props.location.state.referer);
    }
    
  }, []);

  const onChangeDate = (event, data) => setDateNaissance(data.value);

  function postRegister() {
    

      const role = 'user';

    // axios({
      
    //   method: "POST",
    //   url: "http://127.0.0.1:8000/api/test",
    //   data: data,
    // })
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    axios.post("http://127.0.0.1:8000/api/register", {
        nom,
        prenom,
        email,
        password,
        repassword,
        cin,
        dateNaissance,
        adresse,
        telephone,
        ville,
        pays,
        postal,
        role
      })
      .then((result) => {
        if (result.status === 200) {

          console.log(result.data);
          
          setAuthTokens(result.data.token);
          setAuthRole(result.data.role);
          setAuthUsers(result.data.user);
          setLoggedIn(true);
        } else {
          setIsError(true);
          console.log(result);
        }
      })
      .catch((e) => {
        setIsError(true);
        console.log(e);
      });
  }

  if(authTokens){
    return <Redirect to={referer} />;
  }
  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }

    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh",marginTop:'4rem' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 700 }}>
          <Header as="h2" color="teal" textAlign="center">
            Create your account
          </Header>
          <Form size="large">
            <Segment stacked>
              <Grid width={16} columns={2} doubling stackable>
                <Grid.Column>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Nom"
                    name="nom"
                    required
                    value={nom}
                    onChange={(e) => {
                      setNom(e.target.value);
                    }}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Prenom"
                    name="prenom"
                    required
                    value={prenom}
                    onChange={(e) => {
                      setPrenom(e.target.value);
                    }}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    fluid
                    icon="mail"
                    iconPosition="left"
                    placeholder="Email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    name="password"
                    required
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Re-Password"
                    name="repassword"
                    required
                    type="password"
                    value={repassword}
                    onChange={(e) => {
                      setRepassword(e.target.value);
                    }}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    fluid
                    icon="info"
                    iconPosition="left"
                    placeholder="Cin ou Passport"
                    name="cin"
                    required
                    value={cin}
                    onChange={(e) => {
                      setCin(e.target.value);
                    }}
                  />
                </Grid.Column>
                <Grid.Column>
                  <DateInput
                    name="dateNaissance"
                    dateFormat="DD-MM-YYYY"
                    minDate=""
                    placeholder="Date de naissance"
                    iconPosition="left"
                    value={dateNaissance}
                    onChange={onChangeDate}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    fluid
                    icon="home"
                    iconPosition="left"
                    placeholder="Adresse"
                    name="adresse"
                    value={adresse}
                    onChange={(e) => {
                      setAdresse(e.target.value);
                    }}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    fluid
                    icon="phone"
                    iconPosition="left"
                    placeholder="Telephone"
                    name="telephone"
                    required
                    value={telephone}
                    onChange={(e) => {
                      setTelephone(e.target.value);
                    }}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    fluid
                    icon="map"
                    iconPosition="left"
                    placeholder="Ville"
                    name="ville"
                    value={ville}
                    onChange={(e) => {
                      setVille(e.target.value);
                    }}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    fluid
                    icon="map"
                    iconPosition="left"
                    placeholder="Pays"
                    name="pays"
                    value={pays}
                    onChange={(e) => {
                      setPays(e.target.value);
                    }}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    fluid
                    icon="zip"
                    iconPosition="left"
                    placeholder="Postal"
                    name="postal"
                    value={postal}
                    onChange={(e) => {
                      setPostal(e.target.value);
                    }}
                  />
                </Grid.Column>
              </Grid>

              <Button
                color="teal"
                fluid
                size="large"
                style={{ marginTop: "2rem" }}
                onClick={postRegister}
              >
                Register
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <Link to="/login">Log In</Link>
          </Message>
          {isError && (
          <Message error>The data provided were incorrect!</Message>
        )}
        </Grid.Column>
      </Grid>
    );
  }


export default Register;
