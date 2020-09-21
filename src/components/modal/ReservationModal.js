import React, { useState, useEffect } from "react";
import { Button, Grid, Form, Modal, Header, Icon, Dropdown, Image} from "semantic-ui-react";
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

  const [listVehicule, setListVehicule] = useState([]);
  const [listUser, setListUser] = useState([]);

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

      let list = []; 

      props.listVehicule.map((item,key)=>(
        list.push({
          key : key,
          text : item.matricule,
          value : item.id
        })
      ));

      setListVehicule(list);

      list = [];

      props.listUser.map((item,key)=>(
        list.push({
          key : key,
          text : item.email,
          value : item.id
        })
      ));

      setListUser(list);

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
    let msg;

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
        'compagnie_aerienne' : compagnie,
        'etat' : 'test'
    }


    if(props.action === 'add'){

        url = "http://127.0.0.1:8000/api/location";
        methode='POST';
        msg = "l' ajoute est réussie";

    }else{

        url = "http://127.0.0.1:8000/api/location/"+id;
        methode='PUT';
        msg = 'la modification est réussie';
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
        props.refreshHandle(props.action,res.data);
        props.notif(msg,'success');
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
        <Icon name='opencart' />
          {props.action == "view" ? 'Afficher reservation' : ''}
          {props.action == "edit" ? 'Modifier reservation' : ''}
          {props.action == "add" ? 'Nouveau reservation' : ''}
      </Modal.Header>
      <Modal.Content image>

        <Grid width={16} columns={2} doubling stackable>
        {props.action == "view" ? (
            <Grid.Column width={16}>
              <Image src={`http://localhost:8000${props.item.vehicules.image}`} style={{margin: 'auto'}} size='medium'/>
            </Grid.Column>
          ):''}
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
          <Dropdown
            fluid
            placeholder='user' 
            value={user} 
            selection 
            required
            style={{ opacity: "1" }}
            disabled={disable}
            options={listUser} 
            onChange={(e,selected) => {
              setUser(selected.value);
            }}/>
            
          </Grid.Column>
          <Grid.Column>
          <Header as="h4" textAlign='left' color="grey">vehicule : </Header>
          <Dropdown
            fluid
            placeholder='vehicule' 
            value={vehicule} 
            selection 
            required
            style={{ opacity: "1" }}
            disabled={disable}
            options={listVehicule} 
            onChange={(e,selected) => {
              setVehicule(selected.value);
            }}/>
            
          </Grid.Column>

          <Grid.Column>
          <Header as="h4" textAlign='left' color="grey">date_debut </Header>
            <DateInput
              name="date_debut"
              dateFormat="YYYY-MM-DD"
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
              dateFormat="YYYY-MM-DD"
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
          <Dropdown
            fluid
            placeholder="gps"
            value={gps} 
            selection 
            required
            style={{ opacity: "1" }}
            disabled={disable}
            options={[{key:0,text:'sans',value:'0'},{key:1,text:'avec',value:'1'}]} 
            onChange={(e,selected) => {
              setGps(selected.value);
            }}/>
            
          </Grid.Column>
          
          <Grid.Column>
          <Header as="h4" textAlign='left' color="grey">wifi : </Header>
          <Dropdown
            fluid
            placeholder="wifi"
            value={wifi} 
            selection 
            required
            style={{ opacity: "1" }}
            disabled={disable}
            options={[{key:0,text:'sans',value:'0'},{key:1,text:'avec',value:'1'}]} 
            onChange={(e,selected) => {
              setWifi(selected.value);
            }}/>
            
          </Grid.Column>
          <Grid.Column>
          <Header as="h4" textAlign='left' color="grey">enfant : </Header>
          <Dropdown
            fluid
            placeholder="enfant"
            value={enfant} 
            selection 
            required
            style={{ opacity: "1" }}
            disabled={disable}
            options={[{key:0,text:'sans',value:'0'},{key:1,text:'avec',value:'1'}]} 
            onChange={(e,selected) => {
              setEnfant(selected.value);
            }}/>
            
          </Grid.Column>
          <Grid.Column>
          <Header as="h4" textAlign='left' color="grey">bebe : </Header>
          <Dropdown
            fluid
            placeholder="bebe"
            value={bebe} 
            selection 
            required
            style={{ opacity: "1" }}
            disabled={disable}
            options={[{key:0,text:'sans',value:'0'},{key:1,text:'avec',value:'1'}]} 
            onChange={(e,selected) => {
              setBebe(selected.value);
            }}/>
            
          </Grid.Column>
          <Grid.Column>
          <Header as="h4" textAlign='left' color="grey">protection : </Header>
          <Dropdown
            fluid
            placeholder="protection"
            value={protection} 
            selection 
            required
            style={{ opacity: "1" }}
            disabled={disable}
            options={[{key:0,text:'Base',value:'1'},{key:1,text:'Standard',value:'2'},{key:2,text:'Premium',value:'3'}]} 
            onChange={(e,selected) => {
              setProtection(selected.value);
            }}/>
            
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
