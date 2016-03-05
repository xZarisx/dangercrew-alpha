import { createStore, applyMiddleware, combineReducers } from 'redux'
import * as peopleReducer from '../redux-reducers/people-reducer'
import * as gameReducer from '../redux-reducers/game-reducer'
import * as mapReducer from '../redux-reducers/map-reducer'
import * as messageReducer from '../redux-reducers/message-reducer'
import * as battleRequestsReducer from '../redux-reducers/battle-requests-reducer'

export default function(data) {
    var reducer = combineReducers({
        ...peopleReducer,
        ...messageReducer,
        ...gameReducer,
        ...mapReducer,
        ...battleRequestsReducer
    });

    var store = createStore(reducer, data);
    return store
}