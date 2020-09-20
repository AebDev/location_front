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
import { useToasts } from 'react-toast-notifications'



function CategoryDashboard() {
  
  const [listCategory, setListCategory] = useState([]);
  const {authTokens} = useAuth();

  const [action,setAction] = useState('');
  const [toggle,setToggle] = useState(false);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(3);

  const { addToast } = useToasts();

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

  const refreshHandle = (action,value) => {
    switch (action) {
      case 'add':
        const list = listCategory;
        list.push(value.data);
        setListCategory(list);
        break;
      case 'edit':
        const list2 = listCategory.filter((item) => item.id !== value.data.id);
        list2.push(value.data);
        setListCategory(list2);
        break;
      case 'delete':
        const list3 = listCategory.filter(
          function(e) {
            return this.indexOf(e.id) < 0;
          },value
        );
        setListCategory(list3);
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
        <CategoryItems items={currentItems} loading={loading} notif={notif} refreshHandle={refreshHandle}/>

        <PaginationBar setCurrentPage={setCurrentPage} total={listCategory.length / postPerPage}/>
      </Grid>
      
    </Segment>
  );
}

export default CategoryDashboard;
