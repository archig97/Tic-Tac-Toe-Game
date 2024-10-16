import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Header from "./components/Header";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./assets/winning-combinations";
import GameOver from "./components/GameOver";

const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

const PLAYERS = {
  X : 'Player 1',
  O : 'Player 2'
}

function deriveActivePlayer(gameTurns){
  let currentPlayer = "X";

  if(gameTurns.length > 0 && gameTurns[0].player === "X")
    currentPlayer = "O";

  return currentPlayer;
}

function deriveWinner(gameBoard, player){
  let winner;

    for(const combination of WINNING_COMBINATIONS){
      const firstSymbol = gameBoard[combination[0].row][combination[0].column];
      const secondSymbol = gameBoard[combination[1].row][combination[1].column];
      const thirdSymbol = gameBoard[combination[2].row][combination[2].column];

     

      if(firstSymbol!==null && firstSymbol === secondSymbol && firstSymbol === thirdSymbol){
        console.log("Game Over ");
        winner = player[firstSymbol];
      }


    }

    return winner;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...initialGameboard.map(array => [...array])];

    for(const turn of gameTurns){
        const {square, player} = turn;
        const {row, col} = square;
        gameBoard[row][col] = player;
    }

    return gameBoard;
}

function App() {

  
  
 // const [activePlayer, setActivePlayer] = useState('X');
 const [player, setPlayer] = useState(PLAYERS)

 const [gameTurns, setGameTurns] = useState([]); //we are creating an array to store the logs of which player clicked which square - 
  //this would potentially help us to select the winner and provide steps of the game
 const activePlayer = deriveActivePlayer(gameTurns);

 const gameBoard = deriveGameBoard(gameTurns);

 const winner = deriveWinner(gameBoard,player);

 const isDraw = (gameTurns.length === 9 && !winner)

   
  function handleSelectSquare(rowIndex, colIndex){
    //setActivePlayer((currActivePlayer) => (currActivePlayer === 'X' ? 'O' : 'X'));

    setGameTurns((prevTurns) => {

     const currentPlayer = deriveActivePlayer(prevTurns);

      //in updated array, we have to add the already available prevTurns elements and then add the new updated information also from the square that was just clicked
      const updatedTurns = [{square : {row : rowIndex, col : colIndex}, player : currentPlayer},...prevTurns];

      return updatedTurns;
    })
  }

  function resetGameBoard(){
    setGameTurns([]);
    
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayer(prevPlayers => {return{...prevPlayers, [symbol] : newName}});
  }

  return (
    <main>
      <Header />
      <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player initialPlayerName={PLAYERS.X} playerSymbol="X" isActive={activePlayer === 'X'} onNameChange={handlePlayerNameChange}/> 
        {/* if you try to edit one instance the other will not be affected at all */}
         {/* component instances work in isolation */}
        <Player initialPlayerName={PLAYERS.O} playerSymbol="O" isActive={activePlayer === 'O'} onNameChange={handlePlayerNameChange}/>
      </ol>
     {(winner || isDraw) && <GameOver winner={winner} resetBoard={resetGameBoard}/>}
      <GameBoard onSelectSquare={handleSelectSquare} board = {gameBoard}/>
     </div>

     <Log turns={gameTurns}/>
    </main>
  )
}

export default App
