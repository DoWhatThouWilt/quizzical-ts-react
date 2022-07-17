import { useState } from 'react'
import { fetchQuizQuestions } from './API'

// Components
import QuestionCard from './components/QuestionCard'
// Types
import { Difficulty, QuestionState } from './API'

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
}

const TOTAL_QUESTIONS = 5

export default function App() {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [score, setScore] = useState(0)
  const [scored, setScored] = useState(false)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [gameOver, setGameOver] = useState(true)

  async function startTrivia() {
    setScored(false)
    setLoading(true)
    setGameOver(false)

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    )

    setQuestions(newQuestions)
    setUserAnswers([])
    setLoading(false)
  }

  function checkAnswer(e: React.MouseEvent<HTMLButtonElement>, i: number) {
    const answer = e.currentTarget.value

    let modifiedAnswers = [...userAnswers] // if set equal to the state it is NOT a copy

    const correct = questions[i].correct_answer === answer

    const answerObject = {
      question: questions[i].question,
      answer,
      correct,
    }

    modifiedAnswers[i] = answerObject
    setUserAnswers(modifiedAnswers)
  }

  function scoreQuiz() {
    setScored(true)
    const scoreCalc = userAnswers.filter(answer => answer.correct === true).length
    setScore(scoreCalc)
  }

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="p-6 rounded-xl mx-auto max-w-screen-md glass bg-opacity">

        {gameOver &&
          <div className="text-center text-white p-6">
            <h1 className="text-[2.75rem] font-semibold tracking-wider drop-shadow-lg">Quizzical</h1>
            <p className="text-xl font-medium drop-shadow-sm">Scramble your brain on trivia</p>
            <button
              className="mt-10 text-xl bg-[#4D5B9E] text-white font-medium py-3 px-[4.5rem] shadow-xl rounded-3xl
              hover:scale-110 transition-transform ease-in duration-100"
              onClick={startTrivia}>Start quiz</button>
          </div>
        }

        {loading && <p className="text-white">Loading Questions...</p>}

        {!loading && !gameOver &&
          questions.map(({ question, answers, correct_answer }, i) => (
            <QuestionCard
              key={question}
              question={question}
              answers={answers}
              userAnswer={userAnswers ? userAnswers[i] : undefined}
              callback={(e) => checkAnswer(e, i)}
              scored={scored}
              correctAnswer={correct_answer}
            />))
        }

        {!loading && !gameOver && !scored &&
          <div className="w-full flex justify-center">
            <button
              className="mt-10 text-lg bg-[#4D5B9E] text-white font-medium py-3 px-10 shadow-xl rounded-3xl
              hover:scale-110 transition-transform ease-in duration-100"
              onClick={scoreQuiz}>Check Answers</button>
          </div>}

        {scored && !gameOver &&
          <div className="mt-10 w-full flex justify-center items-center space-x-6">
            <p className="text-xl text-white font-semibold drop-shadow-sm">You scored {score}/{TOTAL_QUESTIONS} correct answers</p>
            <button
              className="text-lg bg-[#4D5B9E] text-white font-medium py-3 px-10 shadow-xl rounded-3xl
              hover:scale-110 transition-transform ease-in duration-100"
              onClick={startTrivia}>Play Again</button>
          </div>}

      </div>


    </div>
  )
}

