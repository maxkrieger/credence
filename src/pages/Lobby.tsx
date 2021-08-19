import { useCallback, useEffect } from "react";
import {
  useFirestore,
  useFirestoreCollectionData,
  useFirestoreDocData,
} from "reactfire";
import { Dispatch, Game, Member, ScreenState, State } from "../data";
import { resetGameScores } from "../state";

const Lobby = ({
  state,
  dispatch,
  startGame,
}: {
  state: State;
  dispatch: Dispatch;
  startGame: () => void;
}) => {
  const gameRef = useFirestore().collection("games").doc(state.currentGame);
  const membersRef = gameRef.collection("members");
  const { status, data: game } = useFirestoreDocData<Game>(gameRef);
  const { status: memberStatus, data: members } =
    useFirestoreCollectionData<Member>(membersRef);
  useEffect(() => {
    if (game && game.state.type === "play") {
      dispatch({ type: "SET_SCREEN", state: ScreenState.GAME });
    }
  }, [game, dispatch]);
  const resetScores = useCallback(() => {
    resetGameScores(gameRef);
  }, [gameRef]);
  if (status !== "success" || memberStatus !== "success") {
    return <div>loading...</div>;
  }

  const amAdmin = game.admin === state.self.uid;
  return (
    <div>
      <h1>Lobby</h1>
      <h2>code {game.code}</h2>
      <h2>
        there will be {game.numQuestions} questions with {game.timeAllotted}{" "}
        seconds per question
      </h2>
      {amAdmin && <button onClick={startGame}>start game</button>}
      {amAdmin && <button onClick={resetScores}>reset scores</button>}
      <div>
        {members.map((member) => (
          <div
            key={member.uid}
            style={{
              backgroundColor: member.isAdmin ? "#ffe70b7f" : "rgba(0,0,0,0)",
            }}
          >
            {member.name} (score: {member.score})
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lobby;
