import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const login = async () => {
    let data = { password: "test1234", email: "arnaud@gmail.com" };
    let options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({ "Content-Type": "application/json" }),
    };

    let reponse = await fetch("http://localhost:8080/connexion", options);

    let donnes = await reponse.json();

    console.log(donnes);
    // Enregistrement du token dans le localStorage
    localStorage.setItem("token", donnes.token);
  };
  const getContact = async () => {
    // Récupération du token dans le localStorage
    let token = localStorage.getItem("token");
    let options = {
      method: "GET",

      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }),
    };

    let reponse = await fetch("http://localhost:8080/contact", options);

    let donnes = await reponse.json();

    console.log(donnes);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <button onClick={login}>CREE UN CONTACT</button>
        <button onClick={getContact}>RECUPERER MES CONTACTS</button>
      </header>
    </div>
  );
}

export default App;
