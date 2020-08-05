import React, { useState, useContext, useEffect } from 'react'
import { Grid, Header, Container, Icon, Form, Button, Segment } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react';
import axios from 'axios';
import { useAuth } from "../../context/auth";


function Profile() {

    const {authUsers, setAuthUsers, authTokens} = useAuth();

    const [inputType,setInputType] = useState('password');
    const [passwordIcon,setPasswordIcon] = useState('eye');
    const [password,setPassword] = useState('');

    const [nom,setNom] = useState(authUsers.nom);
    const [prenom,setPrenom] = useState(authUsers.prenom);
    const [email,setEmail] = useState(authUsers.email);
    const [cin,setCin] = useState(authUsers.cin_passport);
    const [dateNaissance,setDateNaissance] = useState(authUsers.date_naissance);
    const [adresse,setAdresse] = useState(authUsers.adresse);
    const [telephone,setTelephone] = useState('0694575394');
    const [ville,setVille] = useState(authUsers.ville);
    const [pays,setPays] = useState(authUsers.pays);
    const [postal,setPostal] = useState(authUsers.code_postal);


    const onChangeNom = (event, data) => setNom(data.value);
    const onChangePrenom = (event, data) => setPrenom(data.value);
    const onChangeEmail = (event, data) => setEmail(data.value);
    const onChangeCin = (event, data) => setCin(data.value);
    const onChangeDate = (event, data) => setDateNaissance(data.value);
    const onChangeAdresse = (event, data) => setAdresse(data.value);
    const onChangeTelephone = (event, data) => setTelephone(data.value);
    const onChangeVille = (event, data) => setVille(data.value);
    const onChangePays = (event, data) => setPays(data.value);
    const onChangePostal = (event, data) => setPostal(data.value);

    const updateUser = () =>{
        const data = {
            'nom' : nom,
            'prenom' : prenom,
            'cin_passport' : cin,
            'date_naissance' : dateNaissance,
            'adresse' : adresse,
            'ville' : ville,
            'pays' : pays,
            'code_postal' : postal,
            'email' : email,
        }

        axios({
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens}`
              },
            method: 'PUT',
            url: 'http://127.0.0.1:8000/api/user',
            data: data
          }).then((res) => {
            console.log(res.data.user);
            setAuthUsers(res.data.user);
          }).catch((err) => {
            console.log(err);
          });

    }

    const test = () =>{
        if(inputType === 'password'){
            setInputType('text');
            setPasswordIcon('eye slash');
        }
        else{
            setInputType('password');
            setPasswordIcon('eye');
        }
    }

    return (
        <Grid textAlign="center" style={{ margin: '0rem', height: "100vh", backgroundSize: 'cover', BackgroundPosition: 'center' }} verticalAlign="middle">
            <Grid.Column  >
                <Container style={{ height: "80vh", marginTop: "10vh" }}>
                    <Header as='h2' textAlign="center">
                        <Icon name='settings' color='teal' />
                        <Header.Content >
                            Profile settings

                        </Header.Content>

                    </Header>
                    <Form size="large" >
                        <Segment stacked style={{ padding: '2rem' }}>

                            <Grid width={16} columns={2} doubling stackable>
                                <Grid.Column>
                                    <Header as="h4" textAlign='left' color="grey">Nom : </Header>
                                    <Form.Input
                                        fluid
                                        icon="user"
                                        iconPosition="left"
                                        placeholder="Nom"
                                        name='nom'
                                        value={nom}
                                        onChange={onChangeNom}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Header as="h4" textAlign='left' color="grey">Prenom : </Header>
                                    <Form.Input
                                        fluid
                                        icon="user"
                                        iconPosition="left"
                                        placeholder="Prenom"
                                        name='prenom'
                                        value={prenom}
                                        onChange={onChangePrenom}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Header as="h4" textAlign='left' color="grey">Email : </Header>
                                    <Form.Input
                                        fluid
                                        icon="mail"
                                        iconPosition="left"
                                        placeholder="email"
                                        name='email'
                                        value={email}
                                        onChange={onChangeEmail}
                                    />
                                </Grid.Column>
                                {/* <Grid.Column>
                                    <Header as="h4" textAlign='left' color="grey">Password : </Header>
                                    <Form.Input
                                        fluid
                                        icon="user secret"
                                        iconPosition="left"
                                        placeholder="changer password"
                                        name='password'
                                        value={password}
                                        type={inputType}
                                        action={{ icon: passwordIcon, onClick: test}}
                                        onChange=''
                                    />
                                    


                                </Grid.Column> */}
                                <Grid.Column>
                                    <Header as="h4" textAlign='left' color="grey">Cin ou passport : </Header>
                                    <Form.Input
                                        fluid
                                        icon="info"
                                        iconPosition="left"
                                        placeholder="cin"
                                        name='cin'
                                        value={cin}
                                        onChange={onChangeCin}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Header as="h4" textAlign='left' color="grey">Date de naissance : </Header>
                                    <DateInput
                                        name="dateNaissance"
                                        dateFormat='DD-MM-YYYY'
                                        minDate=''
                                        placeholder="Date de naissance"
                                        value={dateNaissance}
                                        iconPosition="left"
                                        onChange={onChangeDate}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Header as="h4" textAlign='left' color="grey">Adresse : </Header>
                                    <Form.Input
                                        fluid
                                        icon="home"
                                        iconPosition="left"
                                        placeholder="adresse"
                                        name='adresse'
                                        value={adresse}
                                        onChange={onChangeAdresse}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Header as="h4" textAlign='left' color="grey">Telephone : </Header>
                                    <Form.Input
                                        fluid
                                        icon="phone"
                                        iconPosition="left"
                                        placeholder="telephone"
                                        name='telephone'
                                        value={telephone}
                                        onChange={onChangeTelephone}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Header as="h4" textAlign='left' color="grey">Ville : </Header>
                                    <Form.Input
                                        fluid
                                        icon="map"
                                        iconPosition="left"
                                        placeholder="ville"
                                        name='ville'
                                        value={ville}
                                        onChange={onChangeVille}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Header as="h4" textAlign='left' color="grey">Pays : </Header>
                                    <Form.Input
                                        fluid
                                        icon="map"
                                        iconPosition="left"
                                        placeholder="pays"
                                        name='pays'
                                        value={pays}
                                        onChange={onChangePays}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Header as="h4" textAlign='left' color="grey">Code postal : </Header>
                                    <Form.Input
                                        fluid
                                        icon="zip"
                                        iconPosition="left"
                                        placeholder="postal"
                                        name='postal'
                                        value={postal}
                                        onChange={onChangePostal}
                                    />
                                </Grid.Column>
                            </Grid>




                            <Button 
                                color="teal" 
                                size="large" 
                                style={{ marginTop: '2rem' }}
                                onClick={updateUser}>
                                Enregistrer les modifications
                            </Button>
                        </Segment>
                    </Form>
                </Container>
            </Grid.Column>
        </Grid>
    )
}

export default Profile
