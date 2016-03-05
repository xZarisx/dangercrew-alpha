import { editNode, removeNode } from '../helpers/reducer-utilities'

export function battle(state = {}, action) {
    switch (action.type) {

        case "ADD_BATTLE_SUBMISSION":
            return {
                ...state,
                submissions: [ ...state.submissions, action.payload]
            };
        case "CLEAR_BATTLE_SUBMISSIONS":
            return {
                ...state,
                submissions: []
            };

        case "SET_BATTLE_QUEUED_SUBMISSIONS":
            return {
                ...state,
                queuedSubmissions: action.payload
            };



        //REPORTING ONLY
        case "ADD_BATTLE_WINNER":
            return {
                ...state,
                winners: [ ...state.winners, action.payload]
            };

        case "SET_SERIES_WINNER_COUNT":
            return {
                ...state,
                seriesWinnerCount: action.payload.seriesWinnerCount
            };

        default:
            return state;
    }
}
