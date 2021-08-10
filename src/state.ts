import { Answer } from "./data";
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
