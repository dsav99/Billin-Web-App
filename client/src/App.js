import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom';
// import Header from "./components/Header";
import Dashboard from './components/Dashboard';
import Menu from './components/Menu';
import Orders from './components/Orders';
import Inventory from './components/Inventory';
import Billing from './components/Billing';
import Customers from './components/Customers';
import Signup from "./components/Signup"

function App() {

  const [loggedIn,setLoggedIn] = useState(false);

  useEffect(()=>{
    // console.log(localStorage.getItem("token"))

    var authToken = 'bearer '+localStorage.getItem("token");

    // console.log(authToken.length);
    if(localStorage.getItem("token")){
      setLoggedIn(true);
    }
    else{
      console.log("NO TOKEN");
    }
  },[localStorage.getItem("token")])
  
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>

    
      <Route path='/' element={
        loggedIn ? (<Navigate replace to="/dashboard"/>) : ( <Signup/>) 
      } />
    
    
    
    <Route path='/dashboard' element={
        loggedIn ? (<Dashboard/>) : ( <Signup/>) 
      } />
    <Route path='/orders' element={
        loggedIn ? (<Orders/>) : ( <Signup/>) 
      } />
    <Route path='/billing' element={
        loggedIn ? (<Billing/>) : ( <Signup/>) 
      } />
    <Route path='/inventory' element={
        loggedIn ? (<Inventory/>) : ( <Signup/>) 
      } />
    <Route path='/customers' element={
        loggedIn ? (<Customers/>) : ( <Signup/>) 
      } />
    

    </Routes>
    </BrowserRouter>
    
    </div>
  );
}

export default App;
