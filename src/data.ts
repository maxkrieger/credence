import React from "react";

export type Self = {
  userName: string;
  isAdmin: boolean;
  gameId: string;
};

export type Game = {
  code: string;
};

export enum ScreenState {
  HOME,
}

export type State = {
  self: Self;
  screenState: ScreenState;
  game: Game;
};

export type Action =
  | {
      type: "SET_SELF";
      self: Self;
    }
  | { type: "SET_SCREEN"; state: ScreenState };

export type Dispatch = React.Dispatch<Action>;

export type TopProps = { state: State; dispatch: Dispatch };

export const reducer = (prevState: State, action: Action): State => {
  switch (action.type) {
    case "SET_SELF":
      return { ...prevState, self: action.self };
    case "SET_SCREEN":
      return { ...prevState, screenState: action.state };
    default:
      return prevState;
  }
};
