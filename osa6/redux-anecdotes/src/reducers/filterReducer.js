const initialState = ''

const filterReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'FILTER':
            return action
        default:
            return state
    }
}

export const setFilter = (content) => {
    return {
        type: 'FILTER',
        data: content
    }
}

export default filterReducer