import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {

  return (
    <div>
    { !props.isLoggedIn ?
      (
        <div className='navContainer' style={navbarContainerStyle}>
          <Link to='/login' style={noUnderline}>
            <p className='navItem'>Log in </p>
          </Link>
          <Link to='/signup' style={noUnderline}>
            <p className='navItem'>Sign up</p>
          </Link>
        </div>
      ) : (
          <div className='navContainer' style={navbarContainerStyle}>
            <Link to='/' style={noUnderline}>
              <p className='navItem'>Home</p>
            </Link>
            <Link to='/projects' style={noUnderline}>
              <p className='navItem'>Projects</p>
            </Link>
            <Link to='/logout' style={noUnderline}>
              <p className='navItem'>Log out</p>
            </Link>
        </div>
      )
    }
    </div>
  )
};

const navbarContainerStyle = {
  float: "right",
  display: "flex",
  padding: "10px",
  marginRight: "3%"
}

const noUnderline = {
  textDecoration: "none"
}

export default Navbar;
