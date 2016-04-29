import store from '../init/store'
import People from '../_data/people/people'
import Combatant from '../battles/combatants/combatant-schema'

export default function() {

    const opponent = {...People[store.getState().battleRequests.requesterId]}
    const playerData = {...store.getState().playerData}

    /* Hide the Battle Request window */
    store.dispatch({
        type: "HIDE_BATTLE_REQUEST"
    });


    /* Set up the player */

    console.log({
        ...Combatant,
        ...playerData,
    })

    store.dispatch({
        type: "MERGE_COMBATANT",
        payload: {
            key: "a",
            changes: {
                ...Combatant,
                ...playerData,
                //hp: playerData.maxHp
            }
        }
    });

    /* Set up the opponent */
    store.dispatch({
        type: "MERGE_COMBATANT",
        payload: {
            key: "b",
            changes: {
                ...Combatant,
                ...opponent,
                hp: opponent.maxHp
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