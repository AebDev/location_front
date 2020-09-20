import React, { useState, useEffect } from "react";
import {
  Grid,
  Segment,

} from "semantic-ui-react";
import PaginationBar from "../PaginationBar";
import { useAuth } from "../../context/auth";
import axios from 'axios';
import UserItems from "../Items/UserItems";
import { useToasts } from 'react-toast-notifications'

function UserDashbord() {

  const { addToast } = useToasts();

  const [listUsers, setListUsers] = useState([]);
  const { authTokens } = useAuth();

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(3);


  const startItem = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    repassword: '',
    cin: '',
    dateNaissance: '',
    adresse: '',
    telephone: '',
    ville: '',
    pays: '',
    postal: '',
    role: ''
  };

  const [item, setItem] = useState(startItem);



  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const result = await axios.get(`http://127.0.0.1:8000/api/users`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens}`
        }
      });


      setListUsers(result.data.data);
      
      console.log(result.data.data);
      setLoading(false);
    }
    fetchData();
    // setCurrentItems(listUsers.slice[indexFirst, indexLast]);

  }, []);

 


  const indexLast = currentPage * postPerPage;
  const indexFirst = indexLast - postPerPage;
  const currentItems = listUsers.slice(indexFirst,indexLast);

  
  const refreshHandle = (action,value) => {
    switch (action) {
      case 'add':
        const list = listUsers;
        list.push(value.data);
        setListUsers(list);
        break;
      case 'edit':
        const list2 = listUsers.filter((item) => item.id !== value.data.id);
        list2.push(value.data);
        setListUsers(list2);
        break;
      case 'delete':
        const list3 = listUsers.filter(
          function(e) {
            return this.indexOf(e.id) < 0;
          },value
        );
        setListUsers(list3);
        break;
      
      default:
        break;
    }
  }
  const notif = (msg,type) =>{
    addToast(msg, {
      appearance: type,
      autoDismiss: true,
    })};

  return (
    <Segment basic>
      <Grid style={{margin:'0px 150px 0px 50px'}}>
        <UserItems items={currentItems} loading={loading} notif={notif} refreshHandle={refreshHandle}/>

        <PaginationBar setCurrentPage={setCurrentPage} total={listUsers.length / postPerPage} />


      </Grid>
    </Segment>
  );
}

export default UserDashbord;
