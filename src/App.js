import './App.css';
import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";

import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";

function App() {
  let [showSideNavBar, setSideNavBar] = useState(false);
  const onLogout = () => {
      setSideNavBar(false);
  }
  return (
      <Router basename="/fpe">
          <div className="large-sidebar fixed-sidebar fixed-header">
              <div className="wrapper">
                  {/*<div className="preloader"></div>*/}
                  <Sidebar visible={showSideNavBar}/>
                  <Navbar onLogout={onLogout} visible={showSideNavBar}/>
                    <Switch>
                        <Route path="/login">
                            <Login onSuccess={() => setSideNavBar(true)} navSidebarToggler={() => setSideNavBar(false)}/>
                        </Route>
                        <PrivateRoute navSidebarToggler={() => setSideNavBar(true)} path="/" component={Dashboard}/>
                    </Switch>
              </div>
          </div>
      </Router>
  );
}

export default App;
