import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Label,
  Container,
  Image,
  Icon,
  Popup,
  Modal,
} from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBaby } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ReservContext } from "../../context/Reserv";
import { useAuth } from "../../context/auth";

import { PayPalButton } from "react-paypal-button-v2";


function Reservation(props) {
  const reserv = useContext(ReservContext);
  const { authTokens } = useAuth();

  const [etat, setEtat] = useState("test");
  const [vol, setVol] = useState("");
  const [air, setAir] = useState("");
  const [start, setStart] = useState(reserv.resInfo.start);
  const [end, setEnd] = useState(reserv.resInfo.end);
  const [assurance, setAssurance] = useState("1");
  const [gps, setGps] = useState(false);
  const [wifi, setWifi] = useState(false);
  const [enfant, setEnfant] = useState(false);
  const [bebe, setBebe] = useState(false);
  // const [vehicule, setVehicule] = useState(props.match.params.id);

  const [car, setCar] = useState({});

  const [diff, setDiff] = useState("");

  const [totalAssurance, setTotalAssurance] = useState(0);
  const [totalOption, setTotalOption] = useState(0);

  const [checkout, setCheckout] = useState(false);

  const [open, setOpen] = useState(false);


  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        `http://127.0.0.1:8000/api/vehicule/${props.match.params.id}`
      );
      setCar(result.data.data);
    }
    fetchData();
    console.log(start);
    console.log(end);
    setDiff(dateDiff(start, end));
  }, []);

  if (reserv.resInfo === "") {
    return <Redirect to={"/"} />;
  }

  function dateDiff(date1, date2) {
    let dt1 = date1.split("-");
    let dt2 = date2.split("-");
    const dif = Math.floor(
      (Date.UTC(dt2[0], dt2[1], dt2[2]) - Date.UTC(dt1[0], dt1[1], dt1[2])) /
        (1000 * 60 * 60 * 24)
    );

    return dif;
  }
  if (reserv.resInfo === "") {
    return <Redirect to={"/"} />;
  }

  function postReservation() {
    const data = {
      montant: totalCalc(),
      etat: etat,
      num_de_vol: vol,
      compagnie_aerienne: air,
      date_debut: start,
      date_fin: end,
      type_de_protection: assurance,
      option_gps: gps,
      option_wifi: wifi,
      option_Rehausseur_enfant: enfant,
      option_Rehausseur_bebe: bebe,
      vehicule_id: props.match.params.id,
    };

    console.log(data);
    axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens}`,
      },
      method: "POST",
      url: "http://127.0.0.1:8000/api/location",
      data: data,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function assuranceHandleChange(e, { value }) {
    let calc = totalAssurance;
    if (assurance === "2") {
      calc -= parseFloat(60 * diff);
    }
    if (assurance === "3") {
      calc -= parseFloat(80 * diff);
    }

    if (value === "2") {
      calc += parseFloat(60 * diff);
    }
    if (value === "3") {
      calc += parseFloat(80 * diff);
    }

    setTotalAssurance(calc);
    setAssurance(value);
  }

  function wifiHandleChange(e, { value }) {
    let calc = totalOption;
    value ? (calc -= parseFloat(100 * diff)) : (calc += parseFloat(100 * diff));
    setTotalOption(calc);
    setWifi(!value);
  }

  function gpsHandleChange(e, { value }) {
    let calc = totalOption;
    value ? (calc -= parseFloat(100 * diff)) : (calc += parseFloat(100 * diff));
    setTotalOption(calc);
    setGps(!value);
  }

  function bebeHandleChange(e, { value }) {
    let calc = totalOption;
    value ? (calc -= parseFloat(70 * diff)) : (calc += parseFloat(70 * diff));
    setTotalOption(calc);
    setBebe(!value);
  }

  function enfantHandleChange(e, { value }) {
    let calc = totalOption;
    value ? (calc -= parseFloat(40 * diff)) : (calc += parseFloat(40 * diff));
    setTotalOption(calc);
    setEnfant(!value);
  }

  function volHandleChange(e, { value }) {
    setVol(value);
  }
  function airHandleChange(e, { value }) {
    setAir(value);
  }

  const specs = [
    {
      info: `Nombre de passagers : ${car.nb_places}`,
      icon: "users",
    },
    {
      info: `Nombre de portes : ${car.nb_portes}`,
      icon: "car",
    },
    {
      info: `Boite de vitesse ${car.boite_vitesse}`,
      icon: "key",
    },
    {
      info: `Climatisation : ${car.climatisation}`,
      icon: "snowflake",
    },
  ];

  const totalCalc = () => {
    const calc =
      car.cout_par_jour * diff +
      parseFloat(car.franchise) +
      totalAssurance +
      totalOption;
    return calc;
  };

  

  return (
    <Container style={{ marginTop: "5em" }}>
      <Form size="large">
        <Grid style={{ height: "100vh" }} doubling stackable>
          <Grid.Column width={12}>
            <Segment inverted color="teal">
              <Header as="h2" textAlign="left">
                Options
              </Header>
            </Segment>

            <Segment stacked>
              <Grid columns={4}>
                <Grid.Column>
                  <Icon size="large" name="wifi" />
                </Grid.Column>
                <Grid.Column>
                  <Header>Wi-Fi</Header>
                </Grid.Column>
                <Grid.Column>
                  <Form.Checkbox
                    name="wifi"
                    value={wifi}
                    onChange={wifiHandleChange}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Header>100 DH</Header>par jour
                </Grid.Column>
              </Grid>
              <Grid columns={4}>
                <Grid.Column>
                  <Icon size="large" name="location arrow" />
                </Grid.Column>
                <Grid.Column>
                  <Header>GPS</Header>
                </Grid.Column>
                <Grid.Column>
                  <Form.Checkbox
                    name="gps"
                    value={gps}
                    onChange={gpsHandleChange}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Header>100 DH</Header>par jour
                </Grid.Column>
              </Grid>
              <Grid columns={4}>
                <Grid.Column>
                  <FontAwesomeIcon icon={faBaby} size="lg" />
                </Grid.Column>
                <Grid.Column>
                  <Header>Siège bébé 0 à 3 ans</Header>
                </Grid.Column>
                <Grid.Column>
                  <Form.Checkbox
                    name="baby"
                    value={bebe}
                    onChange={bebeHandleChange}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Header>70 DH</Header>par jour
                </Grid.Column>
              </Grid>
              <Grid columns={4}>
                <Grid.Column>
                  <Icon size="large" name="child" />
                </Grid.Column>
                <Grid.Column>
                  <Header>Rehausseur enfant</Header>
                </Grid.Column>
                <Grid.Column>
                  <Form.Checkbox
                    name="child"
                    value={enfant}
                    onChange={enfantHandleChange}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Header>40 DH</Header>par jour
                </Grid.Column>
              </Grid>
            </Segment>

            <Segment inverted color="teal">
              <Header as="h2" textAlign="left">
                Assurance
              </Header>
            </Segment>

            <Segment stacked>
              <Grid>
                <Grid.Column width={8} textAlign="left">
                  <Header style={{ marginBottom: "0" }}>
                    Protection de Base
                  </Header>
                  franchise non remboursable
                  <Popup
                    Fluid
                    content="En cas de dommages ou de vol de la voiture, vous pourriez perdre une partie ou l’intégralité de votre caution."
                    trigger={<Icon color="teal" name="info circle" />}
                  />
                </Grid.Column>
                <Grid.Column width={4}>
                  <Form.Radio
                    name="assurance"
                    checked={assurance === "1"}
                    onChange={assuranceHandleChange}
                    type="radio"
                    value="1"
                  />
                </Grid.Column>
                <Grid.Column width={4}>
                  <Header>0 DH</Header>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column width={8} textAlign="left">
                  <Header style={{ marginBottom: "0" }}>
                    Protection Standard
                  </Header>
                  remboursement de la franchise 50%
                </Grid.Column>
                <Grid.Column width={4}>
                  <Form.Radio
                    name="assurance"
                    checked={assurance === "2"}
                    onChange={assuranceHandleChange}
                    type="radio"
                    value="2"
                  />
                </Grid.Column>
                <Grid.Column width={4}>
                  <Header>60 DH</Header>par jour
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column width={8} textAlign="left">
                  <Header style={{ marginBottom: "0" }}>
                    Protection Premium
                  </Header>
                  <p>
                    remboursement de la franchise 100%{" "}
                    <Label color="teal">
                      {" "}
                      <Icon name="star" />
                      Recommandée
                    </Label>
                  </p>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Form.Radio
                    name="assurance"
                    checked={assurance === "3"}
                    onChange={assuranceHandleChange}
                    type="radio"
                    value="3"
                  />
                </Grid.Column>
                <Grid.Column width={4}>
                  <Header>80 DH</Header>par jour
                </Grid.Column>
              </Grid>
            </Segment>
            <Segment inverted color="teal">
              <Header as="h2" textAlign="left">
                Informations supplémentaires (informations de vol)
              </Header>
            </Segment>

            <Segment stacked>
              <Header as="h4" textAlign="left">
                <Icon color="teal" name="question circle outline" />
                Ces informations sont importantes. En effet, si votre vol a du
                retard, l’agence de location sera informée.
              </Header>
              <Grid columns={3}>
                <Grid.Column>
                  <Form.Input
                    type="text"
                    label="Code de la compagnie aérienne"
                    labelPosition="left"
                    name="air"
                    placeholder="AA"
                    onChange={airHandleChange}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    type="text"
                    label="Numéro de vol"
                    labelPosition="left"
                    name="vol"
                    placeholder="0"
                    onChange={volHandleChange}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Checkbox
                    label=" Je n’ai pas de numéro de vol"
                    name="baby"
                    value="true"
                  />
                </Grid.Column>
              </Grid>
            </Segment>
            <Segment inverted color="teal">
              <Header as="h2" textAlign="left">
                Paiement
              </Header>
            </Segment>
            <Segment stacked>
              {/* <Button color="teal"  size="large" onClick={postReservation}>
                                Réserver et payer maintenant
                            </Button> */}

              <PayPalButton
                amount={totalCalc() / 100}
                
                onSuccess={(details, data) => {
                  // alert("Transaction completed by " + "test0123");
                  setOpen(true);
                  postReservation();
                  
                  return fetch("/paypal-transaction-complete", {
                    method: "post",
                    body: JSON.stringify({
                      orderId: "test order",
                    }),
                  });
                }}
              />

            </Segment>
          </Grid.Column>

          <Grid.Column width={4}>
            <Segment stacked textAlign="left">
              <Header as="h2" color="teal">
                Votre itinéraire
              </Header>
              <Label style={{ marginBottom: "1rem" }} color="teal">
                Depart
              </Label>
              <p>{reserv.resInfo.start}</p>

              <Label style={{ marginBottom: "1rem" }} color="teal">
                Retour
              </Label>
              <p>{reserv.resInfo.end}</p>

              <Header as="h5">nombre des jours : {diff}</Header>
            </Segment>

            <Segment stacked textAlign="left">
              <Header as="h2" color="teal">
                Montant à payer
              </Header>

              <Header as="h4" textAlign="center" color="grey">
                {car.cout_par_jour} DH x {diff} jours
              </Header>
              <Header as="h4" color="grey">
                + Franchise : {car.franchise} DH
              </Header>
              <Header as="h4" color="grey">
                + assurance : {totalAssurance} DH
              </Header>
              <Header as="h4" color="grey">
                + Option : {totalOption} DH
              </Header>
              <Header as="h3" textAlign="center">
                {totalCalc()} DH TTC
              </Header>
            </Segment>

            <Segment stacked>
              <Header textAlign="left" as="h2" color="teal">
                Votre véhicule
              </Header>
              <Header as="h3" textAlign="center">
                {car.marque + " " + car.modele}
              </Header>
              <Label style={{ marginBottom: "1rem" }} color="teal">
                Category
              </Label>
              <Image
                src={`http://localhost:8000${car.image}`}
                style={{ width: "100vh" }}
              />

              <Header as="h3" textAlign="center" color="grey">
                Carburant
              </Header>

              {specs.map((spec) => (
                <Popup
                  Fluid
                  content={spec.info}
                  trigger={<Icon color="teal" size="big" name={spec.icon} />}
                />
              ))}
              <Popup
                Fluid
                content="Couleur"
                trigger={
                  <Icon
                    color="teal"
                    size="big"
                    style={{ backgroundColor: `${car.couleur}` }}
                  />
                }
              />
            </Segment>
          </Grid.Column>
        </Grid>
      </Form>


      <Modal
        centered={false}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        trigger={<Button>Show Modal</Button>}
      >
        <Modal.Header>Thank you!</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            Your subscription has been confirmed
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpen(false)}>OK</Button>
        </Modal.Actions>
      </Modal>


    </Container>
  );
}

export default Reservation;
