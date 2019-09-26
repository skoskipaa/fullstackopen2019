import React from 'react';
import ReactDOM from 'react-dom';


const Course = ({ course }) => {

    return (

        <div>
            <Header course={course} />
            <Content course={course} />
            <p>Exercises:  </p>
            <Total course={course} />
            
            
        </div>
    )
}

const Total = ({ course }) => {
    /* var sum = 0
    for (var i = 0; i < course.parts.length; i++) {
        sum += course.parts[i].exercises
        }
    return (   
        sum
    )*/

    return (
        course.parts.reduce((sum, part) =>
            sum + part.exercises, 0
        )
    )

}

const Header = (props) => {
    
    return (
        <div>
            <h1>{props.course.name}</h1>
        </div>
    )
}

const Content = ({ course }) => {
    
    return (
        course.parts.map(part => 
        <Part
            key={part.id}
            part={part}
        />
        )
    )
}

const Part = ({ part }) => {
    
    return (
        <li>{part.name} {part.exercises}</li>
    )
}


const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            },
            {
                name: 'Redux',
                exercises: 11,
                id: 4
            }
        ]

    }

    return (
        <div>
            <Course course={course} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));