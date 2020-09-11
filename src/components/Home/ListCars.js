import React, { useState, useEffect, useContext } from 'react'
import { Link, Redirect } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Button, Form, Grid, Header, Segment, Label, Container, Image, Icon, Popup } from "semantic-ui-react";
import FilterCars from './FilterCars';
import axios from 'axios';
import { ReservContext } from '../../context/Reserv'


const specs = [
  {

    info: 'Nombre de passagers : ',
    icon: 'users',
  },
  {

    info: 'Nombre de portes : ',
    icon: 'car',
  },
  {

    info: 'Boite de vitesse ',
    icon: 'key',
  },
  {

    info: 'Climatisation : ',
    icon: 'snowflake',
  },
  {

    info: 'Coleur',

  },
]



function ListCars(props) {


  const [listCars, setListCars] = useState([]);

  const reserv = useContext(ReservContext);
  // const [startDate, setStartDate] = useState(props.match.params.start);
  // const [endDate, setEndDate] = useState(props.match.params.end);
  // const [age, setAge] = useState(props.match.params.age);

  console.log(props.match.params.age);

  useEffect(() => {
    async function fetchData() {

      const result = await axios.get(`http://127.0.0.1:8000/api/vehicule?age=${props.match.params.age}&start=${props.match.params.start}&end=${props.match.params.end}`,);
      
      // setListCars(result.data.data);
      setListCars(result.data.data.filter((i) => i.categories));
      console.log(result.data.data);
    }
    fetchData();

    reserv.setResInfo(props.match.params);
  }, []);

  return (

    <Container style={{ marginTop: '5em' }}>

      <Form size="large" >
        <Grid style={{ height: "100vh" }} doubling stackable >

          <FilterCars />

          <Grid.Column width={12}>

            <Grid width={16} columns={3} doubling stackable>

              {listCars.map((car) => (
                
                <Grid.Column  >
                  
                  <Segment stacked textAlign='left'>
                    <Label ribbon color="teal" >{car.categories.nom_categorie}</Label>
                    <Header as="h1" color="teal" textAlign='center'>
                      {car.marque} {car.modele}
                    </Header>
                    
                    <Image src={`http://localhost:8000${car.image}`} style={{ width: "100vh" }} />


                    <Header as="h3" textAlign='center' color="grey">Carburant</Header>
                    <Container textAlign='center'>
                      {/* {specs.map((spec) => (
                        <Popup Fluid
                          content={spec.info}


                          trigger={<Icon color='teal' size='big' name={spec.icon}
                          />}
                        />
                      ))} */}

                      <Popup Fluid
                        content={specs[0].info + '' + car.nb_places}
                        trigger={<Icon color='teal' size='big' name={specs[0].icon}
                        />}
                      />
                      <Popup Fluid
                        content={specs[1].info + '' + car.nb_portes}
                        trigger={<Icon color='teal' size='big' name={specs[1].icon}
                        />}
                      />
                      <Popup Fluid
                        content={specs[2].info + '' + car.boite_vitesse}
                        trigger={<Icon color='teal' size='big' name={specs[2].icon}
                        />}
                      />
                      <Popup Fluid
                        content={specs[3].info + '' + (car.climatisation ? 'oui' : 'non')}
                        trigger={<Icon color='teal' size='big' name={specs[3].icon}
                        />}
                      />
                      <Popup Fluid
                        content={specs[4].info}
                        trigger={<Icon color='teal' size='big' style={{ backgroundColor: `${car.couleur}` }}
                        />}
                      />
                    </Container>

                    <Header textAlign='center'>{car.cout_par_jour}dh Par Jour</Header>
                    <Button as={Link} to={`/reservation/${car.id}`} fluid color="teal" textAlign='right' size="large">
                      RESERVER
                    </Button>

                  </Segment>

                </Grid.Column>
              )
              )}


            </Grid>
          </Grid.Column>
        </Grid>
      </Form>
    </Container>
  )
}

export default ListCars
