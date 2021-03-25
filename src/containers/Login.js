import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://vinted-back-end.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        setUser(response.data.token);
        history.push("/");
      } else {
        <p>Il manque un truc</p>;
      }
    } catch (error) {
      console.log(error.response);
      alert(
        "Vous n'avez pas encore de compte chez nous ? passer à l'inscription"
      );
      history.push("/signup");
    }
  };

  return (
    <div className="inscrire">
      <form onSubmit={handleSubmit}>
        <p className="titlesignup">Se connecter</p>
        <div className="tripleinput">
          <input
            className="email"
            type="email"
            placeholder="@"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <br />
          <input
            className="code"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <br />
        <button className="inscription" type="submit">
          Se connecter
        </button>

        <br />
        <Link className="gologin" to="/signup">
          Pas encore de compte ? Inscris-toi !
        </Link>
      </form>
    </div>
  );
};

export default Login;
