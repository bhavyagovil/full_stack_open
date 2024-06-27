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

const Persons = ({filterPersons}) => {
  return(
  <div>{filterPersons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}</div>
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

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: newName
    }
    if (persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      }

      personService
      .create(personObject)
      .then(returnedPersons => {
       setPersons(persons.concat(returnedPersons))
       setNewName('')
       setNewNumber('')
      })
  }

  const showPersons = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} eventClick={handleFilter}/>
      <h2>Add a new</h2>
      <PersonForm submitPerson={addPerson} name={newName} number={newNumber} onNameChange={handleNewPersonName} onNumChange={handleNewPersonNumber}/>
      <h2>Numbers</h2>
      <Persons filterPersons={showPersons}/>
    </div>
  )
}

export default App