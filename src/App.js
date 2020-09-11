import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./views/HomePage";
import AdminPage from "./views/AdminPage";
import Login from "./components/authentification/Login";
import Register from "./components/authentification/Register";
import NavBar from "./components/layouts/NavBar";
import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "./context/auth";
import AdminRoute from "./AdminRoute";
import ListCars from "./components/Home/ListCars";
import Reservation from './components/Reservation/Reservation';
import { Grid, Header } from "semantic-ui-react";
import Account from "./components/user/Account";
import Profile from "./components/user/Profile";
import UserDashbord from "./components/admin/UserDashboard";
import CategoryDashboard from "./components/admin/CategoryDashboard";


function App() {
  const existingTokens = localStorage.getItem("tokens");
  const existingRole = localStorage.getItem("role");
  const existingUsers = localStorage.getItem("users");

  const [authTokens, setAuthTokens] = useState(existingTokens);

  const [authRole, setAuthRole] = useState(existingRole);

  const [authUsers, setAuthUsers] = useState(existingUsers);

  const setTokens = (data) => {
    localStorage.setItem("tokens", data);
    setAuthTokens(data);
  };

  const setRole = (data) => {
    localStorage.setItem("role", data);
    setAuthRole(data);
  };

  const setUsers = (data) => {
    localStorage.setItem("users", data);
    setAuthUsers(data);
  };


  return (
    <div className="App" style={{backgroundColor: '#f7f7f7'}}>
      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens, authUsers, setAuthUsers: setUsers, authRole, setAuthRole: setRole }}>
        <Router>
          <NavBar />
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/search/:start/:end/:age" component={ListCars}  />
            <PrivateRoute path="/reservation/:id" component={Reservation}  />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/account" component={Account} />
            <PrivateRoute path="/Profile" component={Profile} />
            <AdminRoute path="/admin" component={AdminPage} />
            {/* <AdminRoute path="/admin/home" component={AdminPage} />
            <AdminRoute path="/admin/users" component={UserDashbord} />
            <AdminRoute path="/admin/categories" component={CategoryDashboard} /> */}
            <Route path="*" component={() =>(
              <Grid textAlign="center" style={{ margin: '0rem',height: "100vh",backgroundSize: 'cover',BackgroundPosition: 'center'}} verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 450 }} >
                    <Header as='h1' color='teal'>404</Header>
                    <Header as='h3' color='grey'>Oops! Page not found</Header>
                </Grid.Column>
                
              </Grid>
              
            )} />

            
          </Switch>
        </Router>
      </AuthContext.Provider>

    </div>
  );
}

export default App;
