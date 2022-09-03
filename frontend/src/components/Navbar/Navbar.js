import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";

import useStyles from "./styles";
import rverseLogo from "../../images/logo.png";
// import rverseText from '../../images/logo.png'
import { LOGOUT } from "../../constants/actionTypes";
import { getMyReviews } from "../../actions/reviews"

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logout = () => {
    dispatch({ type: LOGOUT });
    setUser(null);
  };

  const signin = (e) => {
    e.stopPropagation();
    history.push("/auth");
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const myReviews = ()=>{
    console.log('my reviews');
    dispatch(getMyReviews(user.result._id));
  }

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        {/* <img src={rverseText} alt='icon' height='45px' /> */}
        <img className={classes.image} src={rverseLogo} alt="Rverse" height="40px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl} >
              {user.result.name.charAt(0)}
            </Avatar>{" "}
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button color='primary' variant='contained' onClick={myReviews}>
              My Reviews
            </Button>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout} >
              Logout
            </Button>
          </div>
        ) : (
          <Button onClick={(e) => signin(e)} variant="contained" color="primary" >
            Login or Register
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
