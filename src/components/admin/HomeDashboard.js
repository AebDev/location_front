import React,{useState,useEffect} from "react";
import { Statistic, Grid, Segment, Header,Card, Icon } from "semantic-ui-react";
import axios from 'axios';
import Notif from "../Notif";
import { useAuth } from "../../context/auth";
import { Chart } from 'react-charts'
 
function MyChart(props) {

  const [data,setData] = useState([]);
  const [series,setSeries] = useState({type: 'bar'});
  const [axes,setAxes] = useState([{ primary: true, type: 'ordinal', position: 'bottom',label:'test' },
                                  { type: 'linear', position: 'left' }]);

  useEffect(() => {
    // console.log(props);
    // console.log([['09/09',2],['10/09',0],['11/09',5],['12/09',8]]);
    const res = props.statistic.reservation;
    const user = props.statistic.user;
    const veh = props.statistic.vehicule;
    console.log(res[0]);
    setData([
      
      {
        label: "Commandes d'aujourd'hui",
        data: res
      },
      {
        label: "Nouveau utilisateurs",
        data: user
      },
      {
        label: "Voitures dehors",
        data: veh
      },
      {
        label: " ",
        color : 'transparent',
        data: [['-',1*10],]
      },
      
    ]);
    
  }, [props.statistic]);

  return(
    <div
      style={{
        width: '100%',
        height: '300px'
      }}
    >
      <Chart data={data} axes={axes} series={series} tooltip />
    </div>
  );
 
}

function HomeDashboard() {
  const { authTokens } = useAuth();

  const [today,setToday] = useState([]);
  const [statistic,setStatistic] = useState({today : [],reservation : [],user : [],vehicule : []});
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(`http://127.0.0.1:8000/api/home`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens}`
      }});

      setStatistic(result.data);
    }
    fetchData();
  }, []);


  return (
    <Segment basic>
      <Grid relaxed columns={6}>
        <Grid.Column
          style={{
            backgroundColor: "#ebebeb",
            margin: "3rem",
          }}
        >
          <Card color='red'>
            <Card.Content style={{backgroundColor : '#e67e22',color:'#fff'}} header={<h4>Commandes d'aujourd'hui</h4>} />
        <Card.Content description={<h2>{statistic.today.todayOrders} <Icon name='clipboard outline' style={{color : '#e67e22'}} /></h2>} />
          </Card>
        </Grid.Column>
        <Grid.Column style={{ backgroundColor: "#ebebeb", margin: "3rem" }}>
        <Card color='blue'>
            <Card.Content style={{backgroundColor : '#3498db',color:'#fff'}} header={<h3>Nouveau utilisateurs</h3>} />
            <Card.Content description={<h2>{statistic.today.user} <Icon name='user' style={{color : '#3498db'}} /></h2>} />
          </Card>
        </Grid.Column>
        <Grid.Column style={{ backgroundColor: "#ebebeb", margin: "3rem" }}>

          <Card color='yellow'>
            <Card.Content style={{backgroundColor : '#f1c40f',color:'#fff'}} header={<h3>Voitures dehors</h3>} />
            <Card.Content description={<h2>{statistic.today.vehicule} <Icon name='car' style={{color : '#f1c40f'}} /></h2>} />
          </Card>

        </Grid.Column>
        <Grid.Column style={{ backgroundColor: "#ebebeb", margin: "3rem" }}>

          <Card color='green'>
            <Card.Content  style={{backgroundColor : '#2ecc71',color:'#fff'}} header={<h3>Revenus d'aujourd'hui</h3>} />
            <Card.Content description={<h2>{statistic.today.total} DH <Icon name='money bill alternate outline' style={{color : '#2ecc71'}} /></h2>} />
          </Card>

        </Grid.Column>
      </Grid>

      <Grid  centered style={{marginRight:'15%'}}>
        <Grid.Column  width={12}>
        <Segment>
          <Header>Statistiques des 10 derniers jours</Header>
          <MyChart statistic = {statistic}/>
        </Segment>
        </Grid.Column>
        {/* <Grid.Column width={4} style={{backgroundColor: 'rgba(232, 232, 232, 0.87)'}}>
          <Notif />
        </Grid.Column> */}
      </Grid>
    </Segment>
  );
}

export default HomeDashboard;
