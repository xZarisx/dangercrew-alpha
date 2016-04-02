import store from '../init/store'

/* Determine what is shown in the description box. */
/* Return [title, description] pair */

export default function(selectedNode={}) {

    if (!selectedNode.id) {
        console.warn("selectedNode not found in pause-info-middleware")
    }

    /* Use Case: Hide attack titles and descriptions if not leveled up enough */
    if (selectedNode.id.match(/pauseAttacks/)) {
        if (selectedNode.levelRequirement > store.getState().playerData.level) {
            return ["??????", "Gain more XP to unlock this attack"]
        }
    }

    return [selectedNode.infoBoxTitle, selectedNode.infoBoxDescription];
}