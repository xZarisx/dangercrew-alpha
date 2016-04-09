import { createStore, applyMiddleware, combineReducers } from 'redux'
import * as peopleReducer from '../redux-reducers/people-reducer'
import * as gameReducer from '../redux-reducers/game-reducer'
import * as mapReducer from '../redux-reducers/map-reducer'
import * as messageReducer from '../redux-reducers/message-reducer'
import * as battleRequestsReducer from '../redux-reducers/battle-requests-reducer'
import * as combatantsReducer from '../redux-reducers/combatants-reducer'
import * as combatantsProcessorReducer from '../redux-reducers/combat-processor-reducer'
import * as combatantsRolloutReducer from '../redux-reducers/rollout-reducer'
import * as battleReducer from '../redux-reducers/battle-reducer'
import * as battleUiReducer from '../redux-reducers/battle-ui-reducer'
import * as playerDataReducer from '../redux-reducers/player-data-reducer'
import * as pauseMenuReducer from '../redux-reducers/pause-menu-reducer'
import * as battleResultPromptReducer from '../redux-reducers/battle-result-prompt-reducer'
import * as storyPointsReducer from '../redux-reducers/story-points-reducer'


export default function(data) {
    var reducer = combineReducers({
        ...peopleReducer,
        ...messageReducer,
        ...gameReducer,
        ...mapReducer,
        ...battleRequestsReducer,
        ...battleUiReducer,
        ...battleReducer,
        ...combatantsProcessorReducer,
        ...combatantsRolloutReducer,
        ...combatantsReducer,
        ...playerDataReducer,
        ...pauseMenuReducer,
        ...battleResultPromptReducer,
        ...storyPointsReducer
    });

    var store = createStore(reducer, data);
    return store
}