import React, { useState } from "react";
import {
  Icon,
  Table,
  Button,
  Checkbox,
} from "semantic-ui-react";
import UserModal from "../modal/UserModal";
import LoaderCss from "../loader/LoaderCss";
import { useAuth } from "../../context/auth";
import axios from "axios";

const UserItems = ({items, loading}) => {
  
    const { authTokens } = useAuth();

    const[deleteList,setDeleteList] = useState([]);

    const [action,setAction] = useState('');
    const [toggle,setToggle] = useState(false);

    const startItem = {
        nom:'',
        prenom:'',
        email:'',
        password:'',
        repassword:'',
        cin:'',
        dateNaissance:'',
        adresse:'',
        telephone:'',
        ville:'',
        pays:'',
        postal:'',
        role:''
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
            url: 'http://127.0.0.1:8000/api/users',
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
        return (
          <div style={{margin:'0 auto'}}>
            <LoaderCss />
          </div>
        );
    }

    return (
        <Table compact celled definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Registration Date</Table.HeaderCell>
              <Table.HeaderCell>E-mail address</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          
          
              <Table.Body>
              {
                items.map((item,key)=>(
                  <Table.Row>
                <Table.Cell collapsing>
                  <Checkbox toggle value={item.id}  onClick={checkHandle}/>
                </Table.Cell>
                <Table.Cell>{item.nom+' '+item.prenom}</Table.Cell>
                <Table.Cell>{item.created_at}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell>{item.role}</Table.Cell>
                <Table.Cell>
                  <Button icon value={key} color="green" size="small" datakey='view' onClick={clickHandle}>
                    <Icon name="eye" /> 
                  </Button>
  
                  <Button icon value={key} color="orange" size="small" datakey='edit' onClick={clickHandle}>
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
              <Table.HeaderCell colSpan="4">
                <Button
                  floated="right"
                  icon
                  labelPosition="left"
                  primary
                  size="small"
                  datakey='add'
                  onClick={clickHandle}
                >
                  <Icon name="add" /> Nouveau utilisateur
                </Button>
                <Button icon labelPosition="left" color="red" size="small" onClick={deleteHandle}>
                  <Icon name="trash" /> Supprimer
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
          <UserModal action={action} toggle={toggle} setToggle={setToggle} item={item}/>
        </Table>
    )
}

export default UserItems
