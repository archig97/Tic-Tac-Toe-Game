//show game over screen and give option to restart game

export default function GameOver({winner, resetBoard}){



    return(
        <div id="game-over">
            <h1>GAME OVER!</h1>
            {winner && <p>{winner} WON!!</p>}
            {!winner && <p>IT IS A DRAW!</p>}
            <button onClick={resetBoard}>REMATCH!!</button>
        </div>
    )

}