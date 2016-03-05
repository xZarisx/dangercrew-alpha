import Actions from '../actions/battle-actions'; //For looking up the animation
import getActionMessage from '../../battles/services/get-action-message'

function convertToCombatantActions(actions=[]) {
    return actions.map(action => {
        return {
            ...action,
            type: action.type.replace("_PROCESSED", "")
        }
    })
}


export default function(executed) {

    const animation = Actions[executed.trivia.action_id].animation;
    if (!animation) {
        console.warn('No animation available for', executed.trivia.action_id)
    }

    return {
        caster_id: executed.trivia.caster_id, /* Useful for animations in battle-arena */
        target_id: executed.trivia.target_id,
        animation: animation,
        repetitions: executed.trivia.repetitions || null,
        showTargetBlinking: executed.trivia.showTargetBlinking || false,
        cancelAnimation: executed.trivia.cancelAnimation || false,
        combatantActions: convertToCombatantActions(executed.processorActions),
        messages: getActionMessage(executed.trivia)
    }
}

