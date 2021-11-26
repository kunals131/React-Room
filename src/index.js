import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.scss'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import { BrowserRouter as Router } from 'react-router-dom'

// import { VoxeetSessionProvider } from './SessionAndInitialization/VoxeetProvider'
import { initializeVoxeet } from './SessionAndInitialization/SessionInitialization'

const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store= createStore(reducers, composeEnhacers(applyMiddleware(thunk)))

initializeVoxeet();

ReactDOM.render(
    <Provider store={store}>
   
            <Router>
            <App />
            </Router>
     
    </Provider>
    , document.querySelector('#root')
);
