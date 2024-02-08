import React from "react";

export const Log = ({ turns = [] }) => {
  return (
    <>
      <h1>LOGS</h1>
      <ol id="log">
        {turns.map((t) => (
          <li key={`${t.square.row}${t.square.col}`}>
            Player: {t.player} selected: {t.square.row},{t.square.col}
          </li>
        ))}
      </ol>
    </>
  );
};
