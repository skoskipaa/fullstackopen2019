import React, { useState } from 'react'

const App = (props) => {
    const [ persons, setPersons] = useState(props.persons)
    const [ newName, setNewName ] = useState('')

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const addName = (event) => {
        event.preventDefault()
        
        const nameObject = newName

        persons.includes(nameObject)
        ? window.alert(`${nameObject} is already in the phonebook!`)
        
        : setPersons(persons.concat(nameObject))
        setNewName('')
        
    }

    const rows = () => persons.map(person =>
        <li key={person}>{person}</li>
        )
  
    return (
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={addName}>
          <div>
            name: <input 
                    value={newName}
                    onChange={handleNameChange}/>    
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        <ul>
            {rows()}
        </ul>
      </div>
    )
  
  }
  
  export default App