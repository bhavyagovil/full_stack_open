import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'




const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)


 useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, []) 


/* EVENT HANDLERS */
  const handleNewPersonName = (event) => {setNewName(event.target.value)}
  const handleNewPersonNumber = (event) => {setNewNumber(event.target.value)}
  const handleFilter = (event) => {setFilter(event.target.value)} 


/* DELETE PERSON */
  const deletePerson = id => {
    if(window.confirm(`Delete ${id} ?`)){
      personService
        .remove(id)
        .then(deletedPersons => (deletedPersons)) 
        setPersons(persons.filter(person => person.id !== id))
        setTimeout(() => {
          setMessage(`Deleted ${id}`)
        }, 2)
  
    }
  } 


/* UPDATE PERSON */
const updatePerson = id => {
  const person = persons.find(p => p.id ===id)
  const changedPerson = {...person, number: newNumber}

  personService
  .update(id, changedPerson)
  .then(returnedPerson => {
    setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
  })
}


/* ADD PERSON */
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
        setTimeout(() => {
          setMessage(`Updated ${newName}`)
        }, 2)
      }
    } else{
      personService
      .create(personObject)
      .then(returnedPersons => {
       setPersons(persons.concat(returnedPersons))
       setNewName('')
       setNewNumber('')
       setTimeout(() => {
        setMessage(`Added ${newName}`)
      }, 2)
      })
    }
  }


/* SHOW PERSON */
  const showPersons = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))


  /* APP */
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
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