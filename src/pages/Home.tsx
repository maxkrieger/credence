import { useCallback, useState } from "react";
import { TopProps } from "../data";

const Home = ({ state, dispatch }: TopProps) => {
  const [gameCode, setGameCode] = useState("");
  const onChangeUsername = useCallback(
    (e) => {
      dispatch({
        type: "SET_SELF",
        self: { ...state.self, userName: e.target.value },
      });
    },
    [dispatch, state]
  );
  const onJoinGame = useCallback(() => {}, [dispatch, state]);
  const onCreateGame = useCallback(() => {}, [dispatch, state]);
  return (
    <div>
      <h1>Credence Calibration</h1>
      {state.game.code === "" ? (
        <div>
          <div>
            <label>
              My username{" "}
              <input
                type="text"
                placeholder="username"
                maxLength={30}
                value={state.self.userName}
                onChange={onChangeUsername}
              />
            </label>
          </div>

          <div style={{ padding: "1em" }}>
            <label>
              game code{" "}
              <input
                type="text"
                value={gameCode}
                onChange={(e) => setGameCode(e.target.value)}
                maxLength={20}
                placeholder="game code"
              />
            </label>
            <button
              onClick={onJoinGame}
              disabled={state.self.userName === "" || gameCode === ""}
            >
              Join Game
            </button>
          </div>
          <div style={{ padding: "1em" }}>
            <button
              onClick={onCreateGame}
              disabled={state.self.userName === ""}
            >
              Create Game
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2>{state.self.userName}'s Game</h2>
        </div>
      )}
    </div>
  );
};
export default Home;
