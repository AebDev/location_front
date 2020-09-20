import React, { useState } from "react";
import {
  Container,
  Breadcrumb,
  Grid,
  Header,
  Segment,
  Sidebar,
  Icon,
  Table,
  Button,
  Checkbox,
} from "semantic-ui-react";
import LoaderCss from "../loader/LoaderCss";
import ReservationModal from "../modal/ReservationModal";
import { useAuth } from "../../context/auth";
import axios from "axios";

const ReservationItems = ({items, loading, notif}) => {


  const { authTokens } = useAuth();
  const[deleteList,setDeleteList] = useState([]);

    const [action,setAction] = useState('');
    const [toggle,setToggle] = useState(false);

    
    const startItem = {
        id:'',
        user:'',
        vehicule:'',
        date_debut:'',
        date_fin:'',
        montant:''
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
            url: 'http://127.0.0.1:8000/api/reservations',
            data: {'deleteList' : deleteList},
          })
            .then((res) => {
              console.log(res.data);
      
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
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>№</Table.HeaderCell>
          <Table.HeaderCell>user</Table.HeaderCell>
          <Table.HeaderCell>vehicule</Table.HeaderCell>
          <Table.HeaderCell>periode</Table.HeaderCell>
          <Table.HeaderCell>montant payer</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {items.map((item,key)=>(
          <Table.Row>
          <Table.Cell collapsing>
            <Checkbox toggle value={item.id}  onClick={checkHandle}/>
          </Table.Cell>
          <Table.Cell>{item.id}</Table.Cell>
          <Table.Cell>{item.users.email}</Table.Cell>
          <Table.Cell>{item.vehicules.marque}</Table.Cell>
          <Table.Cell>De{item.date_debut} Jusqu'a {item.date_fin}</Table.Cell>
          <Table.Cell>{item.montant} DH</Table.Cell>
          <Table.Cell>
            <Button icon value={key}  color="green" size="small" datakey='view' onClick={clickHandle}>
              <Icon name="eye" />
            </Button>

            <Button icon value={key}  color="orange" size="small" datakey='edit' onClick={clickHandle}>
              <Icon name="edit" />
            </Button>
          </Table.Cell>
        </Table.Row>
        ))}
        
      </Table.Body>

      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell colSpan="5">
            <Button
              floated="right"
              icon
              labelPosition="left"
              primary
              size="small"
              datakey='add'
              onClick={clickHandle}
            >
              <Icon name="add" /> Nouvelle réservation
            </Button>
            <Button icon labelPosition="left" color="red" size="small" onClick={deleteHandle}>
              <Icon name="trash" /> Supprimer
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
      <ReservationModal action={action} toggle={toggle} setToggle={setToggle} item={item} notif={notif}/>
    </Table>

    )
}

export default ReservationItems
