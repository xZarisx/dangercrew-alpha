import store from '../init/store'
import removeItemFromArray from '../helpers/remove-item-from-array'

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

export default function(id="") {

    const itemId = id.split('pauseItems-')[1];
    const playerItems = store.getState().playerData.items;

    if (playerItems.indexOf(itemId) != -1) {

        const updatedItems = removeItemFromArray(playerItems, [itemId])
        setPlayerDataValue({items:updatedItems})
    } else {

        /* I don't have this attack equipped, so add it */
        if (playerItems.length >= 3) {
            return false; /* Don't allow more than 3 */
        }
        const updatedItems = [...playerItems, itemId];
        setPlayerDataValue({items:updatedItems})
    }
}