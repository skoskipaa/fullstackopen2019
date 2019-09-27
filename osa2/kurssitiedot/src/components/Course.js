import React from 'react'

const Course = ({ course }) => {

    return (
        <div>
            <Header course={course.name} />
            <Content content={course.parts} />
            <h3>Exercises:</h3>
            <Total parts={course.parts} />
        </div>
        
    )
}

const Total = ({ parts }) => {

    return (
        parts.reduce((sum, part) =>
            sum + part.exercises, 0
        )
    )
}

const Header = ({ course }) => {
    
    return (
        <div>
            <h2>{course}</h2>
        </div>
    )
}

const Content = ({ content }) => {
    
    return (
        content.map(part => 
        <Part
            key={part.id}
            part={part}
        />
        )
    )
}

const Part = ({ part }) => {
    
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

export default Course