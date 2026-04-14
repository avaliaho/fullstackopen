import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Statistics = ({good, neutral, bad, all, average, positivesPercentage}) => {
  if (all == 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <tr>
          <StatisticLine text='good' value={good}/>
        </tr>
        <tr>
          <StatisticLine text='neutral' value={neutral}/>
        </tr>
        <tr>
          <StatisticLine text='bad' value={bad}/>
        </tr>
        <tr>
          <StatisticLine text='all' value={all}/>
        </tr>
        <tr>
          <StatisticLine text='average' value={average}/>
        </tr>
        <tr>
          <StatisticLine text='positive' value={positivesPercentage}/>
        </tr>
      </tbody>
    </table>
  )
}

const StatisticLine = ({text, value}) => {
  // adding % sign to positives percentage, right at the end of second td tag
  if (text == 'positive') {
    return (
      <>
        <td>{text}</td>
        <td>{value} %</td>
      </>
    )
  }

  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positivesPercentage, setPositivesPercentage] = useState(0)

  const addOneGoodFeedback = () => {
    const newGood = good + 1
    const newTotal = total + 1
    setGood(newGood) 
    setTotal(newTotal)

    const averageCalculated = (newGood - bad) / newTotal
    setAverage(averageCalculated)

    setPositivesPercentage((newGood / newTotal) * 100)
  }

  const addOneNeutralFeedback = () => {
    const newTotal = total + 1
    setNeutral(neutral + 1)
    setTotal(newTotal)

    const averageCalculated = ((good - bad) / newTotal)
    setAverage(averageCalculated)

    setPositivesPercentage((good / newTotal) * 100)
  }

  const addOneBadFeedback = () => {
    const newBad = bad + 1
    const newTotal = total + 1
    setBad(newBad)
    setTotal(newTotal)

    const averageCalculated = ((good - newBad) / newTotal)
    setAverage(averageCalculated)

    setPositivesPercentage((good / newTotal) * 100)
  }
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button 
        onClick={addOneGoodFeedback}
        text='good'
      />
      <Button
        onClick={addOneNeutralFeedback}
        text='neutral'
      />
      <Button
        onClick={addOneBadFeedback}
        text='bad'
      />

      <h1>statistics</h1>

      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
        all={total}
        average={average}
        positivesPercentage={positivesPercentage}
      />
    </div>
  )
}

export default App