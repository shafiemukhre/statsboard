import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";

import SignIn from "../SignIn";
import SignUp from "../SignUp";
import Dashboard from "../../components/Dashboard";
import Notebook from "../../components/Notebook/Notebook"
import Layout from '../../components/Layout';
import Account from '../../components/Account';
import NotebookKeyValuePair from '../../components/Notebook/KeyValuePair';
import { loginContext, userContext, roleContext, languageContext } from '../../store';
import Cookies from 'js-cookie'
import UserList from '../../components/UserList/UserList';

function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useContext(loginContext)
  const [username, setUsername] = useContext(userContext)
  const [role, setRole] = useContext(roleContext)
  const [language, setLanguage] = useContext(languageContext)

  function readCookie(){
    const isLoggedIn = Cookies.get('isLoggedIn')
    const user = Cookies.get('username')
    const role = Cookies.get('role')
    const language = Cookies.get('language')
    if (user){
      setIsLoggedIn(true)
      setUsername(user)
      setRole(role)
      setLanguage(language)
      return true
    } else {
      return false
    }
  }

  useEffect(() => {
    readCookie()
  },[username, role, language, isLoggedIn])

  return (
    <div className="App">
          <Router>
            <Switch>
              {/* REDIRECT */}
              {/* do not allow user to signin and signup when logged in */}
              {/* TODO: doesn't work */}
            {() => {
              if (isLoggedIn && role === 'analyst'){
                return (
                  <Redirect exact from="/signin" to="/dashboard"/>
                )
              } else if (isLoggedIn && role === 'manager'){
                return(
                  <Redirect exact from="/signin" to="/users"/>
                )
              }
            }}
              <Redirect exact from="/" to="/signin"/>

              {/* ROUTES */}
              <Route path="/signin" exact component={SignIn} />
              <Route path="/signup" exact component={SignUp} />
              <Route path="/dashboard">
                <Layout>
                  <Dashboard/> 
                </Layout>
              </Route>
              <Route path="/users">
                <Layout>
                  <UserList/>
                </Layout>
              </Route>
              <Route path="/account">
                <Layout>
                  <Account/>
                </Layout>
              </Route>

              {/* TODO: add noteebook feature in the future */}
              {/* <Route path="/notebook">
                <Layout>
                  <Notebook/>
                  <NotebookKeyValuePair/>
                </Layout>
              </Route> */}

            </Switch>
          </Router>
    </div>
  );
}

export default App;
