import React, { useState } from 'react'
import Contacts from './components/Contacts'
import FilterForm from './components/FilterForm'
import ContactForm from './components/ContactForm'

const App = (props) => {
    const [ persons, setPersons] = useState(props.persons)
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('')
    const [filterByName, setFilter ] = useState('')

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
          names.includes(personObject.name.toLowerCase())
          ? window.alert(`${personObject.name} is already in the phonebook!`)
          : setPersons(persons.concat(personObject))
          setNewName('')
          setNewNumber('')
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
        <Contacts filterByName={filterByName} persons={persons}/>
      </div>
    )
  }
  
  export default App