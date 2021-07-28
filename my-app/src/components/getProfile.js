import React, {useEffect, useState} from 'react';
import { makeStyles, useTheme  } from '@material-ui/core/styles';

import { useHistory  } from 'react-router';
import Menuu from './menu/menu';
import CardProfile from './dataPro';
import { Box, Grid, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DeleteIcon from '@material-ui/icons/Delete';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EditIcon from '@material-ui/icons/Edit';
const useStyles = makeStyles((theme) => ({
  
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    maxWidth: "100%",
    maxHeight: "100%",
    
    transform: 'translateZ(0)',
  },
  titleBar: {
  
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
  downTitle: {
    textAlign: "center"
  },
 
    

  }));




function GetProfile() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles(); 
  let history = useHistory()
 
  let token = localStorage.getItem('token');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteData = async (id) => {
  
     let result = await fetch("http://127.0.0.1:8000/api/auth/post/"+id, {
          method: 'DELETE',
          headers: {
            "Authorization" : 'Bearer ' + token
          }
     });
      result = await result.json();
      alert("Publicacion eliminada con exito")
      console.warn(result)
      history.go("/getProfile")
  } 
    
  const updateData = (id) => {
    alert(id)
    history.push("/dataUpdate")
  };


  useEffect(  () => {
    const traerDatos = async () => {
      const headers = {
        "Content-Type": 'application/json',
        "Accept": 'application/json',
        "Authorization" : 'Bearer ' + token
         }
       
       await fetch("http://127.0.0.1:8000/api/auth/posts", {headers})
         .then(response => response.json())
         .then( data => {
      
            setData(data);
            console.warn(data);
            setLoading(true);
            
         })
         
         .catch(error => {
           console.error("name")
         })
         
    }
      traerDatos();
      

  }, [])
  

  return (
      <div  >
          <Menuu/>
          
          <Grid  container>
              
              <Grid xs={12} sm={4}>
                <Grid  className={classes.perfil}>
                    <CardProfile/>
                </Grid>                
              </Grid>
              <Grid xs={12} sm={8}>
                <Typography>
                    <Box 
                    textAlign="center" m={1} 
                    fontWeight="fontWeightBold"
                    fontSize={50}
                    fontFamily="Segoe UI Symbol"
                    > 
                        Mi Galeria 
                       
                    </Box>
                </Typography>
                <div className={classes.root}>
                 {!loading ?  ( <CircularProgress color="secondary"  className={classes.spiner} /> ) : (
                   <div> 
                   
                     
                     <GridList spacing={8} cols={3} className={classes.gridList}>
                     { 
                      data.posts.map((e) => (
                        
                        <GridListTile key={e.id} >
                          <img src={"http://127.0.0.1:8000/"+e.photo}  />
                          <GridListTileBar
                          
                            titlePosition="top"
                            actionIcon={
                              <IconButton className={classes.icon}>
                              
                                <StarBorderIcon />
                                {e.type}  {e.title}
                              </IconButton>
                            }
                            actionPosition="left"
                            className={classes.titleBar}
                          />
                          <GridListTileBar
                              title={e.address}
                              className={classes.downTitle}
                              actionIcon={
                                <IconButton onClick={handleClick} className={classes.icon}>
                                  <ArrowDropDownIcon />
                                </IconButton>
                              }
                            />
                            <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                          >
                            <MenuItem onClick={handleClose}>
                            <ListItemIcon onClick={()=>deleteData(e.id)}>
                            <DeleteIcon  fontSize="small" />
                          </ListItemIcon>
                          <Typography variant="inherit" noWrap>
                            Eliminar
                          </Typography>
                            </MenuItem>
                           
                          
                            
                          </Menu>
                         </GridListTile>
                        ))
                      }
                    </GridList>
                     
                      
                     
                  
                   </div>
                  
                 )}
                
                   
                    
                
              </div>
              </Grid>
             
          </Grid>
      </div>
  );
}

export default GetProfile;
