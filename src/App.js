import "./App.css";
import { useState } from "react";
import { ContraGameRound } from "./ContraGameRound";
import { AddPlayersForm } from "./AddPlayersForm";
function App() {
  const [ isPlaying, setIsPlaying ] = useState(true);
  const [ players, setPlayers ] = useState([{name:"Juan"}, {name:"Juli"}, {name:"Flor"}, {name:"Mati"}, , {name:"Agos"}]);
  const startPlaying = (somePlayers) => {
    setIsPlaying(true);
    setPlayers(somePlayers)
  }
  if(!isPlaying) return <AddPlayersForm onAllIn={startPlaying}/>
  return <ContraGameRound players={players}></ContraGameRound>
}

export default App;
