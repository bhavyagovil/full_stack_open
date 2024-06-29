const Persons = ({obj, removePerson}) => {
    return(
    <div>
       <p key={obj.name}>{obj.name} {obj.number}</p> 
       <button onClick={removePerson} >Delete</button> 
       </div>
    )
  }


  export default Persons