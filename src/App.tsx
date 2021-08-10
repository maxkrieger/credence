import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { Game, Member, PlayState, reducer, ScreenState } from "./data";
import Home from "./pages/Home";
import { times, random, shuffle } from "lodash";
import Lobby from "./pages/Lobby";
import { auth, db } from "./firebase";
import GameComponent from "./pages/GameComponent";
import questions from "./questions";
import { addQuestionToMemberStack, gameTick } from "./state";

function App() {
  const [state, dispatch] = useReducer(reducer, {
    self: { userName: "", uid: "" },
    screenState: ScreenState.HOME,
    currentGame: "",
  });
  const interval = useRef<any>();
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
              score: 0,
              answers: [],
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
            timeAllotted: 15,
            numQuestions: 3,
            state: { type: "lobby" },
          };
          const member: Member = {
            uid: state.self.uid,
            name: state.self.userName,
            isAdmin: true,
            isSpectator: false,
            answers: [],
            score: 0,
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

  const onTick = useCallback(() => {
    const ref = db.collection("games").doc(state.currentGame);
    gameTick(ref, interval.current);
  }, [interval, state]);

  const startGame = useCallback(() => {
    (async () => {
      const ref = db.collection("games").doc(state.currentGame);
      const game = (await ref.get()).data() as Game;
      const gameState: PlayState = {
        type: "play",
        currentQuestionIdx: 0,
        currentTime: game.timeAllotted,
        questions: shuffle(questions.map((q, i) => i)).slice(
          0,
          game.numQuestions
        ),
        showingScoreboard: false,
        gameOver: false,
      };
      await ref.update({ state: gameState });
      await addQuestionToMemberStack(ref, gameState.questions[0]);
      const int = setInterval(onTick, 1000);
      interval.current = int;
    })();
  }, [state, onTick]);
  return (
    <div>
      {state.screenState === ScreenState.HOME ? (
        <Home
          state={state}
          dispatch={dispatch}
          beginSubscription={beginSubscription}
        />
      ) : state.screenState === ScreenState.LOBBY ? (
        <Lobby state={state} startGame={startGame} dispatch={dispatch} />
      ) : state.screenState === ScreenState.GAME ? (
        <GameComponent state={state} />
      ) : (
        <div />
      )}
    </div>
  );
}

export default App;
