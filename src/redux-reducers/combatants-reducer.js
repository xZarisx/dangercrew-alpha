import { editNode, removeNode } from '../helpers/reducer-utilities'

export function combatants(state = {}, action) {
    switch (action.type) {

        case "MERGE_COMBATANT":
            return editNode(state, action.payload.key, {
                ...action.payload.changes
            });
        default:
            return state;
    }
}
