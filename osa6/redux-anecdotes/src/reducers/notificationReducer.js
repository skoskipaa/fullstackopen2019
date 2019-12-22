const initialState = ''

const notificationReducer = (state = initialState, action) => {
    //console.log('state now: ', state)
    //console.log('action', action)
    switch(action.type) {
        case 'NOTIFY':
            console.log(action.data)
            return action.data
        default:
            return state
    }
    
}

export const setNotification = (content) => {
    return {
        type: 'NOTIFY',
        data: content
    }
}

export const clearNotification = () => {
    return {
        type: 'NOTIFY',
        data: ''
    }
}



export default notificationReducer