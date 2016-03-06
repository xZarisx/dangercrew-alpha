import store from '../../init/store'

export default function() {
    /* Dispatch some things to start a fresh battle */
    [
        {
            type: "CLEAR_BATTLE_SUBMISSIONS"
        },
        {
            type: "SET_ROLLOUT",
            payload: {
                rollout: []
            }
        },
        {
            type: "SET_ROLLOUT_INDEX",
            payload: {
                rolloutIndex: 0
            }
        },
        {
            type: "SET_TEXT_MESSAGE",
            payload: {
                textMessage: null
            }
        },
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