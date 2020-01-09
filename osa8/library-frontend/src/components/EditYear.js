import React, { useState } from 'react'

const EditYear = (props) => {

    const [name, setName] = useState('')
    const [year, setYear] = useState('')

    const submit = async (event) => {
        event.preventDefault()

        await props.editAuthor({
            variables: { name, born: parseInt(year, 10) }
        })

        setName('')
        setYear('')
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                <select value={name} 
                    onChange={({ target }) => setName(target.value)}>
                <option>Choose author</option>
                {props.authors.map(a => <option key={a.name} value={a.name}>{a.name}</option>)}
                </select>
                </div>
                <div>
                    year
                    <input 
                    value={year}
                    onChange={({ target }) => setYear(target.value)} />
                </div>
                <button type='submit'>change year</button>
            </form>

        </div>
        
    )
}

export default EditYear