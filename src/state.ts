import { Answer, Game, Member, PlayState, Question } from "./data";
import { docRef, firestore } from "./firebase";

export const addQuestionToMemberStack = async (
  gameRef: docRef,
  questionIdx: number,
  question: Question
) => {
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

export const getDelta = (question: Question, member: Member) => {
  const lastAns = member.answers[member.answers.length - 1];
  const score =
    lastAns.answer === question.solution.answer
      ? Math.log2(lastAns.confidence / 0.5)
      : Math.log2((1 - lastAns.confidence) / 0.5);
  return score * 100;
};

const computeScores = async (gameRef: docRef, gameState: PlayState) => {
  const members = await gameRef.collection("members").get();
  await members.forEach(async (doc) => {
    const memberRef = await doc.ref;
    const member = doc.data() as Member;
    const lastAns = member.answers[member.answers.length - 1];
    const question = gameState.questions[lastAns.questionIdx];
    await memberRef.update({
      score: firestore.FieldValue.increment(getDelta(question, member)),
    });
  });
};

export const gameTick = async (gameRef: docRef, interval: NodeJS.Timeout) => {
  const game = (await gameRef.get()).data() as Game;
  const state = game.state as PlayState;
  const gameOver =
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
    await computeScores(gameRef, state);
  }
  if (incrementingQuestion) {
    await addQuestionToMemberStack(
      gameRef,
      curQuestion,
      state.questions[curQuestion]
    );
  }
  if (gameOver && state.currentTime === 1) {
    clearInterval(interval);
    await gameRef.update({
      state: { type: "lobby" },
    });
  } else {
    await gameRef.update({
      "state.currentTime":
        state.currentTime === 1
          ? game.timeAllotted
          : firestore.FieldValue.increment(-1),
      "state.showingScoreboard": showingScoreboard,
      "state.gameOver": gameOver,
      "state.currentQuestionIdx": curQuestion,
    });
  }
};
