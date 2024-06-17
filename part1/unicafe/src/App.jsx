import { useState } from 'react'

const Counter = ({text, value}) => {
  return(
    <p>{text} {value}</p>
  )
}

const StatisticLine = ({text, value}) => {
  return(
    <tr>
    <td>{text}</td>
     <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, received}) => {
  if (received === 1){return(
    <table>
      <tbody>
      <StatisticLine text='good' value={good}/>
      <StatisticLine text='neutral' value={neutral}/>
      <StatisticLine text='bad' value={bad}/>
      <StatisticLine text='all' value={good + neutral + bad}/>
      <StatisticLine text='average' value={((good * 1) + (neutral * 0) + (bad * -1)) / (good+bad+neutral)}/>
      <StatisticLine text='positive' value={`${(good/(good+bad+neutral))*100}%`}/>
      </tbody>
    </table>
  )} else {return('No feedback given')}
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