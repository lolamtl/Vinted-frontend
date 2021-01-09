import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = ({ token, setUser }) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://vinted-back-end.herokuapp.com/offers"
        );
        setData(response.data);
        // console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Chargement ...</p>
  ) : (
    <div className="header">
      <Link to="/">
        <img className="logo" alt="logo" src={Logo} />
      </Link>
      <input
        className="search"
        type="search"
        placeholder="Recherche des articles"
        onChange={(event) => setSearch({ search: event.target.value })}
      />
      {/* {data.offers
        .filter((val) => {
          if (search === "") {
          } else if (
            val.product_name.toLowerCase().includes(search.toLowerCase)
          ) {
            return val.product_name;
          }
        })
        .map((val, index) => {
          return (
            <div key={index}>
              <p>{val.product_name}</p>
            </div>
          );
        })} */}

      {token ? (
        <button
          className="deconnect"
          onClick={() => {
            setUser(null);
          }}
        >
          Se déconnecter
        </button>
      ) : (
        <div className="submit">
          <Link className="signup" to="/signup">
            S'inscrire
          </Link>
          <Link className="login" to="/login">
            S'identifier
          </Link>
        </div>
      )}
      <Link className="vendre" to={token ? "/publish" : "/login"}>
        Vends tes articles
      </Link>
    </div>
  );
};

export default Header;
