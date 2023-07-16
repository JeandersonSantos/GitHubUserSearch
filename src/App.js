import React, { useState, useEffect } from "react";
import "./App.css";
import githubLogo from "./img/github-logo.png";

const App = () => {
  const [dataApi, setDataApi] = useState({});
  const [nameProfile, setNameProfile] = useState("");
  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");

  useEffect(() => {
    setColor1(getRandomColor());
    setColor2(getRandomColor());
  }, [setColor1, setColor2]);

  async function search(profile) {
    const response = await fetch(`https://api.github.com/users/${profile}`);
    const jsonData = await response.json();
    return setDataApi(jsonData);
  }

  const handleOnchange = (evt) => {
    setNameProfile(evt.target.value);
  };
  const handleSearch = (evt) => {
    evt.preventDefault();
    if (nameProfile.trim() !== "") {
      search(nameProfile);
    }
  };
  const handleBack = () => {
    setDataApi({});
  };
  const renderForm = () => (
    <div className="homeScreen">
      <img className="imgLogo" src={githubLogo} alt="logo" />
      <form className="formSearch" onSubmit={handleSearch}>
        <input
          className="searchProfile"
          required
          autoFocus
          placeholder="Digite o usuário do Git"
          onChange={handleOnchange}
        />
        <button className="buttonSearch" type="submit">
          Buscar
        </button>
      </form>
    </div>
  );
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  return (
    <div
      className="App"
      style={{ background: `linear-gradient(to bottom, ${color1}, ${color2})` }}
    >
      {Object.keys(dataApi).length === 0 ? (
        renderForm()
      ) : (
        <div className="container">
          <button className="buttonBack" onClick={handleBack}>
            Voltar
          </button>
          <div className="container-result">
            <img
              className="imageProfile"
              src={dataApi.avatar_url}
              alt="profile"
            />
            <div className="nameProfile">
              <div className="profile-animation">{dataApi.name}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
