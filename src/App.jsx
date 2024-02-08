import { useState } from "react";
import { GameBoard } from "./components/GameBoard";
import { Log } from "./components/Log";
import { Player } from "./components/Player";
import { WINNING_COMBINATIONS } from "./winning_combinations.js";
import { GameOver } from "./components/GameOver.jsx";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

function deriveCurrentPlayer(turns) {
  let currentPlayer = "X";
  if (turns.length > 0 && turns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveWinner(gameBoard, playerNames) {
  let winner = undefined;

  for (const comb of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[comb[0].row][comb[0].column];
    const secondSymbol = gameBoard[comb[1].row][comb[1].column];
    const thirdSymbol = gameBoard[comb[2].row][comb[2].column];

    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    ) {
      winner = playerNames[firstSymbol];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((r) => [...r])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function App() {
  const [playerNames, setPlayerNames] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const currentPlayer = deriveCurrentPlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, playerNames);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveCurrentPlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRematch() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayerNames((prevNames) => {
      return {
        ...prevNames,
        [symbol]: newName,
      };
    });
  }

  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              initialName={PLAYERS.X}
              symbol="X"
              isActive={"X" === currentPlayer}
              onNameChange={handlePlayerNameChange}
            />
            <Player
              initialName={PLAYERS.O}
              symbol="O"
              isActive={"O" === currentPlayer}
              onNameChange={handlePlayerNameChange}
            />
          </ol>
          {(winner || hasDraw) && (
            <GameOver winner={winner} onRematch={handleRematch} />
          )}
          <GameBoard
            gameBoard={gameBoard}
            onSelectSquare={handleSelectSquare}
          />
        </div>
        <Log turns={gameTurns} />
      </main>
    </>
  );
}

export default App;
