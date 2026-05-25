import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import { Filter, PersonForm, Persons } from './components/Phonebook'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationColor, setNotificationColor] = useState('green')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()

    const found = persons.find(person => person.name === newName)
    if (found) {
      console.log('found is', found)
      console.log(`${newName} is already in phonebook, updating number...`)

      if (window.confirm(`${found.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(found.id, { ...found, number: newNumber })
          .then(updatedPerson => {
          setPersons(persons.map(person => person.id !== found.id ? person : updatedPerson))
          setNewName('')
          setNewNumber('')
          setNotification(`Updated ${updatedPerson.name}'s number`)
          setNotificationColor('green')
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch((error) => {
          setNotification(
            `Information of '${found.name}' was already removed from server`
          )
          setNotificationColor('red')
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setPersons(persons.filter((p) => p.id !== found.id))
      })
        return
      } else {
        return
      }
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }
    
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotification(`Added ${returnedPerson.name}`)
        setNotificationColor('green')
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    }
  

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const filterPersons = (event) => {
    event.preventDefault()
    const filtered = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    setPersons(filtered)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} colorStyle={notificationColor} />
      <Filter filterPersonsFunc={filterPersons} filter={filter} handleFilterChangeFunc={handleFilterChange} />

      <h3>add a new</h3>
      <PersonForm addPersonFunc={addPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} />

      <h3>Numbers</h3>
      <Persons persons={persons} setPersons={setPersons} notification={notification} setNotification={setNotification} />
    </div>
  )
}

export default App