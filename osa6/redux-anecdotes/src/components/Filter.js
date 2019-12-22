import React from 'react'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {

    const handleChange = (event) => {
        event.preventDefault()
        const filterValue = event.target.value
        //console.log(filterValue)
        props.store.dispatch(setFilter(filterValue))
    }

    const style = {
        marginTop: 15,
        marginBottom: 10
    }
    
    return (
        <div style={style}>
            filter: <input onChange={handleChange} />
        </div>
    )
}
export default Filter
