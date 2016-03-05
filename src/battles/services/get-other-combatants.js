/* Return alive combatants that are not me */
import store from '../../init/store'

export default function(me_id) {
    const combatants = store.getState().combatants;
    return Object.keys(combatants).filter(c => {
       return (c != me_id && combatants[c].hp > 0)
    });
};