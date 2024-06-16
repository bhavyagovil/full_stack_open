import { useState } from 'react'


const Total = ({good, neutral, bad}) => good + neutral + bad

const Average = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  if (total === 0) return 0;
  return ((good * 1) + (neutral * 0) + (bad * -1)) / total;
};

const Positive = ({good, neutral, bad}) => {
  const total = good + bad + neutral
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

  const handleGood = () => setGood(good+1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text='good'/>
      <Button handleClick={handleNeutral} text='neutral'/>
      <Button handleClick={handleBad} text='bad'/>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
     <p>all <Total good={good} neutral={neutral} bad={bad}/></p>
     <p>average <Average good={good} neutral={neutral} bad={bad}/></p>
     <p>positive <Positive good={good} neutral={neutral} bad={bad}/> %</p>
    </div>
  )
}

export default App