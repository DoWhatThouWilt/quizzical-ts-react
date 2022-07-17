import { AnswerObject } from '../App'

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNum: number;
  scored: boolean;
}

export default function QuestionCard(
  {
    question,
    answers,
    callback,
    userAnswer,
    questionNum,
    scored
  }: Props
) {
  const selected = "border-[#F5F7FB] bg-violet-200"
  const incorrect = "border-[#F5F7FB] bg-red-200 text-slate-500"
  const correct = "border-[#F5F7FB] bg-green-300"
  const scoredSelected = "border-slate-500 text-slate-500"

  function isSelected(selectedAnswer: string) {
    return userAnswer?.answer === selectedAnswer
  }

  function isCorrect(selectedAnswer: string) {
    return isSelected(selectedAnswer) && userAnswer?.correct
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
                `border border-indigo-900 rounded-lg py-1 px-5 text-sm
                hover:scale-105 transition-all ease-in duration-100
                ${!scored && isSelected(answer) && selected}
                ${scored && (isCorrect(answer) ? correct :
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
