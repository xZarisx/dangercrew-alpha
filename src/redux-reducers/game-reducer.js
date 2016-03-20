import { setValue } from '../helpers/reducer-utilities'

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

        case 'SET_GAME_AREA':
            return {
                ...state,
                gameArea: action.payload.gameArea
            }

        case 'SET_TRANSITION_OVERLAY_OPACITY':
            return {
                ...state,
                transitionOverlayOpacity: action.payload.transitionOverlayOpacity
            }

        case 'SET_ONBOARDING_POPUP':
            return {
                ...state,
                showOnboardingPopup: action.payload.showOnboardingPopup
            }

        case "SET_GAME_VALUE":
            return setValue(state, action.payload.changes);

        default:
            return state;
    }
}
