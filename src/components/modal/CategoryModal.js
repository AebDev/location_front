import React, { useState, useEffect } from "react";
import { Button, Grid, Form, Modal, Header, Icon} from "semantic-ui-react";
import { useAuth } from "../../context/auth";
import axios from "axios";

function CategoryModal(props) {
    const { authTokens } = useAuth();

    const [open, setOpen] = useState(false);
    const [disable, setDisable] = useState("");
    // const [item, setItem] = useState(props.item);
    const [id, setId] = useState("");
    const [nom_categorie, setNom] = useState("");
    const [age_min, setAge] = useState("");
    const [annee_permis_min, setAnnee] = useState("");
    
    useEffect(() => {
      if (open !== props.toggle) {
        setOpen(props.toggle);
        props.action == "view" ? setDisable("disabled") : setDisable("");
        console.log(props);
  
        setId(props.item.id);
        setNom(props.item.nom_categorie);
        setNom(props.item.nom_categorie);
        setAge(props.item.age_min);
        setAnnee(props.item.annee_permis_min);
        
      }
    }, [props.toggle]);
  
    const closeModal = () => {
      setOpen(false);
      props.setToggle(false);
    };
  
    const postData = () => {
      let url;
      let methode;
      let msg;
  
      const data = {
          'nom_categorie' : nom_categorie,
          'age_min' : age_min,
          'annee_permis_min' : annee_permis_min,
      }
  
      
      if(props.action === 'add'){
  
          url = "http://127.0.0.1:8000/api/categorie";
          methode='POST';
          msg = "l' ajoute est réussie";
  
      }else{
  
          url = "http://127.0.0.1:8000/api/categorie/"+id;
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
          <Icon name='tag' />
            {props.action == "view" ? 'Afficher categorie' : ''}
            {props.action == "edit" ? 'Modifier categorie' : ''}
            {props.action == "add" ? 'Nouveau categorie' : ''}
        </Modal.Header>
        <Modal.Content image>
          <Grid width={16} columns={1} doubling stackable style={{width:'100%'}}>
            <Grid.Column>
            <Header as="h4" textAlign='left' color="grey">nom_categorie </Header>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Nom"
                name="nom"
                required
                style={{ opacity: "1" }}
                disabled={disable}
                value={nom_categorie}
                onChange={(e) => {
                  setNom(e.target.value);
                }}
              />
            </Grid.Column>
            <Grid.Column>
            <Header as="h4" textAlign='left' color="grey">age_min </Header>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Prenom"
                name="prenom"
                required
                style={{ opacity: "1" }}
                disabled={disable}
                value={age_min}
                onChange={(e) => {
                    setAge(e.target.value);
                }}
              />
            </Grid.Column>
            <Grid.Column>
            <Header as="h4" textAlign='left' color="grey">annee_permis_min </Header>
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="Email"
                name="email"
                required
                style={{ opacity: "1" }}
                disabled={disable}
                value={annee_permis_min}
                onChange={(e) => {
                    setAnnee(e.target.value);
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
            <Button onClick={() => postData()} color="green">
              Enregistrer
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

export default CategoryModal
