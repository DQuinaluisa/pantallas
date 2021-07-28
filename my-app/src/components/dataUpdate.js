import React, {useEffect, useState} from 'react';
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import Menuu from './menu/menu';
import CardProfile from './dataPro';
import { useHistory  } from 'react-router';
import { Card, CardMedia, Grid, Typography, Box, CardActions, TextareaAutosize, Button, TextField } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'react-router-dom';




const useStyles = makeStyles((theme) => ({
  card: {
    maxHeight: "100%",
    width: "70%",
    margin: 50,
    marginLeft: "20%"
  },
    form :{
        margin: 50
    },
    
      btn :{
        fontSize: 30
      },
      content: {
        '& .MuiTextField-root': {
          margin: theme.spacing(2),
          maxWidth: "100%",
      },
      margin: 20,
      justifyContent: 'center'
     
    },

  }));




function DataUpdate() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const classes = useStyles(); 
  let history = useHistory()
 
  let token = localStorage.getItem('token');




  return (
      <div  >
        <Menuu/>
        <Grid container>
            <Grid xs={12} sm={3}>
                <CardProfile/>
            </Grid>
            <Grid xs={12} sm={8}>
           
            <Card 
            style={{backgroundColor: "#eceded"}}            
            className={classes.card}>
  
              <Typography>
              <Box 
              textAlign="center" m={1} 
              fontWeight="fontWeightBold"
              fontSize={50}
              fontFamily="Segoe UI Symbol"
              > 
                 Actualizar Publicacion
              </Box>
          </Typography>
              
         
            <Grid className={classes.form} >
           
            
                <TextField
                className={classes.input}
                required
                label="Titulo"
                type="text"
                style={{width: "90%",}}
                variant="outlined"
              
            />
            <TextField
                className={classes.input}
                required
                label="Ubicacion"
                type="text"
                style={{width: "90%",}}
                variant="outlined"
               
            />
            <Typography>
              Foto de Perfil
            </Typography>
            <TextField
            className={classes.input}
             required
           
            type="file"
            style={{width: "90%",}}
            variant="outlined"
         
          />
       
            <Typography>
              Descripcion
            </Typography>
            <TextareaAutosize 
            style={{width: "95%",}}
            placeholder="Hablanos un poco de ti........."
            variant="outlined"
            className={classes.input}
            rowsMin={5}
        
          />
          <br/>
          <br/>
          <Grid style={{textAlign: "center",
              
              position: "relative", top: 10}} >
              <Button 
              variant="contained" 
              color="primary"
              style={{backgroundColor: "#00897b" }}
            
              >
                Guardar
              </Button>
          </Grid>
          <br />
          <br />
          
        
            </Grid>
         
              </Card>
            </Grid>
            <Grid xs={12} sm={1}></Grid>
        </Grid>
      </div>
  );
}

export default DataUpdate;
