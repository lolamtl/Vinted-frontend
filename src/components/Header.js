import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import "../components/Header.css";

const Header = ({ token, setUser }) => {
  const [search, setSearch] = useState("");

  return (
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
