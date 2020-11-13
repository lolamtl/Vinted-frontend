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
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );

      if (response.data.token) {
        setUser(response.data.token);
        history.push("/");
      } else {
        alert("Aïe!");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h3>Se connecter</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="@"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <br />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <br />
        <button type="submit">Se connecter</button>
        <br />
        <Link to="/signup">Pas encore de compte ? Inscris-toi !</Link>
      </form>
    </div>
  );
};

export default Login;
