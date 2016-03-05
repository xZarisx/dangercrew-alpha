import store from '../init/store'

export default function() {

    const request = store.getState().battleRequests;

    /* Hide the Battle Request window (not that it should be mounted) */
    store.dispatch({
        type: "HIDE_BATTLE_REQUEST"
    });

    /* Set any state needed for the battle */
    store.dispatch({
        type: "MERGE_COMBATANT",
        payload: {
            key: "b",
            changes: {
                name: request.requesterName,
                skin: request.requesterSkin,
                //level: request.r
            }
        }
    });

    /* Launch into battle game area */
    store.dispatch({
        type: "SET_GAME_AREA",
        payload: {
            gameArea: "battle"
        }
    })
}