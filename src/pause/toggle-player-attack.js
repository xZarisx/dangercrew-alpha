import store from '../init/store'
import removeItemFromArray from '../helpers/remove-item-from-array'

function setPlayerDataValue(changes={}) {
    store.dispatch({
        type: "SET_PLAYERDATA_VALUE",
        payload: {
            changes: {
                ...changes
            }
        }
    })
}

export default function(id="") {
    const attackId = id.split('pauseAttacks-')[1];
    const playerAttacks = store.getState().playerData.attacks;

    if (playerAttacks.indexOf(attackId) != -1) {
        /* I have this attack equipped, so remove it */

        if (playerAttacks.length <= 1) {
            return false; /* Don't allow less than 1 */
        }
        const updatedAttacks = removeItemFromArray(playerAttacks, [attackId])
        setPlayerDataValue({attacks:updatedAttacks})
    } else {
        /* I don't have this attack equipped, so add it */

        if (playerAttacks.length >= 3) {
            return false; /* Don't allow more than 3 */
        }
        const updatedAttacks = [...playerAttacks, attackId];
        setPlayerDataValue({attacks:updatedAttacks})
    }



}