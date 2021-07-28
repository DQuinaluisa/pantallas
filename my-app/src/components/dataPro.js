import React, {useEffect, useState} from 'react';
import { makeStyles, useTheme  } from '@material-ui/core/styles';

import { useHistory  } from 'react-router';
import { Card, CardMedia, Grid, Typography, Box, CardActions, CardActionArea } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';





const useStyles = makeStyles((theme) => ({
  
    root: {
      maxHeight: "100%",
      maxWidth: "100%",
      margin: 20,
      marginLeft: "25%",
      position: "relative",
      top: 80
      
    },
    mediaPhoto: {
  
      maxWidth: "90%",
      borderRadius: 80,
      margin: 15,
      marginLeft: "5%"
     
    },
    card : {
      
    },
    spiner: {
      margin: 50,
      marginLeft: "50%"
      
    }

  }));




function DataPro() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const classes = useStyles(); 
  let history = useHistory()
 
  let token = localStorage.getItem('token');

  const perfil = () => {
    history.push("/profile")
  } 
 
  useEffect(  () => {
    const traerDatos = async () => {
      const headers = {
        "Content-Type": 'application/json',
        "Accept": 'application/json',
        "Authorization" : 'Bearer ' + token
         }
       
       await fetch("http://127.0.0.1:8000/api/auth/pros", {headers})
         .then(response => response.json())
         .then( data => {
      
            setData(data);
            console.warn(data);
            setLoading(true)
         })
         
         .catch(error => {
           console.error("name")
         })
         
    }
      traerDatos();
    

  }, [])
    

  return (
      <div  >
      { !loading ? ( <CircularProgress color="secondary"  className={classes.spiner} /> ) : 
      (
      <div>
 
       <Grid container spacing={3} >
           
           <Grid xs={12} sm={12}>
               <Grid className={classes.root} >
               
                   <Card style={{ backgroundColor: "#DEDEDE", borderRadius: 20 }}  className={classes.cards} >
                  <CardActionArea
                    onClick={perfil}
                  >
                   <CardMedia 
                     
                   >
                      <img className={classes.mediaPhoto} 
                            src={"http://127.0.0.1:8000/"+data.profile.photo}  />
                   </CardMedia>
                   </CardActionArea>
                   <Typography>
                     <Box textAlign="center" m={1} 
                          fontWeight="fontWeightBold"
                          fontSize={30}
                          fontFamily="Segoe UI Symbol"
                     > 
                        {data.users.name}
                     </Box>
                 </Typography>
                 <Typography >
                 <Box textAlign="left" m={3} 
                       color="#00897b"
                      fontSize={18}
                      fontFamily="Arial"
                 >
                      Descripcion
                 </Box> 
             </Typography>
                 <Typography>
                 <Box textAlign="left" m={4} 
                      fontWeight="fontWeightBold"
                      fontSize={18}
                      fontFamily="Segoe UI Symbol"
                 >
                 {data.profile.description}
                 </Box>
             </Typography>              
           </Card>     
             
                    
               </Grid>
           </Grid>
         
       </Grid>  

       </div> )}
      </div>
  );
}

export default DataPro;
