import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  // Création d'une variable d'état
  const [allContact, setAllContact] = useState();

  // FONCTION GET CONTACT
  // GET CONTACT
  const getContact = async () => {
    let options = {
      method: "GET",
    };
    let response = await fetch(
      "http://localhost:8080/contact/get-all-contact",
      options
    );

    let donnees = await response.json();

    // Introduction de donnees a l'interieur de la variable d'état allContact
    setAllContact(donnees);
  };
  // POST ADD CONTACT
  const addContact = async () => {
    let data = {
      name: "",
      firstName: "Benoit",
      email: "Benoit@gmail.com",
      message: "je suis un message de HB",
    };

    let options = {
      // Méthode utilisé
      method: "POST",
      // Précision de la nature des données envoyées
      headers: new Headers({ "Content-Type": "application/json" }),
      // Données envoyées (stocké dans la variable data)
      body: JSON.stringify(data),
    };

    let response = await fetch(
      "http://localhost:8080/contact/post-contact",
      options
    );

    let donnees = await response.json();

    alert(donnees.message);
  };

  // Au chargement de la page je déclenche ma fonction getContact
  useEffect(() => {
    getContact();
  }, []);

  // A chaque changement de ma variable d'état allContact ce useEffect se redéclenche
  useEffect(() => {
    // console.log(allContact.data);
  }, [allContact]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <button onClick={addContact}>CREE UN CONTACT</button>
      </header>
    </div>
  );
}

export default App;
