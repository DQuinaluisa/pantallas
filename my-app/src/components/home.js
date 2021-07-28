import React, {useEffect, useState} from 'react';
import { makeStyles, useTheme  } from '@material-ui/core/styles';

import { useHistory  } from 'react-router';
import { Card, TextField, Grid, Typography, Box, Button } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CircularProgress from '@material-ui/core/CircularProgress';

import { IconButton } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  root: {
      maxHeight: "100%",
      maxWidth: "100%",

  },
  card:{
      margin: 40,
      position: "relative",
      top: 50
  },
  margin: {
        marginLeft: "38%"
        
  },
  icon: {
    width: 80,
    height: 60,
    color: "#00897b"
  },
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
input:{
    '& label.Mui-focused': {
      color: '#00897b',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#00897b',
    },
  
  }, 
    
  }));




function Home() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const classes = useStyles(); 
  let history = useHistory()
 
  let token = localStorage.getItem('token');
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
      history.push("/homePrincipal")
    
    
  };
 
  async function newPost () {
    if(title === "" ||  address === "" || photo === "" ||  description === ""  ){
      alert("Llena todos los datos por favor")
      history.push("/homePrincipal")
    } else {

      console.warn(title, address, photo, description)
     const formData = new FormData();
     formData.append('title', title);
     formData.append('address', address);
     formData.append('file', photo);
     formData.append('description', description)
    
  
     let result = await fetch("http://localhost:8000/api/auth/post",{
       method: 'POST',
       body: formData,
       headers: {
         "Authorization" : 'Bearer ' + token
       }
     })
     
     alert("datos guardados")
   history.go("/homePrincipal")

  }
}

    

  return (
      <div  >
            
            <Grid container className={classes.root}>
                <Grid xs={12} sm={12}>
                    <Grid className={classes.card} >
                        <Card>
                             <Typography
                                 variant="h3" 
                                component="h1"
                                align="center"
                                style={{ color: "#22CB1D", position: "relative", top: 10 }}
                             >
                                <Box>
                                    Guia - Ecu
                                </Box>
                             </Typography> 
                             <br/>
                             <br/>
                             <Typography>
                                <Box
                                textAlign="left" m={4} 
                                fontWeight="fontWeightBold"
                                fontSize={18}
                                fontFamily="Segoe UI Symbol"
                                >
                                   Es una app donde podras publicar sitios 
                                   los cuales ayuden a fomentar el turismo de
                                   nuestro hermoso pais.

                                </Box>
                             </Typography>   
                             <br/>
                             <br/>
                             <br/>
                             <IconButton onClick={handleOpen}  className={classes.margin}>
                                <AddBoxIcon className={classes.icon} fontSize="large" />
                           </IconButton>
                       
                           <Typography
                            variant="h5" 
                            component="h1"
                            align="center"
                            style={{ color: "#00897b", position: "relative",  }}
                          >
                          <Box>
                              Publicar
                          </Box>
                       </Typography> 
                       <br/>
                        <br/>
                        <br/>
                        </Card>
                    </Grid>
                </Grid>
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
              <h2 id="transition-modal-title"> Nueva Publicación</h2>
          </Grid>
          <Grid xs={12} sm={4} >
              
          </Grid>
          <Grid xs={12} sm={2} >
              <Button  className={classes.btn} onClick={handleClose} >X</Button>
          </Grid>
          
                                              
        </Grid>
        <Grid className={classes.form} >
        <form  style={{position: "relative", top: "18%"}} className={classes.content}>
        
        
        <TextField
        className={classes.input}
        required
        label="Titulo"
        type="text"
        style={{width: "90%",}}
        variant="standard"
        onChange={(e)=>setTitle(e.target.value)}
      />
      <TextField
        className={classes.input}
        required
        label="Ubicacion"
        type="text"
        style={{width: "90%",}}
        variant="standard"
        onChange={(e)=>setAddress(e.target.value)}
      />

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
        style={{width: "90%",}}
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
          onClick={newPost}
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
      </div>
  );
}

export default Home;
