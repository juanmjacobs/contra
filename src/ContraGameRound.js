import _ from "lodash";
import { useEffect, useState } from "react";
import { Row, Col, ListGroup, Button } from "react-bootstrap";
import choices from "./choices";

function ChoiceCard({ choiceOption }) {
  return (
    <ListGroup>
      <ListGroup.Item>
        {choiceOption}
      </ListGroup.Item>
    </ListGroup>
  )
}
export function ContraGameRound({ players }) {
  const [currentChoice, setCurrentChoice] = useState(null);
  const setRandomChoice = () => {
    setCurrentChoice(_.sample(choices))
  }
  useEffect(setRandomChoice)
  console.log("currentChoice",currentChoice)
  if(!currentChoice) return null;
  return (
    <>
      <div>Jugando! {players.map(it => it.name).join(", ")}</div>
      <Row>
        <Col xs={6}>
          <ChoiceCard choiceOption={currentChoice.firstChoice}/>
        </Col>
        <Col xs={6}>
          <ChoiceCard choiceOption={currentChoice.secondChoice}/>
        </Col>
      </Row>
      <Row>
        <Button onClick={setRandomChoice}><i className="fa fa-refresh"></i></Button>
      </Row>
    </>
  );
}
