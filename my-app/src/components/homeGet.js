import React, {useEffect} from 'react';
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import { autoPlay } from 'react-swipeable-views-utils';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory  } from 'react-router';
import Menuu from './menu/menu';
import BotonPost from './home';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import GridList from '@material-ui/core/GridList';
import { Box } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        position: "relative",
        top: 20,
        margin: 10,
        width: 500,
      },
     
     
      gridList: {
        maxWidth: "100%",
        maxHeight: "100%",
        display: 'flex',       
        overflow: 'hidden',
        transform: 'translateZ(0)',
      },
      spiner: {
        margin: 50,
        marginLeft: "50%"
        
      },
     media :{
            
     }    

    
  }));




function HomeGet() {


    const classes = useStyles();
    let history = useHistory()
    /* Variables  */
    const [data, setData] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    let token = localStorage.getItem('token');

    useEffect(  () => {
        const traerDatos = async () => {
          const headers = {
            "Content-Type": 'application/json',
            "Accept": 'application/json',
            "Authorization" : 'Bearer ' + token
             }
           
           await fetch("http://127.0.0.1:8000/api/auth/post", {headers})
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
        <Menuu style={{ position: "absolute"}} />
      <Grid container>

        <Grid xs={12} sm={4}>
            <BotonPost/>
        </Grid>
        <Grid xs={12} sm={8}>
        <Typography>
        <Box 
        textAlign="center" m={1} 
        fontWeight="fontWeightBold"
        fontSize={50}
        fontFamily="Segoe UI Symbol"
        > 
            Galeria 
        </Box>
    </Typography>
    { !loading ? ( <CircularProgress color="secondary"  className={classes.spiner} /> ) : (
        <GridList  spacing={2} cols={5} className={classes.gridList}  >
        {
            data.posts.map((e) => (
                <Card style={{ height: 250}} className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="50%"
                    image={"http://127.0.0.1:8000/"+e.photo}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    {e.type}  {e.title}
                    </Typography>
                    <Typography  color="textSecondary" component="p">
                    {e.type}  {e.address}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                
              </Card>
            ))
        }
       
    </GridList>
    )}
           
            
        </Grid>
        
      </Grid>
     
      </div>
  );
}

export default HomeGet;
