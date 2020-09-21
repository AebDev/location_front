import React, { useState, useEffect } from "react";
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
import LeftMenu from "../layouts/LeftMenu";
import PaginationBar from "../PaginationBar";
import { useAuth } from "../../context/auth";
import axios from 'axios';
import ReservationItems from "../Items/ReservationItems";
import { useToasts } from 'react-toast-notifications'

function ReservationDashboard() {

  const [listReservation, setListReservation] = useState([]);
  const [listVehicule, setListVehicule] = useState([]);
  const [listUser, setListUser] = useState([]);
  const {authTokens} = useAuth();

  // const [activeItem, setActiveItem] = useState("Dashboard");

  const { addToast } = useToasts();

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(3);

  const startItem = {
    id:'',
    user:'',
    vehicule:'',
    date_debut:'',
    date_fin:'',
    montant:''
};

const [item,setItem] = useState(startItem);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const result = await axios.get(`http://127.0.0.1:8000/api/reservations`);
      
      setListReservation(result.data.data);
      console.log(result.data.data);
      setLoading(false);
    }
    fetchData();

    async function fetchVehi() {
      setLoading(true);
      const result = await axios.get(`http://127.0.0.1:8000/api/vehicules`);
      
      setListVehicule(result.data.data);
      console.log(result.data.data);
    }
    fetchVehi();

    async function fetchUser() {
      setLoading(true);
      const result = await axios.get(`http://127.0.0.1:8000/api/users`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens}`
        }
      });
      
      setListUser(result.data.data);
      console.log(result.data.data);
    }
    fetchUser();

  }, []);

  // const handleItemClick = (e, { name }) => setActiveItem({ name });

  
  const indexLast = currentPage * postPerPage;
  const indexFirst = indexLast - postPerPage;
  const currentItems = listReservation.slice(indexFirst,indexLast);

  const refreshHandle = (action,value) => {

    if(action == 'add' || action == 'edit'){
      const v = listVehicule.filter((item) => item.id == value.data.vehicule_id);
      const u = listUser.filter((item) => item.id == value.data.user_id);

      value.data.vehicules = v[0];
      value.data.users = u[0];
    }
    
    switch (action) {
      case 'add':
        const list = listReservation;
        list.push(value.data);
        setListReservation(list);
        break;
      case 'edit':
        const list2 = listReservation.filter((item) => item.id !== value.data.id);
        list2.push(value.data);
        setListReservation(list2);
        break;
      case 'delete':
        const list3 = listReservation.filter(
          function(e) {
            return this.indexOf(e.id) < 0;
          },value
        );
        setListReservation(list3);
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
      
        <ReservationItems items={currentItems} loading={loading} notif={notif} listVehicule={listVehicule} listUser={listUser} refreshHandle={refreshHandle}/>
        <PaginationBar setCurrentPage={setCurrentPage} total={listReservation.length / postPerPage}/>
      </Grid>
    </Segment>
  );
}

export default ReservationDashboard;
