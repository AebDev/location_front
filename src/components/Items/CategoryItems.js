import React, { useState, useEffect } from "react";
import {
  Icon,
  Table,
  Button,
  Checkbox,
} from "semantic-ui-react";

import CategoryModal from "../modal/CategoryModal";
import { useAuth } from "../../context/auth";
import axios from "axios";

const CategoryItems = ({items, loading}) => {

  const { authTokens } = useAuth();
  const[deleteList,setDeleteList] = useState([]);

    const [action,setAction] = useState('');
    const [toggle,setToggle] = useState(false);

    const startItem = {
        nom_categorie:'',
        age_min:'',
        annee_permis_min:'',
        
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
          
          alert('sir tl3ab');
        }
        else{

          axios({
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authTokens}`,
            },
            method: 'DELETE',
            url: 'http://127.0.0.1:8000/api/categories',
            data: {'deleteList' : deleteList},
          })
            .then((res) => {
              console.log(res.data);
      
              alert('done');
      
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }

      if(loading){
        return 'loading '
    }

    return (
        <Table compact celled definition>
          <Table.Header >
            <Table.Row >
              <Table.HeaderCell  />
              <Table.HeaderCell>Nom Categorie</Table.HeaderCell>
              <Table.HeaderCell>Age Min</Table.HeaderCell>
              <Table.HeaderCell>Annee Permis Min</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              items.map((item,key)=>(
                
                <Table.Row>
              <Table.Cell collapsing>
                <Checkbox value={item.id} toggle  onClick={checkHandle}/>
              </Table.Cell>
              <Table.Cell>{item.nom_categorie}</Table.Cell>
              <Table.Cell>{item.age_min}</Table.Cell>
              <Table.Cell>{item.annee_permis_min}</Table.Cell>
              <Table.Cell>
                <Button icon value={key} datakey='view'  color="green" size="small" onClick={clickHandle}>
                  <Icon name="eye" />
                </Button>

                <Button icon value={key} datakey='edit' color="orange" size="small" onClick={clickHandle}>
                  <Icon name="edit" />
                </Button>
              </Table.Cell>
            </Table.Row>

                ))
            }
            
           
          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan="3">
                <Button
                  floated="right"
                  icon
                  labelPosition="left"
                  datakey='add'
                  primary
                  size="small"
                  onClick={clickHandle}
                >
                  <Icon name="add" /> Nouvelle categorie
                </Button>
                <Button icon labelPosition="left" color="red" size="small" onClick={deleteHandle}>
                  <Icon name="trash" /> Supprimer
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
          <CategoryModal action={action} toggle={toggle} setToggle={setToggle} item={item}/>
        </Table>
    )
}

export default CategoryItems
