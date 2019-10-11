import React from 'react'
import Person from './Person'

const Contacts = ({filterByName, persons}) => {
    return (
        <ul>
          {rows({filterByName, persons})}
        </ul>
      )
    }
    
    const rows = ({filterByName, persons}) => persons.filter(person =>
          {
            return person.name.toLowerCase().includes(filterByName.toLowerCase())
          }).map(person =>
            <Person 
               key={person.name}
               person={person}
            />
            )

export default Contacts