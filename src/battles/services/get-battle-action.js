import battleActionSchema from '../actions/battle-action-schema'
import battleActions from '../actions/battle-actions'

export default function(id="") {
    if (battleActions[id]) {
        return {
            ...battleActionSchema,
            ...battleActions[id]
        }
    }

    console.warn('No matching action found in get-battle-action for', id);
    return null;
}