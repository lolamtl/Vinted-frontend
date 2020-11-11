import React from "react";
import Logo from "../assets/logo.png";

const Header = () => {
  return (
    <div className="header">
      <img alt="logo" src={Logo} />
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
