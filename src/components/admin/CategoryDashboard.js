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
import PaginationBar from "../PaginationBar";
import { useAuth } from "../../context/auth";
import axios from 'axios';
import CategoryItems from "../Items/CategoryItems";

function CategoryDashboard() {
  
  const [listCategory, setListCategory] = useState([]);
  const {authTokens} = useAuth();

  const [action,setAction] = useState('');
  const [toggle,setToggle] = useState(false);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(3);

  const startItem = {
    nom_categorie:'',
    age_min:'',
    annee_permis_min:'',
    
};

  const [item,setItem] = useState(startItem);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const result = await axios.get(`http://127.0.0.1:8000/api/categorie`);
      
      setListCategory(result.data.data);
      console.log(result.data.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const clickHandle = (event, data) =>{
    console.log(data.datakey)
    setAction(data.datakey);
    setToggle(true);
    data.datakey == 'add' ? setItem(startItem) : setItem(listCategory[data.value]);
  };

  const indexLast = currentPage * postPerPage;
  const indexFirst = indexLast - postPerPage;
  const currentItems = listCategory.slice(indexFirst,indexLast);

  return (
    <Segment basic>
      <Grid>
        <CategoryItems items={currentItems} loading={loading} />

        <PaginationBar setCurrentPage={setCurrentPage} total={listCategory.length / postPerPage}/>
        
      </Grid>
    </Segment>
  );
}

export default CategoryDashboard;
