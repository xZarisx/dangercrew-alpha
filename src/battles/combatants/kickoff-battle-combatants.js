/* Submit fake combatants to store for testing purposes */
import store from '../../init/store'
import Combatant from './combatant-schema'

export default function() {
    console.log('kickoff');
    [
        {
            id: "a",
            name: "Player",
            skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/svJacob-2.svg",
            attacks: ["action_attack_basic_001", "action_attack_basic_002", "action_attack_theft_001", "action_attack_status_002", "action_attack_repetitions_001"],
            items: ["action_item_hp_001", "action_item_hp_001", "action_item_pp_001"],

            attackStatPoints: 30,
            defenseStatPoints: 3,
            speedStatPoints: 20,

            //hp:1,
            //status:"memoryLeak"
        },
        {
            id: "b",
            //name: "Computer",
            isChallenger: true,
            //hp: 1,
            //speedStatPoints: 60,
            //skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-orange.svg",
            items: ["action_item_hp_001", "action_item_clearStatus_lag_001", "action_item_pp_001"]
        }
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
                key: sim.id,
                changes: sim
            }
        })
    })
}