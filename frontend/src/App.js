import React from 'react';
import AppbarAndDrawer from "./components/AppbarAndDrawer";
import { BrowserRouter as Router, Route, Redirect  } from "react-router-dom";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp"

function App() {
  return (
    <Router>
    <div className="App">
      <Route path="/" exact component={AppbarAndDrawer} />
      <Route path="/signin" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
    </div>
    </Router>
  );
}

export default App;
