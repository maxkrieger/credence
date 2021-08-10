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
  if (status !== "success" || data.answers.length < 1) {
    return <div>loading...</div>;
  }
  if (question.solution.type !== "num") {
    return <div>error</div>;
  }
  const ansVal = data.answers[data.answers.length - 1];
  return (
    <div>
      <div>your estimate: {ansVal.answer}</div>
      <input
        type="range"
        min={question.solution.range[0]}
        max={question.solution.range[1]}
        value={ansVal.answer as number}
        onChange={console.log}
      />
    </div>
  );
};
export default NumEstimate;
