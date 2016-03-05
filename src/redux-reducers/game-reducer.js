export function game(state = {}, action) {

    switch(action.type) {

        case 'PAUSE_GAME':
            return {
                ...state,
                isPaused: true
            }

        case 'UNPAUSE_GAME':
            return {
                ...state,
                isPaused: false
            }

        case 'SHOW_TEXTBOX':
            return {
                ...state,
                isShowingTextbox: true
            }
        case 'REMOVE_TEXTBOX':
            return {
                ...state,
                isShowingTextbox: false
            }

        default:
            return state;
    }
}
