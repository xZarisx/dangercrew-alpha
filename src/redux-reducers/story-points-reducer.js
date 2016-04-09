import { editNode } from '../helpers/reducer-utilities'
import { removeNode } from '../helpers/reducer-utilities'

export function storyPoints(state = {}, action) {
    switch (action.type) {

        case "MERGE_STORYPOINT":
            return editNode(state, action.payload.key, {
                ...action.payload.changes
            });


        default:
            return state;
    }
}
