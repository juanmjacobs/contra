import "./App.css";
import { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { ContraGameRound } from "./ContraGameRound";
import { AddPlayersForm } from "./AddPlayersForm";
function ContraNavbar({ isPlaying, restartGame }) {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Contra</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            { isPlaying && <a href="/#" onClick={e =>{e.preventDefault(); restartGame()} }>Reiniciar</a>}
          </Nav>
        </Navbar.Collapse>
      </Container>
  </Navbar>
  );
}
function Layout({ isPlaying, restartGame, children }) {
  return (
    <>
    <ContraNavbar isPlaying={isPlaying} restartGame={restartGame}/>
    <div style={{padding: 15}}>
      {children}
    </div>
    </>);
}
function App() {
  const [ isPlaying, setIsPlaying ] = useState(true);
  const [ turnDuration, setTurnDuration ] = useState(2);
  const [ players, setPlayers ] = useState([{name:"Juan"}, {name:"Juli"}, {name:"Flor"}, {name:"Mati"}, {name:"Agos"}]);
  const startPlaying = (somePlayers) => {
    setIsPlaying(true);
    setPlayers(somePlayers)
  }
  const restartGame = () => {
    if(window.confirm("¿Quieres volver a iniciar el juego con nuevos jugadores?")) {
      setIsPlaying(false);
    }
  }
  
  const currentView = isPlaying ? <ContraGameRound players={players} turnDuration={turnDuration}/> : <AddPlayersForm onAllIn={startPlaying} turnDuration={turnDuration} setTurnDuration={setTurnDuration}/>;
  
  return (
    <Layout isPlaying={isPlaying} restartGame={restartGame}>
      {currentView}
    </Layout>
  )
}

export default App;
