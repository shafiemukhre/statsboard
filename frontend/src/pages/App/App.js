import React from 'react';
import MiniDrawer from "./components/layout/MiniDrawer";
import { BrowserRouter as Router, Route, Redirect  } from "react-router-dom";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Dashboard from "./components/pages/Dashboard";

function App() {
  return (
    <Router>
      <div marginTop="100"><Dashboard/></div>
      
    <div className="App">
      <Route path="/" exact component={MiniDrawer} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/signin" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />

    </div>
    </Router>
  );
}

export default App;
