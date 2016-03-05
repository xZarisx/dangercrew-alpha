import { editNode, removeNode } from '../helpers/reducer-utilities'

export function combatProcessor(state = {}, action) {
    switch (action.type) {

        case "SET_PROCESSING_COMBATANTS":
            return {
                ...action.payload
            };

        case "MERGE_PROCESSED_COMBATANT":
            return editNode(state, action.payload.key, {
                ...action.payload.changes
            });
        default:
            return state;
    }
}
