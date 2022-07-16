import { AnswerObject } from '../App'

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNum: number;
  totalQuestions: number;
}

export default function QuestionCard(
  {
    question,
    answers,
    callback,
    userAnswer,
    questionNum,
    totalQuestions
  }: Props
) {
  return (
    <div className="space-y-6">
      <p>Question: {questionNum} / {totalQuestions}</p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {
          answers.map(answer => (
            <div key={answer}>
              <button
                value={answer}
                onClick={callback}
                disabled={userAnswer ? true : false}>
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </button>
            </div>
          ))
        }

      </div>
    </div>
  )
}
