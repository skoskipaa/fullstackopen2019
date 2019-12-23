import React from 'react'
import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {

    const handleChange = (event) => {
        event.preventDefault()
        const filterValue = event.target.value
        //console.log(filterValue)
        props.setFilter(filterValue)

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

const mapDispatchToProps = {
    setFilter
}

export default connect(
    null,
    mapDispatchToProps)(Filter)
