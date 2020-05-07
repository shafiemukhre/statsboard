import React from 'react';
import { BrowserRouter as Router, Route, Redirect  } from "react-router-dom";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import Dashboard from "../../components/Dashboard/Dashboard";
import NotebookKeyValuePair from "../../components/Notebook/NotebookKeyValuePair"

function App() {
  return (
    <Router>
      <div marginTop="100"><Dashboard/></div>
      
    <div className="App">
      <Route path='/' exact component={SignIn}/>
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/signin" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/notebook" exact component={NotebookKeyValuePair}/>

    </div>
    </Router>
  );
}

export default App;
