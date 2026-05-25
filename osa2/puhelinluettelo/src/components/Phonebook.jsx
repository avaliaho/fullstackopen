import personService from '../services/persons'
import axios from 'axios'

const Filter = ({ filterPersonsFunc, filter, handleFilterChangeFunc }) => {
    return (
        <form onSubmit={filterPersonsFunc}>
            <div>
            filter shown with <input value={filter} onChange={handleFilterChangeFunc}/>
            <button type="submit">filter</button>
            </div>
        </form>
    )
}

const PersonForm = ({ addPersonFunc, newName, handleNewName, newNumber, handleNewNumber }) => {
    return (
        <form onSubmit={addPersonFunc}>
            <div>
                name: <input value={newName} onChange={handleNewName}/><br/>
                number: <input value={newNumber} onChange={handleNewNumber}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const Persons = ({ persons, setPersons, notification, setNotification }) => {

    const removeThisPerson = (id, name) => {
        if (!window.confirm(`Delete ${name}?`)) {
            return
        }

        personService
            .remove(id)
            .then(response => {
                console.log('person deleted')
                setPersons(persons.filter(p => p.id !== id))
                setNotification(`Deleted ${name}`)
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
        })
        .catch(error => {
            console.log('error deleting person', error)
        })
    }

    return (
        <ul>
        {persons.map(person => (
          <li key={person.name}>
            {person.name} {person.number}
            <button onClick={() => removeThisPerson(person.id, person.name)}>delete</button>
          </li>
        ))}
      </ul>
    )
}

export {
    Filter, 
    PersonForm,
    Persons
}