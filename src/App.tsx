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
  const [scored, setScored] = useState(false)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [gameOver, setGameOver] = useState(true)

  const score = userAnswers.filter(answer => answer.correct === true).length


  async function startTrivia() {
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

  // function checkAnswer(e: React.MouseEvent<HTMLButtonElement>) {
  //   if (!gameOver) {
  //     // get user's answer
  //     const answer = e.currentTarget.value
  //     // check answer against correct answer
  //     const correct = questions[number].correct_answer === answer
  //     // add score if answer is correct
  //     if (correct) setScore(prev => prev + 1)
  //     // save answer in the array for the user's answers
  //     const answerObject = {
  //       question: questions[number].question,
  //       answer,
  //       correct,
  //       correctAnswer: questions[number].correct_answer
  //     }
  //     setUserAnswers(prev => [...prev, answerObject])
  //   }

  // }

  // function nextQuestion() {
  //   // move onto the next question if it is not the last question
  //   const nextQuestion = number + 1

  //   if (nextQuestion === TOTAL_QUESTIONS) setGameOver(true)
  //   else setNumber(nextQuestion)
  // }

  return (
    <div>
      <h1 className="text-5xl text-slate-800 font-semibold tracking-wider">Quizzical</h1>

      {(gameOver || userAnswers.length === TOTAL_QUESTIONS) &&
        <button onClick={startTrivia}>Start</button>
      }

      {/* {<pre>{JSON.stringify(userAnswers, null, 2)}</pre>} */}

      {!gameOver && <p>Score: {score}</p>}

      {!loading && !gameOver && <button onClick={() => setScored(true)}>Check Answers</button>}

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

      {/* {!loading && !gameOver && */}
      {/*   <QuestionCard */}
      {/*     questionNum={number + 1} */}
      {/*     totalQuestions={TOTAL_QUESTIONS} */}
      {/*     question={questions[number].question} */}
      {/*     answers={questions[number].answers} */}
      {/*     userAnswer={userAnswers ? userAnswers[number] : undefined} */}
      {/*     callback={checkAnswer} */}
      {/*   /> */}
      {/* } */}

      {/* {!gameOver && */}
      {/*   !loading && */}
      {/*   userAnswers.length === number + 1 && */}
      {/*   number !== TOTAL_QUESTIONS - 1 && */}
      {/*   <button className="mt-6" onClick={nextQuestion}>Next Question</button> */}
      {/* } */}
    </div>
  )
}

