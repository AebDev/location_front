import React, { useState,useEffect } from "react";
import {
  Grid,
  Segment,
} from "semantic-ui-react";
import PaginationBar from "../PaginationBar";
import { useAuth } from "../../context/auth";
import axios from 'axios';
import VehiculeItems from "../Items/VehiculeItems";

function VehiculeDashboard() {

  const [listVehicule, setListVehicule] = useState([]);
  const {authTokens} = useAuth();

  

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(3);

  

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const result = await axios.get(`http://127.0.0.1:8000/api/vehicules`);
      
      setListVehicule(result.data.data);
      console.log(result.data.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  

  const indexLast = currentPage * postPerPage;
  const indexFirst = indexLast - postPerPage;
  const currentItems = listVehicule.slice(indexFirst,indexLast);

  return (
    <Segment basic style={{paddingRight : '10%'}}> 
      <Grid>
        
        <VehiculeItems items={currentItems} loading={loading}/>
        <PaginationBar setCurrentPage={setCurrentPage} total={listVehicule.length / postPerPage}/>
        
      </Grid>
    </Segment>
  );
}

export default VehiculeDashboard;
