import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";



import { makeStyles, useTheme  } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import { autoPlay } from 'react-swipeable-views-utils';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory  } from 'react-router';
import Link from '@material-ui/core/Link';

import Profile from './components/profile';
import Signup from './components/signup';
import DataPro from './components/dataPro';
import GetProfile from './components/getProfile';
import Home from './components/home';
import HomeGet from './components/homeGet';
import DataUpdate from './components/dataUpdate';


const authenticate = {
  isLoggedIn: false,
  onAuthentication(){
    this.isLoggedIn=true;
  },
  getLogInStatus(){
    return this.isLoggedIn;
  }
}

function SecuredRoute(props){
  return(
    <Route path={props.path} render={data=>authenticate.getLogInStatus()?(
      <props.component {...data}></props.component>): 
      (<Redirect to={{ pathname: '/'}}></Redirect>)
    }></Route>
  )
}


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const Photos = [
  { id:1, img: "../../../pictures/logos.jpg" },
  { id:2, img: "../../../pictures/logo2.jpg" },
  { id:3, img: "../../../pictures/logo3.jpg" },
  { id:4, img: "../../../pictures/logo4.jpg" },
  { id:5, img: "../../../pictures/logo5.jpg" },
  { id:6, img: "../../../pictures/logo6.jpg" },
  { id:7, img: "../../../pictures/logo7.jpg" },
]

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: "100%",
      maxHeight: "100%",
      flexGrow: 1,
      margin: 20,
      position: "relative",
      top: 25,
      
     
    },
    imgs: { 
      height: 700,
      display: 'block',
      maxWidth: "100%",
      overflow: 'hidden',
      width: '100%',
      position: "relative",
      borderRadius: 50
    },
    content: {
      '& .MuiTextField-root': {
        margin: theme.spacing(2),
        maxWidth: "100%",
    },
    margin: 20,
    justifyContent: 'center'
   
  },
  card : {
    height: 700,
    maxWidth: "100%",
    borderRadius: 50,
    backgroundColor: "#D5F9EF",
    justifyContent: 'center'
  },
  input:{
    '& label.Mui-focused': {
      color: '#22CB1D',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#22CB1D',
    },
  
  }, 

  }));





function Login() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  let history = useHistory()
  /* Variables  */

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleStepChange = (step) => {
    setActiveStep(step);
  };


  async function login() {

   if(email === "" ||  password === "" ){
     alert("Por Favor Logeate")
     history.push("/")
   } else {
    let data={email, password}
 
    let result = await fetch("http://localhost:8000/api/auth/login",{
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      }
    })
    result = await result.json()
    localStorage.setItem('token', result.access_token);
    localStorage.setItem("user_id", result.user.id);
    console.warn(result)
    authenticate.onAuthentication();
    //history.push("/dP")
    //history.push("/profile")
    //history.push("/getProfile")
    history.push("/homePrincipal")
   }
    
    
    

  }
  return (
    <div  >
    <Grid  className={classes.root}>
       <Grid container spacing={3}>
         
           <Grid item xs={12} sm={8}>
               <AutoPlaySwipeableViews
                 axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                 index={activeStep}
                 onChangeIndex={handleStepChange}
                 enableMouseEvents
                 
               >
                 {Photos.map((step, index) => (
                   <div key={step.id}>
                     {Math.abs(activeStep - index) <= 2 ? (
                       <img className={classes.imgs}  src={step.img}  />
                     ): null}
                   </div>
                 ))}
               </AutoPlaySwipeableViews>
           </Grid>
           <Grid item xs={12} sm={4}>
               <Grid >
                 <Card className={classes.card} >
                     <form  style={{position: "relative", top: "18%"}} className={classes.content}>
                         <Typography  
                             variant="h3" 
                             component="h2"
                             align="center"
                             style={{ color: "#22CB1D" }}
                             >
                               Guia - Ecu
                           </Typography>
                             <br />
                           <Typography  
                           variant="h5" 
                           component="h2"
                           align="center"
                           style={{ color: "#22CB1D" }}
                           >
                             Login
                         </Typography>
                       
                     
                       <TextField
                       className={classes.input}
                        required
                       label="Email"
                       type="text"
                       style={{width: "90%",}}
                       variant="standard"
                       value={email}
                       onChange={(e)=>setEmail(e.target.value)}
                     />
                     
                       <TextField
                       style={{width: "90%",}}
                       required
                       label="Password"
                       type="password"
                       autoComplete="current-password"
                       variant="standard"
                       className={classes.input}
                       value={password}
                       onChange={(e)=>setPassword(e.target.value)}
                     />
                     <br/>
                     <br/>
                     <Grid style={{textAlign: "center",
                         
                         position: "relative", top: 10}} >
                         <Button 
                         variant="contained" 
                         color="primary"
                         style={{backgroundColor: "#22CB1D" }}
                         onClick={login}
                         >
                           Ingresar
                         </Button>
                     </Grid>
                     <br />
                     <br />
                     <Typography align="center"  >
                      <Link href="signup" style={{textDecoration: "none"}}>
                        Si aun no tienes cuenta registrate?
                      </Link>
                     </Typography>
                   </form>
                 </Card>
               </Grid>
           </Grid>
       </Grid>
   </Grid> 
 </div>
  );
}

function App() {
  return (
      <div>    
        <Router>
              
              <Route path="/" exact component={Login} />
              <Route path="/signup" component={Signup} />
              <Route  path="/homePrincipal" component={HomeGet}/>
              <Route path="/getProfile" component={GetProfile} />
              <SecuredRoute path="/profile" component={Profile} />
              <SecuredRoute path="/dP" component={DataPro} />              
              <SecuredRoute path="/home" component={Home}/>
              <Route path="/dataUpdate" component={DataUpdate}/>
              
        </Router>
      </div>
  );
}

export default App;
