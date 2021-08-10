import { Answer, Game, Member, PlayState } from "./data";
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
      question.solution.type === "mcq"
        ? 0
        : (question.solution.range[0] + question.solution.range[1]) / 2,
    confidence: 0.7,
  };
  await members.forEach(async (doc) => {
    const memberRef = await doc.ref;
    await memberRef.update({
      answers: firestore.FieldValue.arrayUnion(defaultAnswer),
    });
  });
};

const computeScores = async (gameRef: docRef) => {
  const members = await gameRef.collection("members").get();
  await members.forEach(async (doc) => {
    const memberRef = await doc.ref;
    const member = doc.data() as Member;
    const lastAns = member.answers[member.answers.length - 1];
    const question = questions[lastAns.questionIdx];
    const score =
      lastAns.answer === question.solution.answer
        ? Math.log2(lastAns.confidence / 0.5)
        : Math.log2((1 - lastAns.confidence) / 0.5);
    await memberRef.update({
      score: firestore.FieldValue.increment(score * 100),
    });
  });
};

export const gameTick = async (gameRef: docRef, interval: NodeJS.Timeout) => {
  const game = (await gameRef.get()).data() as Game;
  const state = game.state as PlayState;
  const gameOver =
    state.currentTime === 1 &&
    state.showingScoreboard &&
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
  if (showingScoreboard && state.currentTime === 1) {
    await computeScores(gameRef);
  }
  if (incrementingQuestion) {
    await addQuestionToMemberStack(gameRef, state.questions[curQuestion]);
  }
  if (gameOver) {
    clearInterval(interval);
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
