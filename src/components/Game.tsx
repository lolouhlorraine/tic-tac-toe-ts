import { useMemo, useState } from "react"
import "./Game.css"

const calculateWinner = (square: string[] | null[]) => {
  const winningIndices = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  let winner = null
  for (const indices of winningIndices) {
    const [a, b, c] = indices
    if (square[a] && square[a] === square[b] && square[c] === square[a]) {
        winner = square[a]
    }
  }
  return winner
}

export default function Game() {
  const initialAnswers = useMemo(() => Array(9).fill(null), [])
  const [answers, setAnswers] = useState<string[] | null[]>(initialAnswers)
  const [isNext, setIsNext] = useState(true)
  const [winner, setWinner] = useState<string | null>(null)

  const handleClick = (e:React.MouseEvent<HTMLButtonElement>, index:number) => {
    const currentInput = isNext ? 'X': 'O'
    let newAnswers = answers.slice()
    newAnswers.splice(index, 1, currentInput)
    setAnswers(newAnswers)
    setIsNext(!isNext)

    const getWinner = calculateWinner(newAnswers)
    if (getWinner) {
        setWinner(getWinner)
    }
  }

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnswers(initialAnswers)
    setIsNext(true)
    setWinner(null)
  }

  const renderSquare = (idx: number) => {
    const isDisabled = Boolean(answers[idx]) || Boolean(winner)
    return (
      <button className="square" onClick={(e) => handleClick(e, idx)} disabled={isDisabled}>
        {answers[idx]}
      </button>
    )
  }

  return (
    <div className="game">
      {winner && <div>Winner is Player {winner}</div>}
      <div className="board-container">
        <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
        </div>
        <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
        </div>
        <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
        </div>
      </div>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}