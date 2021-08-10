import { useCallback } from "react";
import { useFirestoreDocData } from "reactfire";
import { Member, Question } from "../data";
import { docRef } from "../firebase";

const NumEstimate = ({
  question,
  memberRef,
}: {
  question: Question;
  memberRef: docRef;
}) => {
  const { data, status } = useFirestoreDocData<Member>(memberRef);
  const onChangeVal = useCallback(
    (e) => {
      const updatedAnswers = [...data.answers];
      updatedAnswers[updatedAnswers.length - 1] = {
        ...updatedAnswers[updatedAnswers.length - 1],
        answer: parseInt(e.target.value, 10),
      };
      memberRef.update({ answers: updatedAnswers });
    },
    [memberRef, data]
  );
  if (status !== "success" || data.answers.length < 1) {
    return <div>loading...</div>;
  }
  if (question.solution.type !== "num") {
    return <div>error</div>;
  }
  const ansVal = data.answers[data.answers.length - 1];
  return (
    <div>
      <div>your estimate: {ansVal.answer.toLocaleString()}</div>
      <label>
        {question.solution.range[0].toLocaleString()}{" "}
        <input
          type="range"
          min={question.solution.range[0]}
          max={question.solution.range[1]}
          value={ansVal.answer as number}
          onChange={onChangeVal}
        />{" "}
        {question.solution.range[1].toLocaleString()}
      </label>
    </div>
  );
};
export default NumEstimate;
