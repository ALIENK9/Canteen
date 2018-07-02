import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Reservations from './components/homes/Reservations';
import Menus from './components/homes/Menus';
import Dishes from './components/homes/Dishes';
import Logout from './components/homes/Logout';
import {
  ReservationsH,
  MenuH,
  DishesH,
} from './components/Headers';
import ReservationsList from './containers/ReservationsList';
import MenuList from './containers/MenuList';

/* eslint-disable react/prefer-stateless-function */
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Route path="/reservations" component={ReservationsH} />
            <Route path="/menus" component={MenuH} />
            <Route path="/dishes" component={DishesH} />
            <Navbar />
          </header>
          <main>
            <Switch>
              <Route path="/reservations/:day" component={ReservationsList} />
              <Route path="/menus/:day" component={MenuList} />
              <Route path="/menus" component={Menus} />
              <Route path="/reservations" component={Reservations} />
              <Route path="/dishes" component={Dishes} />
              <Route path="/logout" component={Logout} />
            </Switch>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
