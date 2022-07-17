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
  correctAnswer: string;
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
      correctAnswer: questions[i].correct_answer
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
      <div className="mx-auto max-w-screen-md ">

        {gameOver &&
          <div className="text-center">
            <h1 className="text-[2.75rem] text-slate-800 font-semibold tracking-wider">Quizzical</h1>
            <p className="text-xl">Scramble your brain on trivia</p>
            <button
              className="mt-10 text-xl bg-[#4D5B9E] text-white font-medium py-5 px-[4.5rem] rounded-3xl"
              onClick={startTrivia}>Start quiz</button>
          </div>
        }

        {loading && <p>Loading Questions...</p>}

        {!loading && !gameOver &&
          questions.map(({ question, answers }, i) => (
            <QuestionCard
              key={question}
              questionNum={i}
              question={question}
              answers={answers}
              userAnswer={userAnswers ? userAnswers[i] : undefined}
              callback={(e) => checkAnswer(e, i)}
              scored={scored}
            />))
        }

        {!loading && !gameOver && !scored &&
          <div className="w-full flex justify-center">
            <button
              className="mt-10 text-lg bg-[#4D5B9E] text-white font-medium py-4 px-10 rounded-3xl"
              onClick={scoreQuiz}>Check Answers</button>
          </div>}

        {scored && !gameOver &&
          <div className="mt-10 w-full flex justify-center items-center space-x-6">
            <p className="text-xl font-semibold">You scored {score}/{TOTAL_QUESTIONS} correct answers</p>
            <button
              className="text-lg bg-[#4D5B9E] text-white font-medium py-4 px-10 rounded-3xl"
              onClick={startTrivia}>Play Again</button>
          </div>}

      </div>


    </div>
  )
}

