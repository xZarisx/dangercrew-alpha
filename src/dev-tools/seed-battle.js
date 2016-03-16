/* Launch the game in battle mode for development shortcut */

import store from '../init/store'
import People from '../_data/people/people'
import Combatant from '../battles/combatants/combatant-schema'

export default function() {

    const opponent = {...People["drew"]}
    const playerData = {...store.getState().playerData}

    /* Set up the player */
    store.dispatch({
        type: "MERGE_COMBATANT",
        payload: {
            key: "a",
            changes: {
                ...Combatant,
                ...playerData,
                hp: playerData.maxHp,
                status: "memoryLeak"
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