import React from "react";

export type Self = {
  userName: string;
  uid: string;
};

export type Solution =
  | {
      type: "tf";
      answer: boolean;
    }
  | { type: "num"; range: [number, number]; answer: number }
  | { type: "mcq"; options: string[]; answer: number };

export type Question = {
  prompt: string;
  solution: Solution;
};

export type PlayState = {
  type: "play";
  currentQuestionIdx: number;
  questions: number[];
  currentTime: number;
  showingScoreboard: boolean;
  gameOver: boolean;
};

export type LobbyState = {
  type: "lobby";
};

export type GameState = PlayState | LobbyState;

export type Answer = {
  questionIdx: number;
  answer: number | boolean;
  confidence: number;
};

export type Member = {
  uid: string;
  name: string;
  isAdmin: boolean;
  isSpectator: boolean;
  score: number;
  answers: Answer[];
};

export type Game = {
  code: string;
  admin: string;
  timeAllotted: number;
  numQuestions: number;
  state: GameState;
};

export enum ScreenState {
  HOME,
  LOBBY,
  GAME,
}

export type State = {
  self: Self;
  screenState: ScreenState;
  currentGame: string;
};

export type Action =
  | {
      type: "SET_SELF";
      self: Self;
    }
  | { type: "SET_SCREEN"; state: ScreenState }
  | { type: "SET_GAME"; game: string };

export type Dispatch = React.Dispatch<Action>;

export const reducer = (prevState: State, action: Action): State => {
  switch (action.type) {
    case "SET_SELF":
      return { ...prevState, self: action.self };
    case "SET_SCREEN":
      return { ...prevState, screenState: action.state };
    case "SET_GAME":
      return { ...prevState, currentGame: action.game };
    default:
      console.warn("reducer fallthrough");
      return prevState;
  }
};
