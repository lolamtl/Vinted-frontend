import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./containers/Home";
import Product from "./containers/Product";

export default function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      "https://lereacteur-vinted-api.herokuapp.com/offers"
    );
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <p>Chargement ...</p>
  ) : (
    <Router>
      <Switch>
        <Route path="/product">
          <Product />
        </Route>
        <Route path="/">
          <Home data={data} />
        </Route>
      </Switch>
    </Router>
  );
}
