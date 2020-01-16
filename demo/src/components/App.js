import React,{useState} from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import Login from './Login'
import Register from './Register'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import {Redirect} from 'react-router'
import Home from './Home'

/*test ci cd process */
function App() {
  const [isLogin, setLogin] = useState(false);
  const [address, setAddress] = useState('');
  const [companyName, setCompany] = useState('');
  const [city, setCity] = useState('');
  if(isLogin){
        return(
          <Router>
          <Switch>
            <Route path="/">
            <Home city={city} address={address} companyName={companyName} logout={setLogin}/>
            </Route>
          </Switch>
        </Router> 
        )
      }
      else{
        return <Login isLogin={isLogin} setcity={setCity} cityName={city} login={setLogin} setAddress={setAddress} setCompanyname={setCompany}/>
      }

}

export default App;
