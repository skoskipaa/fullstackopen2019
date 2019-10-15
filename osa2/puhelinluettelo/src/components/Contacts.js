import React from 'react'
import Person from './Person'

const Contacts = ({filterByName, persons, deleteContact }) => {
    return (
        <ul>
          {rows({filterByName, persons, deleteContact })}
        </ul>
      )
    }
    
    const rows = ({filterByName, persons, deleteContact }) => persons.filter(person =>
          {
            return person.name.toLowerCase().includes(filterByName.toLowerCase())
          }).map(person =>
            <Person 
               key={person.id}
               person={person}
               deleteContact={() => deleteContact(person.id)}
            />
            )

export default Contacts