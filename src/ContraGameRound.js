import _ from "lodash";
import { useEffect, useState } from "react";
import { Row, Col, ListGroup, Button } from "react-bootstrap";
import Countdown from "react-countdown";
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
      playerA: { player, status: i === 0 ? "playing":"pending", score: 0 },
      playerB: { player: players[i + 1] || players[0], status: "pending", score: 0 }, //El ultimo juega contra el primero
      played: function() {
        return this.playerA.status === "played" && this.playerB.status === "played"
      }
    }
    return round;
  });
}

export function ContraGameRound({ players, turnDuration }) {
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
    const newCurrentRound = _.cloneDeep(currentRound);
    const currentPlayer = currentRound.playerA.status === "pending" || currentRound.playerA.status === "playing" ? "playerA" : "playerB";
    newCurrentRound[currentPlayer].status = "played";
    if(currentPlayer === "playerA") {
      newCurrentRound.playerB.status = "playing";
    }
    const updatedRounds = rounds.map(it => it === currentRound ? newCurrentRound : it);
    setRounds(updatedRounds);
  }

  const currentRound = _(rounds).find(it => !it.played());
  const buttonCallback = () => !currentRound ? resetRounds() : setNextRound();
  const buttonText = !currentRound ? "Comenzar" : "Siguiente turno";

  useEffect(setRandomChoice, [])
  if(!currentChoice) return null;
  const currentPlayers = currentRound ? [currentRound.playerA, currentRound.playerB] : [];
  return (
    <Row>
      <Col xs={3}>
        <ListGroup>
          { players.map(({ name, score }) => (
            <ListGroup.Item key={name} style={{backgroundColor: _(currentPlayers).some(it => it.player.name === name) ? "lightblue" : ""}}>
              { name } ({score || 0}) {  _.get(_(currentPlayers).find(it => it.player.name === name), "status") === "playing" && <i className="fa fa-check"></i> }
            </ListGroup.Item>
          )) }
        </ListGroup>
      </Col>

      <Col xs={9}>
        <Row style={{ display: "flex", justifyContent: "center", marginTop: 15 }}>
          {
            currentRound && (
            <div>
              {currentRound.playerA.player.name} vs {currentRound.playerB.player.name}
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
          <Button onClick={buttonCallback}>{ buttonText }</Button>
        </Row>
      </Col>
    </Row>
  );
}
