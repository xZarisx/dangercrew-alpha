import store from '../../init/store'

export default function() {
    /* Dispatch some things to start a fresh battle */
    [
        {
        type: "ADD_STYLE_TO_COMBATANT",
        payload: {
            key: "a",
                combatantStyles: {}
            }
        },
        {
            type: "ADD_STYLE_TO_COMBATANT",
            payload: {
                key: "b",
                combatantStyles: {}
            }
        },
        {
            type: "SET_ROLLOUT_EVENT_STATION",
            payload: {
                rolloutEventStation: "init"
            }
        }
    ].forEach(action => {
       store.dispatch(action);
    });
}