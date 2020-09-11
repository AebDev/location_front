import React from "react";
import { Statistic, Grid, Segment, Header,Card } from "semantic-ui-react";
import Notif from "../Notif";

function HomeDashboard() {
  return (
    <Segment basic>
      <Grid container columns={4}>
        <Grid.Column
          style={{
            backgroundColor: "#ebebeb",
            margin: "3rem",
          }}
        >
          <Card color='red'>
            <Card.Content style={{fontSize:'2rem'}} header="About Amy" />
            <Card.Content description='223555' />
          </Card>
        </Grid.Column>
        <Grid.Column style={{ backgroundColor: "#ebebeb", margin: "3rem" }}>
        <Card color='blue'>
            <Card.Content style={{fontSize:'2rem'}} header="About Amy" />
            <Card.Content description='223555' />
          </Card>
        </Grid.Column>
        <Grid.Column style={{ backgroundColor: "#ebebeb", margin: "3rem" }}>

          <Card color='green'>
            <Card.Content style={{fontSize:'2rem'}} header="About Amy" />
            <Card.Content description='223555' />
          </Card>

        </Grid.Column>
      </Grid>

      <Grid container >
        <Grid.Column width={12}>

        </Grid.Column>
        <Grid.Column width={4} style={{backgroundColor: 'rgba(232, 232, 232, 0.87)'}}>
          <Notif />
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

export default HomeDashboard;
