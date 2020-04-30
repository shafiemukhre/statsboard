import React from 'react';
import AppbarAndDrawer from "../../components/AppbarAndDrawer";
import { BrowserRouter as Router, Route, Redirect  } from "react-router-dom";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import Dashboard from "../../components/Dashboard";
import Notebook from "../../components/Notebook"

function App() {
  return (
    <Router>
      {/* <div marginTop="100"><Dashboard/></div> */}
      
    <div className="App">
      <Route path="/app" exact component={AppbarAndDrawer} />
      
      <Route path="/app/dashboard" exact component={Dashboard} />
      <Route path="/app/notebook" exact component={Notebook} />
      <Route path="/" exact component={SignIn} />
      <Route path="/signin" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />

    </div>
    </Router>
  );
}

export default App;
