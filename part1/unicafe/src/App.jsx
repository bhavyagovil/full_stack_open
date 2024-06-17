import { useState } from 'react'

const Counter = ({text, value}) => {
  return(
    <p>{text} {value}</p>
  )
}

const Statistics = ({good, neutral, bad, received}) => {
  if (received === 1){return(
    <div>
      <Counter text='good' value={good}/>
      <Counter text='neutral' value={neutral}/>
      <Counter text='bad' value={bad}/>
      <p>all <Total good={good} neutral={neutral} bad={bad}/></p>
      <p>average <Average good={good} neutral={neutral} bad={bad}/></p>
      <p>positive <Positive good={good} neutral={neutral} bad={bad} /></p>
    </div>
  )} else {return('No feedback given')}
}

const Total = ({good, neutral, bad}) => {
  return(good + neutral + bad)
}

const Average = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  if (total === 0) return 0
  return ((good * 1) + (neutral * 0) + (bad * -1)) / total
}

const Positive = ({good, neutral, bad}) => {
  const total = good + bad + neutral
  if (total === 0) return 0
  return(good/total)*100 
}

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}> {text} </button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [received, setReceived] = useState(0)

  const handleGood = () => {
    setGood(good+1)
    setReceived(1)
  }

  const handleNeutral = () => {
    setNeutral(neutral+1)
    setReceived(1)
  }

  const handleBad = () => {
    setBad(bad+1)
    setReceived(1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text='good'/>
      <Button handleClick={handleNeutral} text='neutral'/>
      <Button handleClick={handleBad} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} received={received}/>
    </div>
  )
}

export default App