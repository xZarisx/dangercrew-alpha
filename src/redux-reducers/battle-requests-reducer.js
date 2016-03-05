export function battleRequests(state = {}, action) {

    switch(action.type) {

        case 'SET_BATTLE_REQUEST':
            return {
                //...state,
                showRequest: true,
                requesterName: action.payload.requesterName,
                requesterLevel: action.payload.requesterLevel
            };

        case 'DECLINE_BATTLE_REQUEST':
            return {
                ...state,
                showRequest: false,
            };

        default:
            return state;
    }
}
