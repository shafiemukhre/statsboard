import React from 'react';
import AppbarAndDrawer from "../../components/AppbarAndDrawer";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Notebook from '../../components/Notebook';
import SignIn from "../SignIn";
import SignUp from "../SignUp"
import Dashboard from '../../components/Dashboard';


function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/dashboard" exact component={Dashboard}/>
        <Route path="/notebook" exact component={Notebook}/>
        <Route path="/" component={AppbarAndDrawer}/>
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} /> 
      </Router>
    </div>
  );
}

export default App;
