import { Box, Card, CardMedia, Grid, Typography, Button, TextField } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import  Menuu from  '../components/menu/menu';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { useHistory  } from 'react-router';


  const useStyles = makeStyles((theme) => ({

    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #00897b',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
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
 
  
  }))
 
  
function Profile() {
  
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const classes = useStyles(); 
  let history = useHistory()
   
  let token = localStorage.getItem('token');
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if(photo === "" || description === "")
    {
      alert("Actualiza tu perfil")
      history.push("/getProfile")
    }
    
  };

  
  useEffect(  () => {
  
      handleOpen();

  }, [])

  async function perfil () {
    if(photo === "" ||  description === "" ){
      alert("Actualiza tu perfil por favor")
      history.push("/profile")
    } else {

      console.warn(photo, description)
     const formData = new FormData();
     formData.append('file', photo);
     formData.append('description', description)
  
     let result = await fetch("http://localhost:8000/api/auth/pro",{
       method: 'POST',
       body: formData,
       headers: {
         "Authorization" : 'Bearer ' + token
       }
     })
     
     alert("datos guerdados")
     history.push("/getProfile")
  }
}
 
  return (
    <div>
      <Menuu />

      <Grid container>
        <Grid xs={12} sm={12} >
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <Grid container>
          <Grid xs={12} sm={6} >
              <h2 id="transition-modal-title"> Actualizar Perfil </h2>
          </Grid>
          <Grid xs={12} sm={4} >
              
          </Grid>
          <Grid xs={12} sm={2} >
              <Button  className={classes.btn} onClick={handleClose} >X</Button>
          </Grid>
          
                                              
        </Grid>
        <Grid className={classes.form} >
        <form  style={{position: "relative", top: "18%"}} className={classes.content}>
        
        <Typography>
          Foto de Perfil
        </Typography>
        <TextField
        className={classes.input}
         required
        label="Foto de Perfil"
        type="file"
        style={{width: "80%",}}
        variant="standard"
        onChange={(e)=>setPhoto(e.target.files[0])}
      />
        <Typography>
          Descripcion
        </Typography>
        <TextareaAutosize 
        style={{width: "85%",}}
        placeholder="Hablanos un poco de ti........."
        variant="standard"
        className={classes.input}
        rowsMin={5}
        onChange={(e)=>setDescription(e.target.value)}
      />
      <br/>
      <br/>
      <Grid style={{textAlign: "center",
          
          position: "relative", top: 10}} >
          <Button 
          variant="contained" 
          color="primary"
          style={{backgroundColor: "#00897b" }}
         onClick={perfil}
          >
            Guardar
          </Button>
      </Grid>
      <br />
      <br />
      
    </form>
        </Grid>
          </div>
        </Fade>
      </Modal>
     
        </Grid>
        
       
      </Grid>
      

    </div>
    
  );
}

export default Profile;
