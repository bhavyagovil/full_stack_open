import Header from './Header'
import Content from './Content'

const Course = (props) => {
    return(
      <div>
        <Header name={props.course.name}/>
        <Content content={props.course.parts} />
      </div>
    )
  }

  export default Course