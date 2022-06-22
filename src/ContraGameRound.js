import _ from "lodash";
import { useEffect, useState } from "react";
import { Row, Col, ListGroup, Button } from "react-bootstrap";
import choices from "./choices";

function ChoiceCard({ choiceOption }) {
  return (
    <ListGroup>
      <ListGroup.Item>
        <div style={{ minHeight: 300, display: "flex", justifyContent: "center", alignItems: "center"}}>
          {choiceOption}
        </div>
      </ListGroup.Item>
    </ListGroup>
  )
}
const generateInitialRounds = (players) => {
  return players.map((player, i) => {
    const round = {
      playerA: player,
      playerB: players[i + 1] || players[0], //El ultimo juega contra el primero
      playerAScore: 0,
      playerBScore: 0,
      played: false,
    }
    return round;
  });
}

export function ContraGameRound({ players }) {
  const [currentChoice, setCurrentChoice] = useState(null);
  const initialRounds = generateInitialRounds(players);
  const [rounds, setRounds] = useState(initialRounds);
  const setRandomChoice = () => {
    setCurrentChoice(_.sample(choices))
  }
  const resetRounds = () => {
    setRounds(initialRounds)
  }
  const setNextRound = () => {
    const updatedRounds = rounds.map(it => it === currentRound ? { currentRound, played: true }: it);
    setRounds(updatedRounds);
  }

  const currentRound = _(rounds).find(it => !it.played);
  
  useEffect(setRandomChoice)
  if(!currentChoice) return null;
  return (
    <Row>
      <Col xs={3}>
        <ListGroup>
          { players.map(({ name, score }) => (
            <ListGroup.Item>
              { name } ({score || 0})
            </ListGroup.Item>
          )) }
        </ListGroup>
      </Col>

      <Col xs={9}>
        <Row style={{ display: "flex", justifyContent: "center", marginTop: 15 }}>
          {
            currentRound && (
            <div>
              {currentRound.playerA.name} vs {currentRound.playerB.name}
            </div>
          )}
        </Row>

        <Row style={{ display: "flex", justifyContent: "center", marginTop: 15 }}>
          <Button variant="default" onClick={setRandomChoice}><i className="fa fa-refresh"></i></Button>
        </Row>
        <Row>
          <Col xs={6}>
            <ChoiceCard choiceOption={currentChoice.firstChoice}/>
          </Col>
          <Col xs={6}>
            <ChoiceCard choiceOption={currentChoice.secondChoice}/>
          </Col>
        </Row>
        <Row style={{ display: "flex", justifyContent: "right", margin: 15 }}>
          <Button onClick={() => !currentRound ? resetRounds() : setNextRound()}>{ !currentRound ? "Comenzar" : "Siguiente turno" }</Button>
        </Row>
      </Col>
    </Row>
  );
}
