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
        "https://vinted-back-end.herokuapp.com/user/signup",
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
        <p className="titlesignup"> S'inscrire </p>
        <div className="tripleinput">
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
        </div>
        <br />
        <div className="newsletter">
          <div className="accepte">
            <input className="checkbox" type="checkbox" />
            <p
              className="textnewsletter
          "
            >
              S'inscrire à notre newsletter
            </p>
          </div>
          <p className="termes">
            En m'inscrivant je confirme avoir lu et accepté <br />
            les Termes & Conditions et Politique <br />
            de Confidentialité de Vinted. <br />
            Je confirme avoir au moins 18 ans.
          </p>
        </div>
        <input className="inscription" type="submit" value="S'inscrire" />
        <br />
        <Link className="gologin" to="/login">
          Tu as déjà un compte ? Connecte-toi !
        </Link>
      </form>
    </div>
  );
};

export default Signup;
