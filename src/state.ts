import { Answer, Game, PlayState } from "./data";
import { docRef, firestore } from "./firebase";
import questions from "./questions";

export const addQuestionToMemberStack = async (
  gameRef: docRef,
  questionIdx: number
) => {
  const question = questions[questionIdx];
  const members = await gameRef.collection("members").get();
  const defaultAnswer: Answer = {
    questionIdx,
    answer:
      question.solution.type === "tf"
        ? false
        : question.solution.type === "mcq"
        ? 0
        : (question.solution.range[0] + question.solution.range[1]) / 2,
    confidence: 1,
  };
  await members.forEach(async (doc) => {
    const memberRef = await doc.ref;
    await memberRef.update({
      answers: firestore.FieldValue.arrayUnion(defaultAnswer),
    });
  });
};

export const gameTick = async (gameRef: docRef, interval: NodeJS.Timeout) => {
  const game = (await gameRef.get()).data() as Game;
  const state = game.state as PlayState;
  const gameOver =
    state.currentTime === 1 &&
    state.currentQuestionIdx === state.questions.length - 1;
  const showingScoreboard =
    state.currentTime === 1
      ? !state.showingScoreboard
      : state.showingScoreboard;
  const incrementingQuestion =
    state.currentTime === 1 && state.showingScoreboard;
  const curQuestion = incrementingQuestion
    ? Math.min(state.currentQuestionIdx + 1, state.questions.length - 1)
    : state.currentQuestionIdx;
  if (incrementingQuestion) {
    await addQuestionToMemberStack(gameRef, state.questions[curQuestion]);
  }
  if (gameOver) {
    clearInterval(interval);
    console.log("game over");
  }
  await gameRef.update({
    "state.currentTime":
      state.currentTime === 1
        ? game.timeAllotted
        : firestore.FieldValue.increment(-1),
    "state.showingScoreboard": showingScoreboard,
    "state.gameOver": gameOver,
    "state.currentQuestionIdx": curQuestion,
  });
};
