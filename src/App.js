import React, { useState } from "react";
import "./App.css";

function App() {
  const [dataApi, setDataApi] = useState({});
  const [nameProfile, setNameProfile] = useState("");

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
  return (
    <div className="App">
      <form onSubmit={handleSearch}>
        <input
          required
          placeholder="Digite o usuário do Git"
          onChange={handleOnchange}
        ></input>
        <button type="submit">Buscar</button>
      </form>
      <div className="nameProfile">{dataApi.name}</div>
      <div className="imageProfile">
        <img src={dataApi.avatar_url} />
      </div>
    </div>
  );
}

export default App;
