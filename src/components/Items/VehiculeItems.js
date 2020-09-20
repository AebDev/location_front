import React, { useState, useEffect } from "react";
import {
  Icon,
  Table,
  Button,
  Checkbox,
  Image,
} from "semantic-ui-react";
import LoaderCss from "../loader/LoaderCss";
import VehiculeModal from "../modal/VehiculeModal";
import { useAuth } from "../../context/auth";
import axios from "axios";

const VehiculeItems = ({items, loading, notif, refreshHandle, listCategory}) => {

  const { authTokens } = useAuth();
  const[deleteList,setDeleteList] = useState([]);

    const [action,setAction] = useState('');
    const [toggle,setToggle] = useState(false);

    const startItem = {
        matricule:'',
        categorie:'',
        marque:'',
        modele:'',
        couleur:'',
        boite_vitesse:'',
        carburant:'',
        cout_par_jour:'',
        franchise:'',
        nb_places:'',
        nb_portes:'',
        climatisation:''
    };
    
      const [item,setItem] = useState(startItem);



      const clickHandle = (event, data) =>{
        console.log(data.datakey)
        setAction(data.datakey);
        setToggle(true);
        data.datakey == 'add' ? setItem(startItem) : setItem(items[data.value]);
      };

      const checkHandle = (event , data) =>{

        if(data.checked){
          const list = deleteList;
          list.push(data.value);
          setDeleteList(list);
          
        }
        else{

          const filteredArray = deleteList.filter(item => item !== data.value)
          setDeleteList(filteredArray);
        }
        console.log(deleteList);
      }

      const deleteHandle = () =>{

        if(deleteList.length === 0){
          
          notif('selectionner les elements à supprimer','error');
        }
        else{

          axios({
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authTokens}`,
            },
            method: 'DELETE',
            url: 'http://127.0.0.1:8000/api/vehicules',
            data: {'deleteList' : deleteList},
          })
            .then((res) => {
              console.log(res.data);
              refreshHandle('delete',deleteList);
              notif('la suppression est réussie','success');
      
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }

      if(loading){
        return (
          <div style={{margin:'0 auto',width:'100%'}}>
            <LoaderCss />
          </div>
        );
    }

    return (
        <Table compact celled definition >
          <Table.Header>
            <Table.Row >
              <Table.HeaderCell />
              <Table.HeaderCell>image</Table.HeaderCell>
              <Table.HeaderCell>matricule</Table.HeaderCell>
              <Table.HeaderCell>categorie</Table.HeaderCell>
              <Table.HeaderCell>marque</Table.HeaderCell>
              <Table.HeaderCell>modele</Table.HeaderCell>
              <Table.HeaderCell>couleur</Table.HeaderCell>
              <Table.HeaderCell>boite_vitesse</Table.HeaderCell>
              <Table.HeaderCell>carburant</Table.HeaderCell>
              <Table.HeaderCell>cout_par_jour</Table.HeaderCell>
              <Table.HeaderCell>franchise</Table.HeaderCell>
              <Table.HeaderCell>nb_places</Table.HeaderCell>
              <Table.HeaderCell>nb_portes</Table.HeaderCell>
              <Table.HeaderCell>climatisation</Table.HeaderCell>
              
              
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {items.map((item,key)=>(
              <Table.Row>
              <Table.Cell collapsing>
                <Checkbox toggle value={item.id}  onClick={checkHandle}/>
              </Table.Cell>
              <Table.Cell><Image src={`http://localhost:8000${item.image}`} size='small'/></Table.Cell>
              <Table.Cell>{item.matricule}</Table.Cell>
              <Table.Cell>{item.categories.nom_categorie}</Table.Cell>
              <Table.Cell>{item.marque}</Table.Cell>
              <Table.Cell>{item.modele}</Table.Cell>
              <Table.Cell>{item.couleur}</Table.Cell>
              <Table.Cell>{item.boite_vitesse}</Table.Cell>
              <Table.Cell>{item.carburant}</Table.Cell>
              <Table.Cell>{item.cout_par_jour}</Table.Cell>
              <Table.Cell>{item.franchise}</Table.Cell>
              <Table.Cell>{item.nb_places}</Table.Cell>
              <Table.Cell>{item.nb_portes}</Table.Cell>
              <Table.Cell>{item.climatisation == 1 ? 'oui' : 'non'}</Table.Cell>
              <Table.Cell>
                <Button icon value={key} color="green" size="small" datakey='view' onClick={clickHandle}>
                  <Icon name="eye" /> 
                </Button>

                <Button icon value={key} color="orange" size="small" datakey='edit' onClick={clickHandle}>
                  <Icon name="edit" /> 
                </Button>
              </Table.Cell>
            </Table.Row>
            ))}
            
          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan="12">
                <Button
                  floated="right"
                  icon
                  labelPosition="left"
                  primary
                  size="small"
                  datakey='add'
                  onClick={clickHandle}
                >
                  <Icon name="add" /> Nouveau véhicule
                </Button>
                <Button icon labelPosition="left" color="red" size="small" onClick={deleteHandle}>
                  <Icon name="trash" /> Supprimer
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
          <VehiculeModal action={action} toggle={toggle} setToggle={setToggle} item={item} listCategory={listCategory} notif={notif} refreshHandle={refreshHandle}/>
        </Table>
    )
}

export default VehiculeItems
