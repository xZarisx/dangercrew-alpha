/* Submit fake combatants to store for testing purposes */
import store from '../../init/store'
import Combatant from './combatant-schema'

export default function(specifics=null) {

    [
        {name: "a"},
        {name: "b"}
        //{name: "c"}

    ].map((sim) => {

        const resets = specifics  ? specifics : Combatant;

        return {
            ...resets,
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