import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';

const Navbar = (props) => {

  return (
    <div>
    { !props.isLoggedIn ?
      (
        <div classID='NavOutside' style={navbarStyle}>
          <ButtonToolbar>
            <Link to='/login'>
              <Button> Log in </Button>
            </Link>
            <Link to='/signup'>
              <Button> Sign up </Button>
            </Link>
          </ButtonToolbar>
        </div>
      ) : (
          <div classID='NavInside' style={navbarStyle}>
          <ButtonToolbar>
            <Link to='/'>
              <Button bsStyle="primary">Home</Button>
            </Link>
            <Link to='/projects'>
              <Button>Projects</Button>
            </Link>
            <Link to='/logout'>
              <Button>Log out</Button>
            </Link>
          </ButtonToolbar>
        </div>
      )
    }
    </div>
  )
};

const navbarStyle = {
  float: "right"
}

export default Navbar;
