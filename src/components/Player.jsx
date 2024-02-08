import React, { useState } from "react";

export const Player = ({ initialName, symbol, isActive, onNameChange }) => {
  const [isEditing, setisEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName)

  function handleEditClick() {
    setisEditing(editing => !editing);
    if(isEditing){
      onNameChange(symbol, playerName);
    }
  }

  function handleChange(event){
    setPlayerName(event.target.value);
  }

  let editableName =
    (!isEditing && <span className="player-name">{playerName}</span>) ||
    (isEditing && <input value={playerName} required type="text" onChange={handleChange}/>);

  return (
    <li className={isActive ? "active":undefined}>
      <span className="player">
        {editableName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing?"Save":"Edit"}</button>
    </li>
  );
};
