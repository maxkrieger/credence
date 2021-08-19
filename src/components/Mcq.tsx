import { shuffle } from "lodash";
import { useCallback, useState } from "react";
import { useFirestoreDocData } from "reactfire";
import { Member, Question } from "../data";
import { docRef } from "../firebase";
const Mcq = ({
  question,
  memberRef,
}: {
  question: Question;
  memberRef: docRef;
}) => {
  const { data, status } = useFirestoreDocData<Member>(memberRef);
  const changeMcq = useCallback(
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
  const onChangeConf = useCallback(
    (e) => {
      const updatedAnswers = [...data.answers];
      updatedAnswers[updatedAnswers.length - 1] = {
        ...updatedAnswers[updatedAnswers.length - 1],
        confidence: parseFloat(e.target.value),
      };
      memberRef.update({ answers: updatedAnswers });
    },
    [memberRef, data]
  );
  const [shuffledOpts, setShuffledOpts] = useState(
    question.solution.type === "mcq"
      ? shuffle(question.solution.options.map((s, i) => ({ s, i })))
      : []
  );
  if (status !== "success" || data.answers.length < 1) {
    return <div>loading...</div>;
  }

  const ansVal = data.answers[data.answers.length - 1];
  return (
    <div>
      <div>
        {shuffledOpts.map(({ s, i }) => (
          <div key={s + i}>
            <label style={{ width: "100%" }}>
              <input
                type="radio"
                value={i}
                checked={ansVal.answer === i}
                onChange={changeMcq}
              />{" "}
              {s}
            </label>
          </div>
        ))}
      </div>
      <div>your confidence: {Math.round(ansVal.confidence * 100)}%</div>
      <label>
        50%
        <input
          type="range"
          min={0.5}
          max={1}
          step={0.05}
          value={ansVal.confidence}
          onChange={onChangeConf}
        />{" "}
        100%
      </label>
    </div>
  );
};
export default Mcq;
