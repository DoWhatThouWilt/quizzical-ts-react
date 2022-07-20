import { AnswerObject } from '../App'

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  scored: boolean;
  correctAnswer: string;
}

export default function QuestionCard(
  {
    question,
    answers,
    callback,
    userAnswer,
    scored,
    correctAnswer
  }: Props
) {
  const selected = "bg-violet-200 border-transparent"
  const incorrect = "bg-red-200 text-slate-500 border-transparent"
  const correct = "bg-green-300 border-transparent"
  const scoredSelected = "text-slate-500 border-slate-300"

  function isSelected(selectedAnswer: string) {
    return userAnswer?.answer === selectedAnswer
  }

  return (
    <div className="first:mt-0 mt-6 space-y-4 p-4 bg-[#F5F7FB] rounded-xl shadow-xl">
      <p
        className="text-slate-900 text-xl font-semibold"
        dangerouslySetInnerHTML={{ __html: question }} />
      <div className="flex space-x-4">
        {
          answers.map(answer => (
            <button
              className={
                `border rounded-lg py-1 px-5 text-sm
                hover:scale-105 transition-all ease-in duration-100
                ${!scored && (isSelected(answer) ? selected : "border-indigo-900")}
                ${scored && (answer === correctAnswer ? correct :
                  isSelected(answer) ? incorrect :
                    scoredSelected)}
                `
              }
              key={answer}
              value={answer}
              onClick={callback}
              disabled={scored}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          ))
        }

      </div>
    </div>
  )
}
