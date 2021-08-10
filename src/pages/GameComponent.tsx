import {
  useFirestore,
  useFirestoreCollectionData,
  useFirestoreDocData,
} from "reactfire";
import Mcq from "../components/Mcq";
import NumEstimate from "../components/NumEstimate";
import { Game, Member, PlayState, State } from "../data";
import questions from "../questions";

const GameComponent = ({ state }: { state: State }) => {
  const gameRef = useFirestore().collection("games").doc(state.currentGame);
  const membersRef = gameRef.collection("members");
  const memberRef = membersRef.doc(state.self.uid);
  const { status, data: game } = useFirestoreDocData<Game>(gameRef);
  const { status: memberStatus, data: members } =
    useFirestoreCollectionData<Member>(membersRef);
  if (status !== "success" || memberStatus !== "success") {
    return <div>loading...</div>;
  }
  const playState = game.state as PlayState;
  const question = questions[playState.questions[playState.currentQuestionIdx]];
  if (playState.showingScoreboard) {
    return (
      <div>
        <h1>Scoreboard</h1>
        <h2>{playState.currentTime} sec</h2>
        {members.map((member) => (
          <div key={member.uid}>
            {member.name}: {member.score}
          </div>
        ))}
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
      <h1>{question.prompt}</h1>
      <h2>{playState.currentTime} sec</h2>
      {question.solution.type === "num" ? (
        <NumEstimate memberRef={memberRef} question={question} />
      ) : (
        <Mcq memberRef={memberRef} question={question} />
      )}
    </div>
  );
};
export default GameComponent;
