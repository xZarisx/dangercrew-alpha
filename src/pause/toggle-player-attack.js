import store from '../init/store'
import removeItemFromArray from '../helpers/remove-item-from-array'
import PauseMenuData from './pause-menu-data'

/* action creator */
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


function notHighEnoughLevel(id) {
    /* A little messy. Get the level requirement, because I don't actually know it here */
    const levelRequirement = PauseMenuData.pauseAttacksMenu.filter(attack => {
        return attack.id == id
    })[0].levelRequirement;

    return levelRequirement > store.getState().playerData.level
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
        if (playerAttacks.length >= 3 || notHighEnoughLevel(id)) {
            return false; /* Don't allow more than 3 */
        }
        const updatedAttacks = [...playerAttacks, attackId];
        setPlayerDataValue({attacks:updatedAttacks})
    }
}