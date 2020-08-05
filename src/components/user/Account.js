import React, { useState, useEffect } from "react";
import {
    Grid,
    Header,
    Container,
    Icon,
    Form,
    Image,
    Segment,
    Divider,
    Table,
    Button,
} from "semantic-ui-react";
import axios from "axios";
import { useAuth } from "../../context/auth";

function Account() {
    const { authTokens } = useAuth();
    const [listReservation, setListReservation] = useState([]);
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
                        <Icon name="user" color="teal" />
                        <Header.Content>Account</Header.Content>
                    </Header>
                    <Form size="large">
                        <Segment stacked style={{ padding: "2rem" }}>
                            <Header as="h3">Historique de reservation</Header>

                            {
                                listReservation.map((item) => (

                                    <Segment textAlign="left">

                                        <Grid stackable>
                                            <Grid.Column width={4}>
                                                <Image
                                                    src="https://picsum.photos/200"
                                                    style={{ width: "100vh" }}
                                                />
                                            </Grid.Column>
                                            <Grid.Column width={12}>
                                <Header as="h3">Commande Numero : {item.id}</Header>
                                                <Table definition>
                                                    <Table.Body>
                                                        <Table.Row>
                                                            <Table.Cell width={2}>Vehicule</Table.Cell>
                                <Table.Cell>{item.vehicules.marque+' '+item.vehicules.modele}</Table.Cell>
                                                        </Table.Row>
                                                        <Table.Row>
                                                            <Table.Cell>Duree</Table.Cell>
                                                            <Table.Cell>De {item.date_debut} jusqu'a {item.date_fin}</Table.Cell>
                                                        </Table.Row>
                                                        <Table.Row>
                                                            <Table.Cell>Montant</Table.Cell>
                                                            <Table.Cell>{item.montant} dh</Table.Cell>
                                                        </Table.Row>
                                                    </Table.Body>
                                                </Table>
                                                <Button
                                                    style={{ float: 'right' }}
                                                    color="teal"
                                                    size="large"
                                                >
                                                    more info ...
                              </Button>
                                            </Grid.Column>
                                        </Grid>
                                    </Segment>

                                ))
                            }
                        </Segment>
                    </Form>
                </Container>
            </Grid.Column>
        </Grid>
    );
}

export default Account;
