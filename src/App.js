import "./App.css";
import { useState, useCallback } from "react";
import { ListGroup, Form, Row, Col, Button } from "react-bootstrap";

function App() {
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState("");

  const addNewPlayer = (e) => {
    if(newPlayerName) {
      const newPlayers = players.concat({ name: newPlayerName, points: 0 });
      setPlayers(newPlayers);
      setNewPlayerName("");
    }
  }

  return (
    <div className="App">
      <Row style={{padding: 15}}>
        <Col xs={4}>
          </Col>
        <Col xs="auto">
            <Form.Control placeholder="Agregar jugador" value={newPlayerName} onChange={e => setNewPlayerName(e.target.value)}/>
        </Col>
        <Col xs="auto">
          <Button variant="primary" type="submit" onClick={addNewPlayer} className="mb-2"> + </Button>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <ListGroup>
            {players.map(({ name }) => (
              <ListGroup.Item>{name}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row className="justify-content-center" pullRight style={{margin: 15}}>
        <Col xs="auto">
          <Button variant="primary" type="submit" onClick={addNewPlayer} className="mb-2" disabled={players.length < 2}> Estamos todos! </Button>
        </Col>
      </Row>
    </div>
  );
}

export default App;
