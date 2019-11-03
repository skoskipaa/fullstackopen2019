import React, { useState, useEffect } from 'react'
import Contacts from './components/Contacts'
import FilterForm from './components/FilterForm'
import ContactForm from './components/ContactForm'
import personService from './services/persons'

const App = () => {
    const [ persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('')
    const [ filterByName, setFilter ] = useState('')
    const [ message, setMessage ] = useState(null)

    useEffect(() => {
      personService
          .getAll()
          .then(initialPersons => {
            setPersons(initialPersons)
          })
    }, [])

    const handleFilter = (event) => {
        setFilter(event.target.value)
    }
    
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        
        const personObject = {
            name: newName,
            number: newNumber
        }

        const names = persons.map(p =>
          p.name.toLowerCase())

        if (names.includes(personObject.name.toLowerCase())) {
          const pers = persons.find(p => p.name.toLowerCase() === personObject.name.toLowerCase())
          const persId = pers.id
          const changedPers = { ...pers, number: personObject.number }

          if (window.confirm(`${pers.name} is already in the phonebook! Replace number?`)) {
            personService
              .update(persId, changedPers)
              .then(returnedPers => {
                setPersons(persons.map(p => p.id !== persId ? p : returnedPers))
                setMessage(`Number changed for ${pers.name}`)
                setTimeout(() => {
                  setMessage(null)
                }, 5000);
              })
              .catch(error => console.log('Pieleen män'))
          }


        } else {
            personService
              .create(personObject)
              .then(returnedPers => {
                setPersons(persons.concat(returnedPers))
                setMessage(`${returnedPers.name} was added to the phonebook.`)
                setTimeout(() => {
                  setMessage(null)
                }, 5000)
              })
              .catch(error => {
                setMessage(`Fail: ${error.response.data.error.toString()}`)
                setTimeout(() => {
                  setMessage(null)
                }, 5000)
              })
        }

        setNewName('')
        setNewNumber('')
      }

    const deleteContact = id => {
      const pers = persons.find(p => p.id === id)
      if (window.confirm(`Delete ${pers.name} ?`)) {
      console.log(`deleting contact with id ${id}`)
      personService
        .removeContact(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
        .then(setMessage(`${pers.name} have been removed.`))
        .then(setTimeout(() => {
          setMessage(null)
        }, 5000))
        .catch(error => {
          setMessage(`Fail: ${pers.name} has already been removed from server!`)
          setTimeout(() => {
            setMessage(null)
          }, 5000);
        })
        }
    }

    const Notification = ({ message }) => {
      if (message === null) {
        return null
      
      } else if (message.includes('Fail')) {
        return (
          <div className="error">
            {message}
          </div>
        )
      }

      return (
        <div className="success">
          {message}
        </div>
      )
    }

    return (
      <div>
        <h1>Phonebook</h1>
        <Notification message={message} />
        <h2>Filter contacts by name</h2>
        <FilterForm onChange={handleFilter} value={filterByName} />
        <h2>Add a new contact</h2>
        <ContactForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
                     newNumber={newNumber} handleNumberChange={handleNumberChange} />
        <h2>Numbers</h2>
        <Contacts filterByName={filterByName} persons={persons} deleteContact={deleteContact}/>
      </div>
    )
  }
  
  export default App