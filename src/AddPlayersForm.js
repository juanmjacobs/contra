import { useState } from "react";
import { ListGroup, Form, Row, Col, Button } from "react-bootstrap";

export function AddPlayersForm({ onAllIn }) {
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
      <Row className="justify-content-center" style={{ padding: 15 }}>
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
      <Row>
        <Col md={12}>
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
