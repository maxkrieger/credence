import { useFirestore, useFirestoreDocData } from "reactfire";
import { Game, PlayState, State } from "../data";
import questions from "../questions";

const GameComponent = ({ state }: { state: State }) => {
  const gameRef = useFirestore().collection("games").doc(state.currentGame);
  const { data: game, status } = useFirestoreDocData<Game>(gameRef);
  if (status !== "success") {
    return <div>loading...</div>;
  }
  const playState = game.state as PlayState;
  if (playState.showingScoreboard) {
    return (
      <div>
        <h1>Scoreboard</h1>
        <h2>{playState.currentTime} sec</h2>
      </div>
    );
  }
  if (playState.gameOver) {
    return (
      <div>
        <h1>Game over</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>{questions[playState.currentQuestionIdx].prompt}</h1>
      <h2>{playState.currentTime} sec</h2>
    </div>
  );
};
export default GameComponent;
