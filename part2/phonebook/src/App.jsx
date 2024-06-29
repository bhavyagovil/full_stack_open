import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({filter, eventClick}) => {
  return(
  <div>
    filter shown with 
    <input value={filter} onChange={eventClick} />
    </div>)
}

const PersonForm = ({submitPerson, name, number, onNameChange, onNumChange}) => {
  return(
    <div>
      <form onSubmit={submitPerson}>
        <div>
          name: <input value={name} onChange={onNameChange} />
        </div>
        <div>number: <input value={number} onChange={onNumChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>

)}

const Persons = ({obj, removePerson}) => {
  return(
  <div>
     <p key={obj.name}>{obj.name} {obj.number}</p> 
     <button onClick={removePerson} >Delete</button> 
     </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

 useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, []) 

  const handleNewPersonName = (event) => {setNewName(event.target.value)}
  const handleNewPersonNumber = (event) => {setNewNumber(event.target.value)}
  const handleFilter = (event) => {setFilter(event.target.value)} 



  const deletePerson = id => {
    if(window.confirm(`Delete ${id} ?`)){
      personService
        .remove(id)
        .then(deletedPersons => (deletedPersons)) 
        setPersons(persons.filter(person => person.id !== id))
    }
  } 


const updatePerson = id => {
  const person = persons.find(p => p.id ===id)
  const changedPerson = {...person, number: newNumber}

  personService
  .update(id, changedPerson)
  .then(returnedPerson => {
    setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
  })
}

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: newName
    }

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        updatePerson(existingPerson.id)
      }
    } else{
      personService
      .create(personObject)
      .then(returnedPersons => {
       setPersons(persons.concat(returnedPersons))
       setNewName('')
       setNewNumber('')
      })
    }
  }

  const showPersons = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} eventClick={handleFilter}/>
      <h2>Add a new</h2>
      <PersonForm submitPerson={addPerson} name={newName} number={newNumber} onNameChange={handleNewPersonName} onNumChange={handleNewPersonNumber}/>
      <h2>Numbers</h2>
      <div>{showPersons.map(person => 
      <Persons obj={person} removePerson={() => deletePerson(person.id)}/>)}</div>
    </div>
  )
}

export default App