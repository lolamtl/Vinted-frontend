import React from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <img alt="logo" src={Logo} />
      </Link>
      <div>
        <input search></input>
        <button>s'inscrire</button>
        <button>s'identifier</button>
        <button>Vends tes articles</button>
      </div>
    </div>
  );
};

export default Header;
