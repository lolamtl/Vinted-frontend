import React, { useState } from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./containers/Home";
import Product from "./containers/Product";
import Header from "./components/Header";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Cookie from "js-cookie";

export default function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/product/:id">
          <Product />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
