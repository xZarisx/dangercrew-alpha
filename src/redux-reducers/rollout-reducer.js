export function rollout(state = {}, action) {
    switch (action.type) {
        case "SET_ROLLOUT":
            return [
                ...action.payload.rollout
            ];
        default:
            return state;
    }
}
