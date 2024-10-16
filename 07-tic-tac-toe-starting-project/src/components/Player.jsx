
import { useState } from "react";

export default function Player({initialPlayerName, playerSymbol, isActive, onNameChange}){


    
    const [isEditing, setIsEditing] = useState(false);
    const [givenButtonText, setButtonText] = useState("Edit");
    const [playerName, setPlayerName] = useState(initialPlayerName);

    let playerNameField = <span className="player-name">{playerName}</span>;

    function handleChange(event){
        console.log(event);
        setPlayerName(event.target.value);
        
    }


    if(isEditing){
        playerNameField = <input type="text" required value = {playerName} onChange = {handleChange}/>;
    }
    

    function handleEditClick(){
     setIsEditing(editing => !editing); 
        if(givenButtonText==="Edit")
            setButtonText("Save");
        else if(givenButtonText==="Save")
            setButtonText("Edit");
        if(isEditing){
            onNameChange(playerSymbol, playerName);
        }
    }

    return(<li className={isActive ? 'active' : undefined}>
        <span className="player">
          {playerNameField}
          <span className="player-symbol">{playerSymbol}</span>
          </span>
          <button onClick={handleEditClick}>{givenButtonText}</button>
          </ li>
    );
}