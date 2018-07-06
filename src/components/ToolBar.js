import React from 'react';
import { Navbar } from 'react-bootstrap';

/* todo: WORK IN PROGRESS */

const Toolbar = ({ }) => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Navbar.Text>
        {}
      </Navbar.Text>
      <Navbar.Text pullRight>
Have a great day!
      </Navbar.Text>
    </Navbar.Collapse>
  </Navbar>
);
