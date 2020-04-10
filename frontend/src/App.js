import React from 'react';
import MiniDrawer from "./components/layout/MiniDrawer";
import { BrowserRouter as Router, Route, Redirect  } from "react-router-dom";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp"

function App() {
  return (
    <Router>
    <div className="App">
      <Route path="/" exact component={MiniDrawer} />
      <Route path="/signin" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
    </div>
    </Router>
  );
}

export default App;
