import React, { useState } from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./containers/Home";
import Product from "./containers/Product";
import Header from "./components/Header";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Cookie from "js-cookie";
import Publish from "./containers/Publish";

export default function App() {
  const [token, setToken] = useState(Cookie.get("userToken") || null);
  const setUser = (tokenToSet) => {
    if (tokenToSet) {
      Cookie.set("userToken", tokenToSet);
      setToken(tokenToSet);
    } else {
      Cookie.remove("userToken");
      setToken(null);
    }
  };
  return (
    <Router>
      <Header token={token} setUser={setUser} />
      <Switch>
        <Route path="/product/:id">
          <Product />
        </Route>
        <Route path="/signup">
          <Signup setUser={setUser} />
        </Route>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route path="/publish">
          <Publish token={token} />
        </Route>
        <Route path="/">
          <Home token={token} setUser={setUser} />
        </Route>
      </Switch>
    </Router>
  );
}
