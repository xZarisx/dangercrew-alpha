export function battleRequests(state = {}, action) {

    switch(action.type) {

        case 'SET_BATTLE_REQUEST':
            return {
                //...state,
                showRequest: true,
                requesterId: action.payload.requesterId,
                requesterName: action.payload.requesterName,
                requesterLevel: action.payload.requesterLevel,
                requesterSkin: action.payload.requesterSkin
            };

        case 'HIDE_BATTLE_REQUEST':
        case 'DECLINE_BATTLE_REQUEST':
            return {
                ...state,
                showRequest: false,
            };

        default:
            return state;
    }
}
