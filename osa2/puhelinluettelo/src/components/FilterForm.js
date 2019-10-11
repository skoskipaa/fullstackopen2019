import React from 'react'

const FilterForm = ( {onChange, value} ) => {
    return (
      <div>
        <input 
            value={value}
            onChange={onChange}/>
      </div>
    )
  }

  export default FilterForm