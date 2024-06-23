const Total = (props) => {
    let totalExercises = 0;
    props.total.forEach(part => {
        totalExercises += part.exercises;
    })
    return(
        <div>
          <p> Total of {totalExercises} exercises</p>
        </div>
      )}
export default Total