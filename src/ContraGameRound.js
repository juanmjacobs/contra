export function ContraGameRound({ players }) {
  return <div>Jugando! {players.map(it => it.name).join(", ")}</div>;
}
