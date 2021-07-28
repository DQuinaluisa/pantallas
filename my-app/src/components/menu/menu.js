import React, { useEffect, useState } from 'react';
import { makeStyles, fade, } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Card, Grid, Link } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
    root: {
      flex: 1,
    
      overflow: "hidden",
      
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      padding: 5
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(3),
        width: '100%',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 1),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '20ch',
      },
    }, 
    icon: {
      
      color: "#ffff"
    },
  }));

function Menuu (props) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  let history = useHistory();
  let token = localStorage.getItem('token');
  
  const perfil = () => {
    history.push("/getProfile")
  } 
  const perfilActualizar = () => {
    history.push("/profile")
  } 
  const home = () => {
    history.push("/homePrincipal")
  } 

    useEffect(() => {
      const headers = {
        "Content-Type": 'application/json',
        "Accept": 'application/json',
        "Authorization" : 'Bearer ' + token
         }
         fetch("http://localhost:8000/api/auth/user", {headers})
         .then(response => response.json())
         .then( data => {
            setData(data);
         }).catch(error => {
           console.error("data")
         })
    }, [])

    
    function salir () {
      console.log(token);
      let sal = localStorage.clear();
      console.log(sal);
      history.push("/")
    }
  
  
  return (
    
    <div className={classes.root}>
    <AppBar style={{backgroundColor: "#00897b"}} position="static">
      <Toolbar>
        <Grid container
        
        justify="flex-start"
        alignItems="center">
        <IconButton onClick={home} className={classes.margin}>
              <HomeIcon className={classes.icon} fontSize="large" />
         </IconButton>
        <Typography variant="h6"  >
             Guia - Ecu
         </Typography>
      
        </Grid>
        
        <Grid container
        
        justify="flex-end"
        alignItems="center"
       
        >
        <Grid spacing={5}>
        <IconButton onClick={perfil} className={classes.margin}>
              <AccountCircleIcon className={classes.icon} fontSize="large" />
         </IconButton>
        </Grid>
           
          <Grid spacing={5}>
          <Link style={{color: "white" }} onClick={perfilActualizar}>
          <h3 className={classes.title}  > {data.name} </h3></Link>
          </Grid>
         </Grid>
        
        <Button
        onClick={salir}
        color="inherit">Salir</Button>
        
      </Toolbar>
    </AppBar>
  </div>
  );
}

export default Menuu;