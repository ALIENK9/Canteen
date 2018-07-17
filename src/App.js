import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import { Jumbotron } from 'react-bootstrap';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Reservations from './components/homes/Reservations';
import Menus from './components/homes/Menus';
import Dishes from './components/homes/Dishes';
// import Logout from './components/homes/Logout';
import Login from './components/homes/Login';
import {
  ReservationsH,
  MenuH,
  DishesH,
  LoginH,
} from './components/Headers';
import ResPage from './containers/reservations/ResPage';
import MenuPage from './containers/menus/MenuPage';

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
              <Route path="/reservations/:day" component={ResPage} />
              <Route path="/menus/:day" component={MenuPage} />
              <Route path="/menus" component={Menus} />
              <Route path="/reservations" component={Reservations} />
              <Route path="/dishes" component={Dishes} />
              {/* <Route path="/logout" component={Logout} /> */}
              <Route path="/" component={Login} />
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
