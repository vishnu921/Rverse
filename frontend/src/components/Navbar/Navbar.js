import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button, Popover } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logout = () => {
    handleClose()
    dispatch({ type: LOGOUT });
    history.push('/')
    setUser(null);
  };

  const signin = (e) => {
    e.stopPropagation()
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
    handleClose()
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
            <Avatar aria-describedby={id} className={classes.purple} alt={user.result.name} src={user.result.imageUrl} onClick={handleClick}>
              {user.result.name.charAt(0)}
            </Avatar>{" "}
            <Popover 
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <div className={classes.profileOptions}>
                <div className={classes.profileOption}>
                  <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl} >
                    {user.result.name.charAt(0)}
                  </Avatar>{" "}
                  <Typography className={classes.userName} variant="h6">
                    {user.result.name}
                  </Typography>
                </div>
                <div className={classes.profileOption} onClick={myReviews}>
                  <RateReviewOutlinedIcon /> My Reviews
                </div>
                {/* <hr /> */}
                <div className={classes.profileOption} onClick={logout} >
                  <ExitToAppIcon /> Logout
                </div>
              </div>
            </Popover>
          </div>
        ) : (
          <Button onClick={signin} variant="contained" color="primary" >
            Login or Register
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
