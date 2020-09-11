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
import ReservationModal from "../modal/ReservationModal";
import ReservationItems from "../Items/ReservationItems";

function ReservationDashboard() {

  const [listReservation, setListReservation] = useState([]);
  const {authTokens} = useAuth();

  // const [activeItem, setActiveItem] = useState("Dashboard");

  

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
  }, []);

  // const handleItemClick = (e, { name }) => setActiveItem({ name });

  
  const indexLast = currentPage * postPerPage;
  const indexFirst = indexLast - postPerPage;
  const currentItems = listReservation.slice(indexFirst,indexLast);

  return (
    <Segment basic>
      <Grid style={{margin:'0px 150px 0px 50px'}}>
      
        <ReservationItems items={currentItems} loading={loading}/>
        <PaginationBar setCurrentPage={setCurrentPage} total={listReservation.length / postPerPage}/>
      </Grid>
    </Segment>
  );
}

export default ReservationDashboard;
