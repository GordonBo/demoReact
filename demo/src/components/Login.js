import React,{useState,useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © 2002-2020. Skybridge Group Pty Ltd	'}
{/*       <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'} */}
    </Typography>
  );
}



const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const [loginInfo, setLoginInfo] = useState({companyName:'',chguser:''});
  const[buttonDisabled,changeButtonDisabled]=useState(true);  

  useEffect(() =>{
        if(loginInfo.companyName !== '' && loginInfo.chguser !==''){
        changeButtonDisabled(false);
        }else if(loginInfo.companyName === '' || loginInfo.chguser ===''){
          changeButtonDisabled(true);
        } 
    })

  const onchangeInfo = (e)=>{
       const itemname=e.target.name;
       const itemvalue = e.target.value;
    setLoginInfo({...loginInfo,[itemname]:itemvalue})

      
    
  }

  /* const classes = useStyles();
  const [loginInfo, setLoginInfo] = useState({companyName:'',chguser:''});

  const onchangeInfo = (e)=>{
       const itemname=e.target.name;
       const itemvalue = e.target.value;
    setLoginInfo({...loginInfo,[itemname]:itemvalue})
  }
 */
   const subtmit =  (e, companyname,chg) =>{
       e.preventDefault();
        try{
            const url=`https://TrainingAPAC.jitterbit.cc/38695(DEV)/v1/getCustomerByCompany?chguser='${chg}'&company='${companyname}'`;
            axios.get(url).then(res=>res.data)
            .then((data) => {
              if(data.id !== null){
                props.setcity(data.city)
                props.setAddress(data.address)
                props.setCompanyname(data.companyName)
                props.login(true)
              }
               else{
                 alert("invalid username or password")
               } 
            })
        }catch(err){
            console.error(err);
        }  
      
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="companyName"
            label="User Name"
            name="companyName"
            autoComplete="companyName"
            value={loginInfo.companyName}
            onChange={(e)=>onchangeInfo(e)}
            autoFocus
          />
     
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="chguser"
            label="chguser"
            type="password"
            id="chguser"
            value={loginInfo.chguser}
            onChange={(e)=>onchangeInfo(e)}
            autoComplete="current-password"
          />
      
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={buttonDisabled}
            className={classes.submit}
            onClick={(e)=>subtmit(e, loginInfo.companyName,loginInfo.chguser)}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}