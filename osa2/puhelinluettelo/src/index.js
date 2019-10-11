import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const persons = [
    {name: 'Hilkka', phone: '123456'},
    {name: 'Sirpa', phone: '555313'},
    {name: 'Jaska', phone: '654321'}
]

ReactDOM.render(<App persons={persons} />, document.getElementById('root'));

