import React from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Redirect  } from "react-router-dom";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import Dashboard from "../../components/Dashboard/Dashboard";
import NotebookKeyValuePair from "../../components/Notebook/NotebookKeyValuePair"
=======
import { BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";

import SignIn from "../SignIn";
import SignUp from "../SignUp";
import Dashboard from "../../components/Dashboard";
import Notebook from "../../components/Notebook/Notebook"
import Layout from '../../components/Layout';
import Account from '../../components/Account';
>>>>>>> master

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <Route path='/' exact component={SignIn}/>
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/signin" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/notebook" exact component={NotebookKeyValuePair}/>
=======
          <Router>
            <Switch>
              <Redirect exact from="/" to="/dashboard"/>
              <Route path="/signin" exact component={SignIn} />
              <Route path="/signup" exact component={SignUp} />

              <Route path="/dashboard">
                <Layout>
                  <Dashboard/> 
                </Layout>
              </Route>

              <Route path="/notebook">
                <Layout>
                  <Notebook/> 
                </Layout>
              </Route>

              <Route path="/account">
                <Layout>
                  <Account/>
                </Layout>
              </Route>
>>>>>>> master

            </Switch>
          </Router>
    </div>
  );
}

export default App;
