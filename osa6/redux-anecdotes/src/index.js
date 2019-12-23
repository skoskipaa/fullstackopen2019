import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import reducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const combinedReducer = combineReducers({
  anecdotes: reducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(combinedReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)