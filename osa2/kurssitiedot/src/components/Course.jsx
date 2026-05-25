const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <p><b>total of {total} exercises</b></p>
  )
}

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part => 
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Header = ({ header }) => {
  return (
    <h2>{header}</h2>
  )
}

const Course = ({ courses }) => {
  return (
    <div>

      <h1>Web development curriculum</h1>
      {courses.map(course => 
        <div key={course.id}>
          <Header header={course.name} />
          <Content course={course} />
          <Total parts={course.parts} />
        </div>
      )}  
    </div>
  )
}

export default Course