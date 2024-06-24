const Header = (props) =><h1>{props.name}</h1>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>


const Content = (props) => {
    return(
    <div>
    {props.content.map(part => <Part key={part.id} part={part}/>)}
    </div>
    )}


const Total = (props) => {
    const total = props.total.reduce((accumulator, item) => {return accumulator += item.exercises}, 0)

    return(
        <div>
          <p> Total of {total} exercises</p>
        </div>
      )}


const Course = (props) => {
  
    return(
      <>
          <Header name={props.course.name}/>
          <Content content={props.course.parts} />
          <Total total={props.course.parts}/>
      </>
    )
  }
  export default Course