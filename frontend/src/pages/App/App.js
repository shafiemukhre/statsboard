import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";

import SignIn from "../SignIn";
import SignUp from "../SignUp";
import Dashboard from "../../components/Dashboard";
import Notebook from "../../components/Notebook/Notebook"
import Layout from '../../components/Layout';
import Account from '../../components/Account';
import NotebookKeyValuePair from '../../components/Notebook/KeyValuePair';
import { loginContext, userContext } from '../../store';
import Cookies from 'js-cookie'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useContext(loginContext)
  const [username, setUsername] = useContext(userContext)

  function readCookie(){
    const user = Cookies.get('username')
    if (user){
      setIsLoggedIn(true)
      setUsername(user)
      return true
    } else {
      setIsLoggedIn(false)
      return false
    }
  }

  useEffect(() => {
    readCookie()
  },[username])

  return (
    <div className="App">
          <Router>
            <Switch>
              { isLoggedIn ? <Redirect exact from="/" to="/dashboard"/> : 
                  <Redirect exact from="/" to="/signin"/> 
                }
              {/* TODO: add session */}

              { isLoggedIn ? <Redirect exact from="/signin" to="/dashboard"/> : 
                  <Redirect exact from="/dashboard" to="/signin"/> 
                }
              <Route path="/signin" exact component={SignIn} />
              <Route path="/signup" exact component={SignUp} />

              <Route path="/dashboard">
                <Layout>
                  <Dashboard/> 
                </Layout>
              </Route>

              <Route path="/notebook">
                <Layout>
                  {/* <Notebook/> */}
                  <NotebookKeyValuePair/>
                </Layout>
              </Route>

              <Route path="/account">
                <Layout>
                  <Account/>
                </Layout>
              </Route>

            </Switch>
          </Router>
    </div>
  );
}

export default App;
