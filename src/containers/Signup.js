import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username: username,
          email: email,
          password: password,
        }
      );
      console.log(response.data);

      if (response.data.token) {
        setUser(response.data.token);
        history.push("/");
      } else {
        alert("error");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="inscrire">
      <form onSubmit={handleSubmit}>
        <h3> S'inscrire </h3>
        <input
          className="name"
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <br />
        <input
          className="email"
          type="text"
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
        <br />
        <input type="checkbox" />
        <p>S'inscrire à notre newsletter</p>
        <p className="termes">
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Conditions
          <br />
          et Politique de Confidentialité de Vinted. Je confirme avoir au moins
          18 ans.
        </p>
        <input type="submit" value="S'inscrire" />
        <br />
        <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
      </form>
    </div>
  );
};

export default Signup;
