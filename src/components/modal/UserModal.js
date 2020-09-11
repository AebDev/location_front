import React, { useState, useEffect } from "react";
import { Button, Grid, Form, Modal, Header, Icon} from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import { useAuth } from "../../context/auth";
import axios from "axios";

function UserModal(props) {

  const { authTokens } = useAuth();

  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState("");
  // const [item, setItem] = useState(props.item);

  const [id, setId] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [cin, setCin] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [adresse, setAdresse] = useState("");
  const [telephone, setTelephone] = useState("");
  const [ville, setVille] = useState("");
  const [pays, setPays] = useState("");
  const [postal, setPostal] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (open !== props.toggle) {
      setOpen(props.toggle);
      props.action == "view" ? setDisable("disabled") : setDisable("");
      console.log(props);

      setId(props.item.id);
      setNom(props.item.nom);
      setPrenom(props.item.prenom);
      setEmail(props.item.email);
      setCin(props.item.cin_passport);
      setDateNaissance(props.item.date_naissance);
      setAdresse(props.item.adresse);
      setTelephone(props.item.telephone);
      setVille(props.item.ville);
      setPays(props.item.pays);
      setPostal(props.item.code_postal);
      setRole(props.item.role);
    }
  }, [props.toggle]);

  const onChangeDate = (event, data) => setDateNaissance(data.value);

  const closeModal = () => {
    setOpen(false);
    props.setToggle(false);
  };

  const postData = () => {
    let url;
    let methode;

    const data = {
        'nom' : nom,
        'prenom' : prenom,
        'role' : role,
        'cin_passport' : cin,
        'date_naissance' : dateNaissance,
        'adresse' : adresse,
        'ville' : ville,
        'pays' : pays,
        'code_postal' : postal,
        'email' : email,
        'telephone' : telephone
    }


    if(props.action === 'add'){

        data.password = password;
        data.repassword = repassword;
        url = "http://127.0.0.1:8000/api/users";
        methode='POST';

    }else{

        url = "http://127.0.0.1:8000/api/users/"+id;
        methode='PUT';
    }

    console.log(data);

    axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens}`,
      },
      method: methode,
      url: url,
      data: data,
    })
      .then((res) => {
        console.log(res.data);

        alert('done');
        closeModal();

      })
      .catch((err) => {
        console.log(err);
      });


    // axios.post(url, data)
    //   .then((result) => {
    //     if (result.status === 200) {
    //       console.log(result.data);
    //     } else {
    //       //   setIsError(true);
    //       console.log(result);
    //     }
    //   })
    //   .catch((e) => {
    //     // setIsError(true);
    //     console.log(e);
    //   });
  };
  return (
    <Modal
      onClose={() => closeModal()}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>
        <Icon name='user' />
          {props.action == "view" ? 'Afficher utilisateur' : ''}
          {props.action == "edit" ? 'Modifier utilisateur' : ''}
          {props.action == "add" ? 'Nouveau utilisateur' : ''}
      </Modal.Header>
      <Modal.Content image>
        <Grid width={16} columns={2} doubling stackable>
          <Grid.Column>
          <Header as="h4" textAlign='left' color="grey">Nom : </Header>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Nom"
              name="nom"
              required
              style={{ opacity: "1" }}
              disabled={disable}
              value={nom}
              onChange={(e) => {
                setNom(e.target.value);
              }}
            />
          </Grid.Column>
          <Grid.Column>
          <Header as="h4" textAlign='left' color="grey">Prenom : </Header>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Prenom"
              name="prenom"
              required
              style={{ opacity: "1" }}
              disabled={disable}
              value={prenom}
              onChange={(e) => {
                setPrenom(e.target.value);
              }}
            />
          </Grid.Column>
          <Grid.Column>
          <Header as="h4" textAlign='left' color="grey">Email : </Header>
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="Email"
              name="email"
              required
              style={{ opacity: "1" }}
              disabled={disable}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Grid.Column>
          <Grid.Column>
          <Header as="h4" textAlign='left' color="grey">Role : </Header>
            <Form.Input
              fluid
              icon="question"
              iconPosition="left"
              placeholder="Role"
              name="role"
              style={{ opacity: "1" }}
              disabled={disable}
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
              }}
            />
          </Grid.Column>
          {props.action === "add" ? (
            <Grid.Column>
                <Header as="h4" textAlign='left' color="grey">Password : </Header>
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
          ) : (
            ""
          )}

          {props.action === "add" ? (
            <Grid.Column>
                <Header as="h4" textAlign='left' color="grey">Re-Password : </Header>
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
          ) : (
            ""
          )}
          <Grid.Column>
          <Header as="h4" textAlign='left' color="grey">Cin ou Passport : </Header>
            <Form.Input
              fluid
              icon="info"
              iconPosition="left"
              placeholder="Cin ou Passport"
              name="cin"
              required
              style={{ opacity: "1" }}
              disabled={disable}
              value={cin}
              onChange={(e) => {
                setCin(e.target.value);
              }}
            />
          </Grid.Column>
          <Grid.Column>
          <Header as="h4" textAlign='left' color="grey">Date de naissance : </Header>
            <DateInput
              name="dateNaissance"
              dateFormat="DD-MM-YYYY"
              minDate=""
              placeholder="Date de naissance"
              iconPosition="left"
              style={{ opacity: "1" }}
              disabled={disable}
              value={dateNaissance}
              onChange={onChangeDate}
            />
          </Grid.Column>
          <Grid.Column>
          <Header as="h4" textAlign='left' color="grey">Adresse : </Header>
            <Form.Input
              fluid
              icon="home"
              iconPosition="left"
              placeholder="Adresse"
              name="adresse"
              style={{ opacity: "1" }}
              disabled={disable}
              value={adresse}
              onChange={(e) => {
                setAdresse(e.target.value);
              }}
            />
          </Grid.Column>
          <Grid.Column>
          <Header as="h4" textAlign='left' color="grey">Telephone : </Header>
            <Form.Input
              fluid
              icon="phone"
              iconPosition="left"
              placeholder="Telephone"
              name="telephone"
              required
              style={{ opacity: "1" }}
              disabled={disable}
              value={telephone}
              onChange={(e) => {
                setTelephone(e.target.value);
              }}
            />
          </Grid.Column>
          <Grid.Column>
          <Header as="h4" textAlign='left' color="grey">Ville : </Header>
            <Form.Input
              fluid
              icon="map"
              iconPosition="left"
              placeholder="Ville"
              name="ville"
              style={{ opacity: "1" }}
              disabled={disable}
              value={ville}
              onChange={(e) => {
                setVille(e.target.value);
              }}
            />
          </Grid.Column>
          <Grid.Column>
          <Header as="h4" textAlign='left' color="grey">Pays : </Header>
            <Form.Input
              fluid
              icon="map"
              iconPosition="left"
              placeholder="Pays"
              name="pays"
              style={{ opacity: "1" }}
              disabled={disable}
              value={pays}
              onChange={(e) => {
                setPays(e.target.value);
              }}
            />
          </Grid.Column>
          <Grid.Column>
          <Header as="h4" textAlign='left' color="grey">Postal : </Header>
            <Form.Input
              fluid
              icon="zip"
              iconPosition="left"
              placeholder="Postal"
              name="postal"
              style={{ opacity: "1" }}
              disabled={disable}
              value={postal}
              onChange={(e) => {
                setPostal(e.target.value);
              }}
            />
          </Grid.Column>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => closeModal()}>
          Close
        </Button>
        {props.action == "edit" ? (
          <Button onClick={() => postData()} color="orange">
            valider modification
          </Button>
        ) : (
          ""
        )}
        {props.action == "add" ? (
          <Button onClick={() => postData()} color="blue">
            ajouter
          </Button>
        ) : (
          ""
        )}
      </Modal.Actions>
    </Modal>
  );
}

export default UserModal;
