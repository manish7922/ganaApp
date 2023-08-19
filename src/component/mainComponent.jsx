import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import React, { Component } from 'react'
// Route, Switch, Redirect
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./navbar";
import authServices from "../services/authServices";
import Logout from "./logout";
import Home from "./home";
import AllTrendingSongs from "./allTrendingSongs";
import BottomPlayer from "./bottomPlayer";

export default class MainComponent extends Component {
  render() {
    let user = authServices.getToken();
    console.log(user);
    return (
        <div>
      <Navbar user={user} />
      <div className="">
      <Switch>
   
   <Route path="/logout" Component={Logout}  />
   <Route
               path="/gana/:id"
              render={(props) => <BottomPlayer {...props}  />}
            />
   {/* <Route path="/home" Component={Home} /> */}
   {/* <Route path="/songs"  Component={AllTrendingSongs}  /> */}
   <Route path="/songs" render={(props) => <AllTrendingSongs {...props} />} />
   <Route path="/home" render={(props) => <Home {...props} />} />
   <Redirect form="/" to="/home" />
      </Switch>
      </div>
      </div>
    )
  }
}
