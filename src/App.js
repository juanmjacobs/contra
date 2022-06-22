import "./App.css";
import { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { ContraGameRound } from "./ContraGameRound";
import { AddPlayersForm } from "./AddPlayersForm";
function ContraNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Contra</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          </Nav>
        </Navbar.Collapse>
      </Container>
  </Navbar>
  );
}
function Layout({ children }) {
  return (
    <>
    <ContraNavbar/>
    <div style={{padding: 15}}>
      {children}
    </div>
    </>);
}
function App() {
  const [ isPlaying, setIsPlaying ] = useState(true);
  const [ players, setPlayers ] = useState([{name:"Juan"}, {name:"Juli"}, {name:"Flor"}, {name:"Mati"}, {name:"Agos"}]);
  const startPlaying = (somePlayers) => {
    setIsPlaying(true);
    setPlayers(somePlayers)
  }
  
  const currentView = isPlaying ? <ContraGameRound players={players}/> : <AddPlayersForm onAllIn={startPlaying}/>;
  
  return (
    <Layout>
      {currentView}
    </Layout>
  )
}

export default App;
