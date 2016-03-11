import { setValue } from '../helpers/reducer-utilities'

export function battleResultPrompt(state = {}, action) {
    switch (action.type) {
        case "SET_RESULT_PROMPT_VALUE":
            return setValue(state, action.payload.changes);

        default:
            return state;
    }
}