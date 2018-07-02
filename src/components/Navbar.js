import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
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
  </nav>
);

export default Navbar;
