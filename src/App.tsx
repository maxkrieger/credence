import React, { useCallback, useEffect, useReducer } from "react";
import { Game, Member, reducer, ScreenState } from "./data";
import Home from "./pages/Home";
import { times, random } from "lodash";
import Lobby from "./pages/Lobby";
import { FirebaseAppProvider } from "reactfire";
import { app, auth, db } from "./firebase";

function App() {
  const [state, dispatch] = useReducer(reducer, {
    self: { userName: "", uid: "" },
    screenState: ScreenState.HOME,
    currentGame: "",
  });
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: "SET_SELF", self: { userName: "", uid: user.uid } });
        console.log(`signed in as ${user.uid}`);
      } else {
        console.error(`user signed out`);
      }
    });
  }, []);

  const beginSubscription = useCallback(
    (code?: string) => {
      (async () => {
        if (code) {
          const ref = db.collection("games").doc(code);
          const game = await ref.get();
          if (game.exists) {
            const member: Member = {
              uid: state.self.uid,
              name: state.self.userName,
              isAdmin: false,
              isSpectator: false,
            };
            await ref.collection("members").doc(member.uid).set(member);

            dispatch({ type: "SET_GAME", game: code });
            dispatch({ type: "SET_SCREEN", state: ScreenState.LOBBY });
          } else {
            alert("game doesn't exist");
          }
        } else {
          // https://stackoverflow.com/a/44622300/10833799
          const randomCode = times(5, () => random(35).toString(36)).join("");

          const game: Game = {
            code: randomCode,
            admin: state.self.uid,
            timeAllotted: 30,
            numQuestions: 10,
            state: { type: "lobby" },
          };
          const member: Member = {
            uid: state.self.uid,
            name: state.self.userName,
            isAdmin: true,
            isSpectator: false,
          };
          const ref = db.collection("games").doc(randomCode);
          await ref.set(game);
          await ref.collection("members").doc(member.uid).set(member);
          dispatch({ type: "SET_GAME", game: randomCode });
          dispatch({ type: "SET_SCREEN", state: ScreenState.LOBBY });
        }
      })();
    },
    [state, dispatch]
  );
  return (
    <div>
      <FirebaseAppProvider firebaseApp={app}>
        {state.screenState === ScreenState.HOME ? (
          <Home
            state={state}
            dispatch={dispatch}
            beginSubscription={beginSubscription}
          />
        ) : state.screenState === ScreenState.LOBBY ? (
          <Lobby
            state={state}
            dispatch={dispatch}
            beginSubscription={beginSubscription}
          />
        ) : (
          <div />
        )}
      </FirebaseAppProvider>
    </div>
  );
}

export default App;
