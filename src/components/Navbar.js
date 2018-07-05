import React from 'react';
import { NavLink } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Navbar as NavBar, NavItem, Nav,
} from 'react-bootstrap';

const Navbar = () => (
  <NavBar inverse collapseOnSelect>
    <NavBar.Header>
      <NavBar.Brand>
        <NavLink to="/login">
          Home
        </NavLink>
      </NavBar.Brand>
      <NavBar.Toggle />
    </NavBar.Header>
    <NavBar.Collapse>
      <Nav>
        <LinkContainer to="/menus">
          <NavItem eventKey={1}>
            Menu
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/reservations">
          <NavItem eventKey={2}>
            Prenotazioni
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/dishes">
          <NavItem eventKey={3}>
            Inserimenti piatti
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/logout">
          <NavItem eventKey={4}>
            Logout
          </NavItem>
        </LinkContainer>
      </Nav>
    </NavBar.Collapse>
  </NavBar>
);

/* Vecchio menu
  <nav>
    <ul>
      <li>
        <NavLink to="/menus">
          Menu
        </NavLink>
      </li>
      <li>
        <NavLink to="/reservations">
          Prenotazioni
        </NavLink>
      </li>
      <li>
        <NavLink to="/dishes">
          Inserimento piatti
        </NavLink>
      </li>
      <li>
        <NavLink to="/logout">
          Logout
        </NavLink>
      </li>
    </ul>
  </nav> */

export default Navbar;
