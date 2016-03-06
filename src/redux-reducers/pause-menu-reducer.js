export function pauseMenu(state = {}, action) {
    switch (action.type) {
        case "SET_SOMETHING": /* TODO: stop. Use merge helper */
            return {
                ...state
            };
        default:
            return state;
    }
}
