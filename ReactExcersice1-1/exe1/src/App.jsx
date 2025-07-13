import { useState } from 'react'

const Header = ({ course }) => <h1>{course.name}</h1>

const Part = ({ part }) => (
  <p>
    {part.name} - {part.exercises} exercises
  </p>
)

const Content = ({ parts }) => (
  <div>
    {parts.map((part, index) => (
      <Part key={index} part={part} />
    ))}
  </div>
)

const CourseTotal = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p><strong>Total number of exercises: {totalExercises}</strong></p>
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({ text, value, unit = '' }) => (
  <tr>
    <td>{text}</td>
    <td>{value}{unit}</td>
  </tr>
)

const FeedbackStatistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  
  if (total === 0) {
    return <p>No feedback given yet</p>
  }

  const average = (good - bad) / total
  const positivePercentage = (good / total) * 100

  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="Total" value={total} />
        <StatisticLine text="Average" value={average.toFixed(2)} />
        <StatisticLine text="Positive" value={positivePercentage.toFixed(2)} unit="%" />
      </tbody>
    </table>
  )
}

const FeedbackSection = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <Button handleClick={() => setGood(good + 1)} text="Good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      </div>
      
      <h2>Statistics</h2>
      <FeedbackStatistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const CourseSection = ({ course }) => (
  <div>
    <Header course={course} />
    <Content parts={course.parts} />
    <CourseTotal parts={course.parts} />
  </div>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <CourseSection course={course} />
      <FeedbackSection />
    </div>
  )
}

export default App