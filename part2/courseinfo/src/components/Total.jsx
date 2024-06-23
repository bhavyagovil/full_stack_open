const Total = (props) => {
    const total = props.total.reduce((accumulator, item) => {return accumulator += item.exercises}, 0)

    return(
        <div>
          <p> Total of {total} exercises</p>
        </div>
      )}
export default Total