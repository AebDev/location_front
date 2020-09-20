import React, { useState, useEffect } from "react";
import {
  Grid,
  Header,
  Container,
  Icon,
  Form,
  Image,
  Segment,
  Table,
  Button,
  Modal,
} from "semantic-ui-react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";

function Account() {
  const { authTokens } = useAuth();
  const [listReservation, setListReservation] = useState([]);
  const [open, setOpen] = useState(false);
  const [modelItem, setModelItem] = useState({});
  useEffect(() => {
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens}`,
      },
    };
    async function fetchData() {
      const result = await axios.get(
        `http://127.0.0.1:8000/api/location`,
        header
      );
      setListReservation(result.data.data);
      console.log(result.data.data);
    }
    fetchData();
  }, []);

  return (
    <Grid
      textAlign="center"
      style={{
        margin: "0rem",
        height: "100vh",
        backgroundSize: "cover",
        BackgroundPosition: "center",
      }}
      verticalAlign="middle"
    >
      <Grid.Column>
        <Container style={{ height: "80vh", marginTop: "10vh" }}>
          <Header as="h2" textAlign="center">
            <Icon name="clipboard" color="teal" />
            <Header.Content>Reservation</Header.Content>
          </Header>
          <Form size="large">
            <Segment stacked style={{ padding: "2rem" }}>
              <Header as="h3">Historique de reservation</Header>

              {listReservation.map((item) => (
                  
                <Segment textAlign="left">
                  <Grid stackable>
                    <Grid.Column width={4}>
                      <Image
                        src={`http://localhost:8000${item.vehicules.image}`}
                        style={{ width: "100vh" }}
                      />
                    </Grid.Column>
                    <Grid.Column width={12}>
                      <Header as="h3">Commande Numero : {item.id} </Header>
                      <Table definition>
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell width={2}>Date Commande</Table.Cell>
                            <Table.Cell>{item.created_at}</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>Vehicule</Table.Cell>
                            <Table.Cell>
                              {item.vehicules.marque +
                                " " +
                                item.vehicules.modele}
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>Periode</Table.Cell>
                            <Table.Cell>
                              De{" "}
                              <span style={{ color: "teal" }}>
                                {item.date_debut}
                              </span>{" "}
                              Jusqu'a{" "}
                              <span style={{ color: "teal" }}>
                                {item.date_fin}
                              </span>
                            </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>Montant</Table.Cell>
                            <Table.Cell>{item.montant} dh</Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>

                      <Modal
                        onClose={() => setOpen(false)}
                        onOpen={() => {
                          setOpen(true);
                          setModelItem(item);
                        }}
                        open={open}
                        trigger={
                          <Button
                            style={{ float: "right" }}
                            color="teal"
                            size="large"
                          >
                            more info ...
                          </Button>
                        }
                      >
                        <Modal.Header>
                          Commande numero : {modelItem.id}
                        </Modal.Header>
                        <Modal.Content image>
                          <Image
                            size="medium"
                            src="https://picsum.photos/200"
                            wrapped
                          />
                          <Modal.Description>
                            <Table definition>
                              <Table.Body>
                                <Table.Row>
                                  <Table.Cell width={2}>
                                    Date Commande
                                  </Table.Cell>
                                  <Table.Cell>{item.created_at}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                  <Table.Cell>Vehicule</Table.Cell>
                                  <Table.Cell>
                                    {item.vehicules.marque +
                                      " " +
                                      item.vehicules.modele}
                                  </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                  <Table.Cell>Periode</Table.Cell>
                                  <Table.Cell>
                                    De{" "}
                                    <span style={{ color: "teal" }}>
                                      {item.date_debut}
                                    </span>{" "}
                                    Jusqu'a{" "}
                                    <span style={{ color: "teal" }}>
                                      {item.date_fin}
                                    </span>
                                  </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                  <Table.Cell>Montant</Table.Cell>
                                  <Table.Cell>{item.montant} dh</Table.Cell>
                                </Table.Row>
                              </Table.Body>
                            </Table>
                          </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                          <Button color="red" onClick={() => setOpen(false)}>
                            <Icon name="remove" /> Close
                          </Button>
                        </Modal.Actions>
                      </Modal>
                    </Grid.Column>
                  </Grid>
                </Segment>
              ))}
            </Segment>
          </Form>
        </Container>
      </Grid.Column>
    </Grid>
  );
}

export default Account;
