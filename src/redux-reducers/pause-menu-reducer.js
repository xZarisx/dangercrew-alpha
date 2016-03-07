import { setValue } from '../helpers/reducer-utilities'

export function pauseMenu(state = {}, action) {
    switch (action.type) {
        case "SET_PAUSEMENU_VALUE":
            return setValue(state, action.payload.changes);

        default:
            return state;
    }
}
