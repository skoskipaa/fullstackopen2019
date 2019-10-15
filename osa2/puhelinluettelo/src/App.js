import React, { useState, useEffect } from 'react'
import Contacts from './components/Contacts'
import FilterForm from './components/FilterForm'
import ContactForm from './components/ContactForm'
import personService from './services/persons'

const App = () => {
    const [ persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('')
    const [filterByName, setFilter ] = useState('')

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
            phone: newNumber
        }

        const names = persons.map(p =>
          p.name.toLowerCase())

        if (names.includes(personObject.name.toLowerCase())) {
          const pers = persons.find(p => p.name.toLowerCase() === personObject.name.toLowerCase())
          const persId = pers.id
          const changedPers = { ...pers, phone: personObject.phone }

          if (window.confirm(`${pers.name} is already in the phonebook! Replace number?`)) {
            personService
              .update(persId, changedPers)
              .then(returnedPers => {
                setPersons(persons.map(p => p.id !== persId ? p : returnedPers))
              })
              .catch(error => console.log('Pieleen män'))
          }


        } else {
            personService
              .create(personObject)
              .then(returnedPers =>
                setPersons(persons.concat(returnedPers)))
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
        }
    }

    return (
      <div>
        <h1>Phonebook</h1>
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