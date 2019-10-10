import React from 'react'

const Header = ({title}) => (
  <h1>
      {title}
  </h1>
)

const Total = ({parts}) => {
  const exercises = parts.map(part => part.exercises)
  const total = exercises.reduce((a, b) => a + b, 0)
  return (
      <b>
          {"total of " + total + " exercise" + (total > 1 ? "s" : "")}
      </b>
  )
}

const Part = ({part}) => (
  <li>
      {part.name + " " + part.exercises}
  </li>
)

const Parts = ({parts}) => {
  const listElements = parts.map(part => <Part key={part.id} part={part}/>)
  return (
      <ul>
          {listElements}
      </ul>
  )
}

const Content = ({parts}) => (
  <div>
      <Parts parts={parts} />
      <Total parts={parts} />
  </div>
)

const Course = ({course}) => (
  <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
  </div>
)

const Courses = ({courses}) => {
  const courseElements = courses.map(course => <Course key={course.id} course={course}/>)
  return (
      <div>
          {courseElements}
      </div>
  )
}

export default Courses