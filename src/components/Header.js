import React from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = ({ token, setUser }) => {
  return (
    <div className="header">
      <Link to="/">
        <img className="logo" alt="logo" src={Logo} />
      </Link>
      <input
        className="search"
        type="search"
        placeholder="Recherche des articles"
      ></input>

      {token ? (
        <button
          onClick={() => {
            setUser(null);
          }}
        >
          Se déconnecter
        </button>
      ) : (
        <div className="submit">
          <Link className="signup" to="/signup">
            S'inscrire{" "}
          </Link>
          <Link className="login" to="/login">
            {" "}
            S'identifier
          </Link>
        </div>
      )}
      <button className="vendre">Vends tes articles</button>
    </div>
  );
};

export default Header;
