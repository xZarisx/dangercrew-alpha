export function playerData(state = {}, action) {
    switch (action.type) {
        case "SET_STAT": /* TODO: stop. Use merge helper */
            return {
                ...state
            };
        default:
            return state;
    }
}
