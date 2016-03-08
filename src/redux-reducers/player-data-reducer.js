import { setValue } from '../helpers/reducer-utilities'

export function playerData(state = {}, action) {
    switch (action.type) {
        case "SET_PLAYERDATA_VALUE":
            return setValue(state, action.payload.changes);
        default:
            return state;
    }
}
