import React from 'react';
import {Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const Header = (props) => (
     <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        <img
          alt=""
          src="/transmission-icon.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
       Transmission
      </Navbar.Brand>
    </Navbar>
);
export default Header;