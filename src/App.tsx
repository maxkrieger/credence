import React, { useReducer } from "react";
import { FirebaseAppProvider } from "reactfire";
import { reducer, ScreenState } from "./data";
import Home from "./pages/Home";

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE ?? "{}");

function App() {
  const [state, dispatch] = useReducer(reducer, {
    self: { userName: "", isAdmin: false, gameId: "" },
    screenState: ScreenState.HOME,
    game: {
      code: ""
    }
  });
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      {state.screenState === ScreenState.HOME && (
        <Home state={state} dispatch={dispatch} />
      )}
    </FirebaseAppProvider>
  );
}

export default App;
