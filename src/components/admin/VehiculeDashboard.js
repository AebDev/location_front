import React, { useState,useEffect } from "react";
import {
  Grid,
  Segment,
} from "semantic-ui-react";
import PaginationBar from "../PaginationBar";
import { useAuth } from "../../context/auth";
import axios from 'axios';
import VehiculeItems from "../Items/VehiculeItems";
import { useToasts } from 'react-toast-notifications'

function VehiculeDashboard() {

  const [listVehicule, setListVehicule] = useState([]);
  const {authTokens} = useAuth();

  const { addToast } = useToasts();

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(3);

  const [listCategory,setListCategory] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const result = await axios.get(`http://127.0.0.1:8000/api/vehicules`);
      
      setListVehicule(result.data.data);
      console.log(result.data.data);
      setLoading(false);
    }
    fetchData();

    async function fetchCat() {
      const result = await axios.get(`http://127.0.0.1:8000/api/categorie`);
      
      setListCategory(result.data.data);
      console.log(result.data.data);
    }
    fetchCat();
  }, []);

  

  const indexLast = currentPage * postPerPage;
  const indexFirst = indexLast - postPerPage;
  const currentItems = listVehicule.slice(indexFirst,indexLast);

  const refreshHandle = (action,value) => {
    if(action == 'add' || action == 'edit'){
      const cat = listCategory.filter((item) => item.id == value.data.categorie_id);
      console.log(cat);
      value.data.categories = cat[0];
    }
    switch (action) {
      case 'add':
        const list = listVehicule;
        list.push(value.data);
        setListVehicule(list);
        break;
      case 'edit':
        const list2 = listVehicule.filter((item) => item.id !== value.data.id);
        list2.push(value.data);
        setListVehicule(list2);
        break;
      case 'delete':
        const list3 = listVehicule.filter(
          function(e) {
            return this.indexOf(e.id) < 0;
          },value
        );
        setListVehicule(list3);
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
    <Segment basic style={{paddingRight : '10%'}}> 
      <Grid >
        
        <VehiculeItems items={currentItems} loading={loading} notif={notif} refreshHandle={refreshHandle} listCategory={listCategory}/>
        <PaginationBar setCurrentPage={setCurrentPage} total={listVehicule.length / postPerPage}/>
        
      </Grid>
    </Segment>
  );
}

export default VehiculeDashboard;
