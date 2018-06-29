import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Reservations from './components/Reservations';
import Menu from './components/Menu';
import Dishes from './components/Dishes';
import Logout from './components/Logout';
import {
  ReservationsH,
  MenuH,
  DishesH,
} from './components/Headers';

/* eslint-disable react/prefer-stateless-function */
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Route path="/reservations" component={ReservationsH} />
            <Route path="/menu" component={MenuH} />
            <Route path="/dishes" component={DishesH} />
            <Navbar />
          </header>
          <main>
            <Route path="/menu" component={Menu} />
            <Route path="/reservations" component={Reservations} />
            <Route path="/dishes" component={Dishes} />
            <Route path="/logout" component={Logout} />
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
