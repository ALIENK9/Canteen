import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Jumbotron } from 'react-bootstrap';
import './css/bootstrap/css/bootstrap.min.css';
import './App.css';
import DocumentTitle from 'react-document-title';
import Navbar from './containers/Navbar';
import Footer from './components/Footer';
import Reservations from './components/homes/Reservations';
import Menus from './components/homes/Menus';
// import Login from './components/homes/Login';
/* import {
  ReservationsH,
  MenuH,
  DishesH,
  LoginH,
} from './components/Headers'; */
import ResPage from './containers/reservations/ResPage';
import MenuPage from './containers/menus/MenuPage';
import LoginPage from './containers/login/LoginPage';
import DishPage from './containers/dishes/DishPage';
// import AdminPage from './containers/AdminPage';
import { RequireRole } from './containers/Auth';
import Welcome from './containers/Welcome';
import ForbiddenPage from './components/ForbiddenPage';

/* eslint-disable react/prefer-stateless-function */
class App extends Component {
  render() {
    return (
      <DocumentTitle title="Servizio mensa">
        <BrowserRouter>
          <div id="app">
            <header className="App-header">
              {/* <Route path="/reservations" component={ReservationsH} />
              <Route path="/menus" component={MenuH} />
              <Route path="/dishes" component={DishesH} />
              <Route exact path="/" component={LoginH} /> */}
              <Navbar />
            </header>
            <Jumbotron componentClass="main" bsClass="jumbotron-main">
              <Switch>
                <Route path="/reservations/:day" component={RequireRole(ResPage, { requiredRole: 'admin' })} />
                <Route path="/menus/:day" component={RequireRole(MenuPage, { requiredRole: 'admin' })} />
                <Route path="/menus" component={RequireRole(Menus, { requiredRole: 'admin' })} />
                <Route path="/reservations" component={RequireRole(Reservations, { requiredRole: 'admin' })} />
                <Route path="/dishes" component={RequireRole(DishPage, { requiredRole: 'admin' })} />
                <Route path="/login" component={LoginPage} />
                <Route path="/home" component={Welcome} />
                <Route path="/forbidden" component={ForbiddenPage} />
                <Redirect from="/" to="/home" />
              </Switch>
            </Jumbotron>
            <Footer />
          </div>
        </BrowserRouter>
      </DocumentTitle>
    );
  }
}

export default App;
