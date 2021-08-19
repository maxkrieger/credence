import { orderBy } from "lodash";
import { useEffect } from "react";
import {
  useFirestore,
  useFirestoreCollectionData,
  useFirestoreDocData,
} from "reactfire";
import Mcq from "../components/Mcq";
import NumEstimate from "../components/NumEstimate";
import { Dispatch, Game, Member, PlayState, ScreenState, State } from "../data";
import { getDelta } from "../state";

const GameComponent = ({
  state,
  dispatch,
}: {
  state: State;
  dispatch: Dispatch;
}) => {
  const gameRef = useFirestore().collection("games").doc(state.currentGame);
  const membersRef = gameRef.collection("members");
  const memberRef = membersRef.doc(state.self.uid);
  const { status, data: game } = useFirestoreDocData<Game>(gameRef);
  const { status: memberStatus, data: members } =
    useFirestoreCollectionData<Member>(membersRef);
  useEffect(() => {
    if (game.state.type === "lobby") {
      dispatch({ type: "SET_SCREEN", state: ScreenState.LOBBY });
    }
  }, [game, dispatch]);
  if (status !== "success" || memberStatus !== "success") {
    return <div>loading...</div>;
  }
  if (game.state.type !== "play") {
    return <div />;
  }

  const playState = game.state as PlayState;
  const question = playState.questions[playState.currentQuestionIdx];
  const sortedMembers = orderBy(members, "score", "desc");
  if (playState.showingScoreboard || playState.gameOver) {
    return (
      <div>
        {playState.gameOver && <h1>Game Over, {sortedMembers[0].name} wins</h1>}
        <h1>Scoreboard</h1>
        <h2>
          correct answer was{" "}
          {question.solution.type === "mcq"
            ? question.solution.options[question.solution.answer]
            : question.solution.answer}
        </h2>
        <h2>{playState.currentTime} sec</h2>
        {sortedMembers.map((member) => (
          <div key={member.uid} style={{ margin: "1em" }}>
            {member.name}: {Math.round(member.score)}{" "}
            <span
              style={{
                color:
                  getDelta(question, member) > 0
                    ? "rgb(159, 255, 159)"
                    : "#ff8856",
              }}
            >
              ({getDelta(question, member) > 0 && "+"}
              {Math.round(getDelta(question, member))})
            </span>
          </div>
        ))}
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
