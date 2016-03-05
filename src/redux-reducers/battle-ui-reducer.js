import { editNode, removeNode } from '../helpers/reducer-utilities'

export function battleUi(state = {}, action) {
    switch (action.type) {

        case "SET_TERMINAL_MENU_KEY":
            return {
                ...state,
                terminalMenuKey: action.payload.terminalMenuKey
            };

        case "SET_TERMINAL_MENU_INDEX":
            return {
                ...state,
                terminalMenuSelectedIndex: action.payload.terminalMenuSelectedIndex
            };

        case "SET_ROLLOUT_EVENT_STATION":
            return {
                ...state,
                rolloutEventStation: action.payload.rolloutEventStation
            };

        case "SET_TEXT_MESSAGE":
            return {
                ...state,
                textMessage: action.payload.textMessage
            };

        case "SET_TEXT_MESSAGE_DONE_ROLLING":
            return {
                ...state,
                textMessageDoneRolling: action.payload.textMessageDoneRolling
            };

        case "SET_ROLLOUT_INDEX":
            return {
                ...state,
                rolloutIndex: action.payload.rolloutIndex
            };

        case "SET_BATTLE_INTRO_MESSAGE":
            return {
                ...state,
                introMessage: action.payload.introMessage
            };

        /* STYLING COMBATANT FOR ANIMATION */
        case "ADD_STYLE_TO_COMBATANT":

            var combatantStyles = {
                ...state.combatantStyles
            };
            combatantStyles[action.payload.key] = action.payload.style;

            return {
                ...state,
                combatantStyles: combatantStyles
            };

        default:
            return state;
    }
}
