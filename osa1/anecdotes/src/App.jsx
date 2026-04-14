import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0
  })
  const [mostVoted, setMostVoted] = useState(0)

  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const voteClick = () => {
    const copyOfVotes = {...votes}
    // grow selected anecdote's votes by 1
    copyOfVotes[selected + 1] += 1
    setVotes(copyOfVotes)

    // handling most voted anecdote
    var mostVoted = Object.keys(copyOfVotes).reduce((a, b) => copyOfVotes[a] > copyOfVotes[b] ? a : b)
    setMostVoted(mostVoted)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected + 1]} votes</p>
      <button onClick={voteClick}>vote</button>
      <button onClick={handleClick}>next anecdote</button>

      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[mostVoted - 1]}</p>
      <p>has {votes[mostVoted]} votes</p>
    </div>
  )
}

export default App