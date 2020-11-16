import React, { useState } from "react";
import axios from "axios";

import Cookie from "js-cookie";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [marque, setMarque] = useState("");
  const [taille, setTaille] = useState("");
  const [color, setColor] = useState("");
  const [token, setToken] = useState(Cookie.get("userToken") || null);

  const formData = new FormData();
  formData.append("picture", file);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("condition", condition);
  formData.append("city", city);
  formData.append("brand", marque);
  formData.append("size", taille);
  formData.append("color", color);

  // console.log(formData);

  Cookie.get("userToken");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        " https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="containersale">
      <form className="carré" onSubmit={handleSubmit}>
        <p className="varticle">Vends ton article</p>
        <div className="newpicture">
          <input
            className="photo"
            // multiple={true}

            type="file"
            onChange={(event) => {
              // console.log(event.target.files);
              setFile(event.target.files[0]);
            }}
          />
        </div>
        <br />
        <div className="containerbox">
          <div className="box">
            <p className="obj">Titre</p>
            <input
              className="input1"
              type="text"
              value={title}
              placeholder="ex: Chaussures blanche"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <br />
          <div className="box2">
            <p className="obj">Décris ton article</p>
            <input
              className="input2"
              type="text"
              placeholder="ex: Jamais porté, très agréable "
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
        </div>
        <br />
        <div className="containerbox">
          <div className="box">
            <p className="obj">Etat</p>
            <input
              className="input1"
              type="text"
              value={condition}
              placeholder="Neuve avec la boite d'origin"
              onChange={(event) => {
                setCondition(event.target.value);
              }}
            />
          </div>
          <br />
          <div className="box">
            <p className="obj">Lieu</p>
            <input
              className="input1"
              type="text"
              placeholder="ex: Toulouse"
              value={city}
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
          </div>
          <br />
          <div className="box">
            <p className="obj">Marque</p>
            <input
              className="input1"
              type="text"
              placeholder="ex: Zara"
              value={marque}
              onChange={(event) => {
                setMarque(event.target.value);
              }}
            />
          </div>

          <br />
          <div className="box">
            <p className="obj">Taille</p>
            <input
              className="input1"
              type="text"
              placeholder="ex: L/40/12"
              value={taille}
              onChange={(event) => {
                setTaille(event.target.value);
              }}
            />
          </div>
          <br />
          <div className="box">
            <p className="obj">Couleur</p>
            <input
              className="input1"
              type="text"
              placeholder="ex: Blanche"
              value={color}
              onChange={(event) => {
                setColor(event.target.value);
              }}
            />
          </div>
        </div>
        <br />
        <div className="containerbox">
          <div className="box">
            <p className="obj">Prix</p>
            <div className="chekbox1">
              <input
                className="input3"
                type="text"
                placeholder="0,00 €"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
              <div className="checkbox2">
                <input className="click" type="checkbox" />
                <p className="interessé">
                  Je suis intéressé(e) par les échanges
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="ajouter">
          <button className="ajouter2" type="submit">
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
};

export default Publish;
