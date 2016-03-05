/* Submit fake combatants to store for testing purposes */
import store from '../../init/store'
import Combatant from './combatant-schema'

export default function() {

    [
        {name: "a"},
        {name: "b"},
        {name: "c"}
    ].map((sim) => {
        return {
            ...Combatant,
            ...sim
        }
    }).forEach((sim) => {
        //add to store
        store.dispatch({
            type: "MERGE_COMBATANT",
            payload: {
                key: sim.name,
                changes: sim
            }
        })
    })
}