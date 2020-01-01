const initialNotification = ''

const notificationReducer = (state = initialNotification, action) => {
    switch(action.type) {
        case 'NOTIFY':
            return action.data
        default:
            return state
    }
}

export const setNotification = ( notification, time ) => {
    return async dispatch => {

        dispatch({
            type: 'NOTIFY',
            data: notification
        })
        setTimeout(() => {
            dispatch({
                type: 'NOTIFY',
                data: ''
            })
        }, time)
    }
}

export default notificationReducer
