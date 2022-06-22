import { useState } from "react";
import { ListGroup, Form, Row, Col, Button } from "react-bootstrap";

export function AddPlayersForm({ onAllIn, turnDuration,setTurnDuration }) {
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const addNewPlayer = (e) => {
    e.preventDefault();
    if (newPlayerName) {
      const newPlayers = players.concat({ name: newPlayerName, points: 0 });
      setPlayers(newPlayers);
      setNewPlayerName("");
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="turnDuration">
            <Form.Label>Duración del turno (min)</Form.Label>
            <Form.Control pla ceholder="Agregar jugador" type="number" min={0} value={turnDuration} onChange={e => setTurnDuration(parseInt(e.target.value))} />
          </Form.Group>
        </Col>  
      </Row>
      <Row className="justify-content-center" style={{ padding: 15 }}>
        <Row>
          <Form onSubmit={addNewPlayer}>
            <Row>
              <Col xs="auto">
                <Form.Control placeholder="Agregar jugador" value={newPlayerName} onChange={e => setNewPlayerName(e.target.value)} />
              </Col>
              <Col xs="auto">
                <Button variant="primary" type="submit" className="mb-2"> + </Button>
              </Col>
            </Row>
          </Form>
        </Row>
      </Row>
      <Row>
        <Col xs="auto">
          <ListGroup>
            {players.map(({ name }) => (
              <ListGroup.Item key={name}>{name}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>

      <Row className="justify-content-center" style={{ margin: 15 }}>
        <Col xs="auto">
          <Button variant="primary" type="submit" onClick={() => onAllIn(players)} className="mb-2" disabled={players.length < 2}> Estamos todos! </Button>
        </Col>
      </Row>
    </div>
  );
}
