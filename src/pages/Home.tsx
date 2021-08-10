import { useCallback, useState } from "react";
import { Dispatch, State } from "../data";

const Home = ({
  state,
  dispatch,
  beginSubscription,
}: {
  state: State;
  dispatch: Dispatch;
  beginSubscription: (code?: string) => void;
}) => {
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
  return (
    <div>
      <h1>Credence Calibration</h1>
      {state.self.uid === "" ? (
        "waiting for firebase..."
      ) : (
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
              onClick={() => beginSubscription(gameCode)}
              disabled={state.self.userName === "" || gameCode === ""}
            >
              Join Game
            </button>
          </div>
          <div style={{ padding: "1em" }}>
            <button
              onClick={() => beginSubscription()}
              disabled={state.self.userName === ""}
            >
              Create Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;
