import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Jumbotron } from 'react-bootstrap';
import './App.css';
import Navbar from './containers/Navbar';
import Footer from './components/Footer';
import Reservations from './components/homes/Reservations';
import Menus from './components/homes/Menus';
// import Login from './components/homes/Login';
import {
  ReservationsH,
  MenuH,
  DishesH,
  LoginH,
} from './components/Headers';
import ResPage from './containers/reservations/ResPage';
import MenuPage from './containers/menus/MenuPage';
import LoginPage from './containers/login/LoginPage';
import DishPage from './containers/dishes/DishPage';
// import AdminPage from './containers/AdminPage';
import { RequireRole } from './containers/Auth';
import Welcome from './containers/Welcome';

/* eslint-disable react/prefer-stateless-function */
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <Route path="/reservations" component={ReservationsH} />
            <Route path="/menus" component={MenuH} />
            <Route path="/dishes" component={DishesH} />
            <Route exact path="/" component={LoginH} />
            <Navbar />
          </header>
          <Jumbotron componentClass="main">
            <Switch>
              <Route path="/reservations/:day" component={RequireRole(ResPage, { requiredRole: 'admin' })} />
              <Route path="/menus/:day" component={RequireRole(MenuPage, { requiredRole: 'admin' })} />
              <Route path="/menus" component={RequireRole(Menus, { requiredRole: 'admin' })} />
              <Route path="/reservations" component={RequireRole(Reservations, { requiredRole: 'admin' })} />
              <Route path="/dishes" component={RequireRole(DishPage, { requiredRole: 'admin' })} />
              <Route path="/login" component={RequireRole(LoginPage, { requiredRole: '' })} />
              <Route path="/home" component={Welcome} />
              <Redirect from="/" to="/home" />
            </Switch>
          </Jumbotron>
          <footer>
            <Footer />
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
