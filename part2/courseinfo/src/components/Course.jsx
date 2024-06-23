import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = (props) => {
    return(
      <div>
        <Header name={props.course.name}/>
        <Content content={props.course.parts} />
        <Total total={props.course.parts}/>
      </div>
    )
  }

  export default Course