import _ from "lodash";
import { useEffect, useState } from "react";
import { Row, Col, ListGroup, Button, ListGroupItem } from "react-bootstrap";
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
      </Col>
    </Row>
  );
}
