import React, { useState, useEffect } from "react";
import { Button, Grid, Form, Modal, Header, Icon, Dropdown, Image } from "semantic-ui-react";
import { useAuth } from "../../context/auth";
import axios from "axios";

function VehiculeModal(props) {
  const { authTokens } = useAuth();

  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState("");

  const [id, setId] = useState("");
  const [matricule, setMatricule] = useState("");
  const [categorie, setCategorie] = useState("");
  const [marque, setMarque] = useState("");
  const [modele, setModele] = useState("");
  const [image, setImage] = useState();
  const [couleur, setCouleur] = useState("");
  const [boite_vitesse, setBoite] = useState("");
  const [carburant, setCarburant] = useState("");
  const [cout_par_jour, setCost] = useState("");
  const [franchise, setFranchise] = useState("");
  const [nb_places, setNbplaces] = useState("");
  const [nb_portes, setNbportes] = useState("");
  const [climatisation, setClimatisation] = useState("");

  const [listCategory,setListCategory] = useState([]);


  const fileInput = React.createRef();
    const onFileChange = (event) => {
      console.log(event.target.files[0]);
      setImage(event.target.files[0]);
      // setImage(fileInput.current.files[0]);
      // console.log(fileInput.current.files[0]);
    };

  useEffect(() => {
    if (open !== props.toggle) {
      setOpen(props.toggle);
      props.action == "view" ? setDisable("disabled") : setDisable("");
      console.log(props);

      setId(props.item.id);
      setMatricule(props.item.matricule);
      setCategorie(props.item.categorie_id);
      setMarque(props.item.marque);
      setModele(props.item.modele);
      setImage(props.item.image);
      setCouleur(props.item.couleur);
      setBoite(props.item.boite_vitesse);
      setCarburant(props.item.carburant);
      setCost(props.item.cout_par_jour);
      setFranchise(props.item.franchise);
      setNbplaces(props.item.nb_places);
      setNbportes(props.item.nb_portes);
      setClimatisation(props.item.climatisation);

      let list = []; 

      props.listCategory.map((item,key)=>(
        list.push({
          key : key,
          text : item.nom_categorie ,
          value : item.id
        })
      ));

      setListCategory(list);

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

    const formData = new FormData();
    formData.set("matricule", matricule );
    formData.set("categorie_id", categorie );
    formData.set("marque", marque );
    formData.set("modele", modele );
    formData.append("image", image );
    formData.set("couleur", couleur );
    formData.set("boite_vitesse", boite_vitesse );
    formData.set("carburant", carburant );
    formData.set("cout_par_jour", cout_par_jour );
    formData.set("franchise", franchise );
    formData.set("nb_places", nb_places );
    formData.set("nb_portes", nb_portes );
    formData.set("climatisation", climatisation );

    if (props.action === "add") {
      
      url = "http://127.0.0.1:8000/api/vehicule";
      methode = "POST";
      msg = "l' ajoute est réussie";
    } else {
      url = "http://127.0.0.1:8000/api/vehicule/" + id;
      methode = "POST";
      msg = 'la modification est réussie';
    }

    console.log(formData);

    axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens}`,
      },
      method: methode,
      url: url,
      data: formData,
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
  console.log(listCategory);
  return (
    <Modal
      onClose={() => closeModal()}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header >
        <Icon name="car" />
        {props.action == "view" ? "Afficher Vehicule" : ""}
        {props.action == "edit" ? "Modifier Vehicule" : ""}
        {props.action == "add" ? "Nouveau Vehicule" : ""}
      </Modal.Header>
      <Modal.Content image>
        <Grid width={16} columns={2} doubling stackable>
          {props.action == "view" ? (
            <Grid.Column width={16}>
              <Image src={`http://localhost:8000${image}`} style={{margin: 'auto'}} size='large'/>
            </Grid.Column>
          ) : (
            <Grid.Column>
            <Header as="h4" textAlign="left" color="grey">
            image
            </Header>
            <Form.Input
              fluid
              icon="image"
              iconPosition="left"
              name="image"
              ref={fileInput}
              type='file'
              required
              onChange={onFileChange}
            />
          </Grid.Column>
          )}
        
          <Grid.Column>
            <Header as="h4" textAlign="left" color="grey">
            matricule
            </Header>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="matricule"
              name="matricule"
              required
              style={{ opacity: "1" }}
              disabled={disable}
              value={matricule}
              onChange={(e) => {
                setMatricule(e.target.value);
              }}
            />
          </Grid.Column>
          <Grid.Column>
            <Header as="h4" textAlign="left" color="grey">
            categorie
            </Header>
            <Dropdown
            fluid
            placeholder='categorie' 
            value={categorie} 
            selection 
            required
            style={{ opacity: "1" }}
            disabled={disable}
            options={listCategory} 
            onChange={(e,selected) => {
              setCategorie(selected.value);
              console.log(selected.value);
            }}/>

          </Grid.Column>
          <Grid.Column>
            <Header as="h4" textAlign="left" color="grey">
            marque :{" "}
            </Header>
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="marque"
              name="marque"
              required
              style={{ opacity: "1" }}
              disabled={disable}
              value={marque}
              onChange={(e) => {
                setMarque(e.target.value);
              }}
            />
          </Grid.Column>
          <Grid.Column>
            <Header as="h4" textAlign="left" color="grey">
            modele :{" "}
            </Header>
            <Form.Input
              fluid
              icon="question"
              iconPosition="left"
              placeholder="modele"
              name="modele"
              style={{ opacity: "1" }}
              disabled={disable}
              value={modele}
              onChange={(e) => {
                setModele(e.target.value);
              }}
            />
          </Grid.Column>
          
          <Grid.Column>
            <Header as="h4" textAlign="left" color="grey">
            couleur
            </Header>
            <Form.Input
              fluid
              icon="info"
              iconPosition="left"
              placeholder="couleur"
              name="couleur"
              required
              style={{ opacity: "1" }}
              disabled={disable}
              value={couleur}
              onChange={(e) => {
                setCouleur(e.target.value);
              }}
            />
          </Grid.Column>
          <Grid.Column>
            <Header as="h4" textAlign="left" color="grey">
            boite_vitesse
            </Header>
            <Dropdown
            fluid
            placeholder="boite_vitesse"
            value={boite_vitesse} 
            selection 
            required
            style={{ opacity: "1" }}
            disabled={disable}
            options={[{key:0,text:'automatic',value:'auto'},{key:1,text:'manuel',value:'manu'}]} 
            onChange={(e,selected) => {
              setBoite(selected.value);
            }}/>
          </Grid.Column>
          <Grid.Column>
            <Header as="h4" textAlign="left" color="grey">
            carburant
            </Header>
            <Dropdown
            fluid
            placeholder="carburant"
            value={carburant} 
            selection 
            required
            style={{ opacity: "1" }}
            disabled={disable}
            options={[{key:0,text:'diesel',value:'diesel'},{key:1,text:'essence',value:'essence'}]} 
            onChange={(e,selected) => {
              setCarburant(selected.value);
            }}/>
            
          </Grid.Column>
          <Grid.Column>
            <Header as="h4" textAlign="left" color="grey">
            cout_par_jour
            </Header>
            <Form.Input
              fluid
              icon="phone"
              iconPosition="left"
              placeholder="cout_par_jour"
              name="cout_par_jour"
              required
              style={{ opacity: "1" }}
              disabled={disable}
              value={cout_par_jour}
              onChange={(e) => {
                setCost(e.target.value);
              }}
            />
          </Grid.Column>
          <Grid.Column>
            <Header as="h4" textAlign="left" color="grey">
            franchise
            </Header>
            <Form.Input
              fluid
              icon="map"
              iconPosition="left"
              placeholder="franchise"
              name="franchise"
              style={{ opacity: "1" }}
              disabled={disable}
              value={franchise}
              onChange={(e) => {
                setFranchise(e.target.value);
              }}
            />
          </Grid.Column>
          <Grid.Column>
            <Header as="h4" textAlign="left" color="grey">
            nb_places
            </Header>
            <Form.Input
              fluid
              icon="map"
              iconPosition="left"
              placeholder="nb_places"
              name="nb_places"
              style={{ opacity: "1" }}
              disabled={disable}
              value={nb_places}
              onChange={(e) => {
                setNbplaces(e.target.value);
              }}
            />
          </Grid.Column>
          <Grid.Column>
            <Header as="h4" textAlign="left" color="grey">
            nb_portes
            </Header>
            <Form.Input
              fluid
              icon="zip"
              iconPosition="left"
              placeholder="nb_portes"
              name="nb_portes"
              style={{ opacity: "1" }}
              disabled={disable}
              value={nb_portes}
              onChange={(e) => {
                setNbportes(e.target.value);
              }}
            />
          </Grid.Column>
          <Grid.Column>
            <Header as="h4" textAlign="left" color="grey">
            climatisation
            </Header>
            <Dropdown
            fluid
            placeholder="climatisation"
            value={climatisation} 
            selection 
            required
            style={{ opacity: "1" }}
            disabled={disable}
            options={[{key:0,text:'sans',value:'0'},{key:1,text:'avec',value:'1'}]} 
            onChange={(e,selected) => {
              setClimatisation(selected.value);
            }}/>
            
          </Grid.Column>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => closeModal()}>
          Fermer
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
            Ajouter
          </Button>
        ) : (
          ""
        )}
      </Modal.Actions>
    </Modal>
  );
}

export default VehiculeModal;
