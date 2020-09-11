import React, { useState, useEffect } from "react";
import { Button, Grid, Form, Modal, Header, Icon} from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import { useAuth } from "../../context/auth";
import axios from "axios";

function ReservationModal(props) {
    const { authTokens } = useAuth();

  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState("");
  // const [item, setItem] = useState(props.item);

  const [id, setId] = useState("");
  const [user, setUser] = useState("");
  const [vehicule, setVehicule] = useState("");
  const [date_debut, setDatedebut] = useState("");
  const [date_fin, setDatefin] = useState("");
  const [montant, setMontant] = useState("");

  const [gps, setGps] = useState("");
  const [wifi, setWifi] = useState("");
  const [enfant, setEnfant] = useState("");
  const [bebe, setBebe] = useState("");
  const [protection, setProtection] = useState("");
  const [vol, setVol] = useState("");
  const [compagnie, setCompagnie] = useState("");


  useEffect(() => {
    if (open !== props.toggle) {
      setOpen(props.toggle);
      props.action == "view" ? setDisable("disabled") : setDisable("");
      console.log(props);

      setId(props.item.id);
      setUser(props.item.user_id);
      setVehicule(props.item.vehicule_id);
      setDatedebut(props.item.date_debut);
      setDatefin(props.item.date_fin);
      setMontant(props.item.montant);

      setGps(props.item.option_gps);
      setWifi(props.item.option_wifi);
      setEnfant(props.item.option_Rehausseur_enfant);
      setBebe(props.item.option_Rehausseur_bebe);
      setProtection(props.item.type_de_protection);
      setVol(props.item.num_de_vol);
      setCompagnie(props.item.compagnie_aerienne);
    }
  }, [props.toggle]);

  const onChangeDateDebut = (event, data) => setDatedebut(data.value);
  const onChangeDateFin = (event, data) => setDatefin(data.value);

  const closeModal = () => {
    setOpen(false);
    props.setToggle(false);
  };

  const postData = () => {
    let url;
    let methode;

    const data = {
        'user_id' : user,
        'vehicule_id' : vehicule,
        'date_debut' : date_debut,
        'date_fin' : date_fin,
        'montant' : montant,
        'option_gps' : gps,
        'option_wifi' : wifi,
        'option_Rehausseur_enfant' : enfant,
        'option_Rehausseur_bebe' : bebe,
        'type_de_protection' : protection,
        'num_de_vol' : vol,
        'compagnie_aerienne' : compagnie
    }


    if(props.action === 'add'){

        url = "http://127.0.0.1:8000/api/location";
        methode='POST';

    }else{

        url = "http://127.0.0.1:8000/api/location/"+id;
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

  };
  return (
    <Modal
      onClose={() => closeModal()}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>
        <Icon name='user' />
          {props.action == "view" ? 'Afficher reservation' : ''}
          {props.action == "edit" ? 'Modifier reservation' : ''}
          {props.action == "add" ? 'Nouveau reservation' : ''}
      </Modal.Header>
      <Modal.Content image>
        <Grid width={16} columns={2} doubling stackable>
        {props.action == "add" ? '' :(
          <Grid.Column>
          <Header as="h4" textAlign='left' color="grey">numero de commande : </Header>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="id"
              name="id"
              required
              style={{ opacity: "1" }}
              disabled
              value={id}
            />
          </Grid.Column>
        )}
          <Grid.Column>
          <Header as="h4" textAlign='left' color="grey">user : </Header>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="user"
              name="user"
              required
              style={{ opacity: "1" }}
              disabled={disable}
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
              }}
            />
          </Grid.Column>
          <Grid.Column>
          <Header as="h4" textAlign='left' color="grey">vehicule : </Header>
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="vehicule"
              name="vehicule"
              required
              style={{ opacity: "1" }}
              disabled={disable}
              value={vehicule}
              onChange={(e) => {
                setVehicule(e.target.value);
              }}
            />
          </Grid.Column>

          <Grid.Column>
          <Header as="h4" textAlign='left' color="grey">date_debut </Header>
            <DateInput
              name="date_debut"
              dateFormat="DD-MM-YYYY"
              minDate=""
              placeholder="date_debut"
              iconPosition="left"
              style={{ opacity: "1" }}
              disabled={disable}
              value={date_debut}
              onChange={onChangeDateDebut}
            />
          </Grid.Column>

          <Grid.Column>
          <Header as="h4" textAlign='left' color="grey">date_fin</Header>
            <DateInput
              name="date_fin"
              dateFormat="DD-MM-YYYY"
              minDate=""
              placeholder="date_fin"
              iconPosition="left"
              style={{ opacity: "1" }}
              disabled={disable}
              value={date_fin}
              onChange={onChangeDateFin}
            />
          </Grid.Column>


          <Grid.Column>
          <Header as="h4" textAlign='left' color="grey">montant</Header>
            <Form.Input
              fluid
              icon="question"
              iconPosition="left"
              placeholder="montant"
              name="montant"
              style={{ opacity: "1" }}
              disabled={disable}
              value={montant}
              onChange={(e) => {
                setMontant(e.target.value);
              }}
            />
          </Grid.Column>
          
          <Grid.Column>
          <Header as="h4" textAlign='left' color="grey">gps : </Header>
            <Form.Input
              fluid
              icon="info"
              iconPosition="left"
              placeholder="gps"
              name="gps"
              required
              style={{ opacity: "1" }}
              disabled={disable}
              value={gps}
              onChange={(e) => {
                setGps(e.target.value);
              }}
            />
          </Grid.Column>
          
          <Grid.Column>
          <Header as="h4" textAlign='left' color="grey">wifi : </Header>
            <Form.Input
              fluid
              icon="home"
              iconPosition="left"
              placeholder="wifi"
              name="wifi"
              style={{ opacity: "1" }}
              disabled={disable}
              value={wifi}
              onChange={(e) => {
                setWifi(e.target.value);
              }}
            />
          </Grid.Column>
          <Grid.Column>
          <Header as="h4" textAlign='left' color="grey">enfant : </Header>
            <Form.Input
              fluid
              icon="phone"
              iconPosition="left"
              placeholder="enfant"
              name="enfant"
              required
              style={{ opacity: "1" }}
              disabled={disable}
              value={enfant}
              onChange={(e) => {
                setEnfant(e.target.value);
              }}
            />
          </Grid.Column>
          <Grid.Column>
          <Header as="h4" textAlign='left' color="grey">bebe : </Header>
            <Form.Input
              fluid
              icon="map"
              iconPosition="left"
              placeholder="bebe"
              name="bebe"
              style={{ opacity: "1" }}
              disabled={disable}
              value={bebe}
              onChange={(e) => {
                setBebe(e.target.value);
              }}
            />
          </Grid.Column>
          <Grid.Column>
          <Header as="h4" textAlign='left' color="grey">protection : </Header>
            <Form.Input
              fluid
              icon="map"
              iconPosition="left"
              placeholder="protection"
              name="protection"
              style={{ opacity: "1" }}
              disabled={disable}
              value={protection}
              onChange={(e) => {
                setProtection(e.target.value);
              }}
            />
          </Grid.Column>
          <Grid.Column>
          <Header as="h4" textAlign='left' color="grey">vol : </Header>
            <Form.Input
              fluid
              icon="zip"
              iconPosition="left"
              placeholder="vol"
              name="vol"
              style={{ opacity: "1" }}
              disabled={disable}
              value={vol}
              onChange={(e) => {
                setVol(e.target.value);
              }}
            />
          </Grid.Column>
          <Grid.Column>
          <Header as="h4" textAlign='left' color="grey">compagnie : </Header>
            <Form.Input
              fluid
              icon="zip"
              iconPosition="left"
              placeholder="compagnie"
              name="compagnie"
              style={{ opacity: "1" }}
              disabled={disable}
              value={compagnie}
              onChange={(e) => {
                setCompagnie(e.target.value);
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

export default ReservationModal
