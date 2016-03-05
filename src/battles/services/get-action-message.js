import store from '../../init/store'
import Actions from '../actions/battle-actions'
import Combatant from '../combatants/combatant-model'
import listingTextHelper from '../../helpers/listing-text-helper'

export default function(trivia={}) {

    const caster = trivia.caster_id ? new Combatant(store.getState().combatProcessor[trivia.caster_id]) : null;
    const target = trivia.target_id ? new Combatant(store.getState().combatProcessor[trivia.target_id]) : null;
    const action = Actions[trivia.action_id];


    //Strikes
    var before = [`${caster.name} used `, `@@pause_300`, `[FAST]${action.name}!`];
    var after = null;

    if (trivia.repetitions > 1) {
        before = [`${caster.name} used `, `@@pause_400`, `[FAST]${action.name}!`];
        after = `It hit ${trivia.repetitions} times!`
    }

    //Fails
    if (trivia.eventExit == "miss") { after = [`[FAST]...but it missed!`]}
    if (trivia.eventExit == "blocked") { after = `${target.name} blocked the attack!`}
    if (trivia.eventExit == "resisted") { after = [`...but ${target.name} resisted!`]}
    if (trivia.eventExit == "resisted::irrelevant") { after = [`...but it didn't work...`]}

    if (trivia.eventExit == "cancelled:lag") {
        //console.log('lag message', trivia);
        return {
            before: `${caster.name} is lagging too much to attack!`,
            after: null
        }
    }

    //Death
    if (trivia.eventExit == "dead") {
        return null;
    }
    if (trivia.submittedByStatus == "death") {
        /* TODO: not yet implemented. On a plane. */
        return {
            before: null,
            after: `${caster.name} is out of battery life!`
        }
    }
    if (trivia.eventExit == "cancelled:everybody-else-is-dead") {
        return null;
    }




    if (trivia.eventExit == "lagexpire::irrelevant") {
        return null;
    }


    //Statuses
    if (trivia.causedStatus == "memoryLeak") { after = [`[FAST]${target.name} has a memory leak!`]}
    if (trivia.causedStatus == "lag") { after = [`${target.name} is lagging out!`]}

        //Affected by memory leak
        if (trivia.submittedByStatus == "memoryLeak") {
            before = null;
            after = `${caster.name} is hurt by the memory leak!`;
        }

        //Lag expires
        if (trivia.action_id == "action_naturaleffect_lagExpire") {
            before = null;
            after = `${caster.name}'s lagging has ended!`;
        }


    //Theft
    if (trivia.stolenItems && trivia.stolenItems.length) {

        const itemNames = trivia.stolenItems.map((item) => {
            return Actions[item].name
        });
        const itemsText = listingTextHelper(itemNames);

        after = [`[FAST]${caster.name} stole ${itemsText} from ${target.name}!`]
    }

    //Items
    if (trivia.didUseItem) {
        before = `${caster.name} used a ${action.name}`; /* TODO a/an vowel checker */

        if (/_sticker_/.test(trivia.action_id)) {
            before = `${caster.name} slapped on a ${action.name}`; /* TODO a/an vowel checker */
        }

        if (trivia.eventExit == "itemfail::wrongstatus") {
            after = `...but it didn't do anything!`
        }

        if (trivia.statusWas) {
            if (trivia.statusWas == "lag") {
                after = `${caster.name} is no longer lagging!`
            }
            if (trivia.statusWas == "memoryLeak") {
                after = `${caster.name} fixed the memory leak!`
            }
        }



        if (trivia.hpRecovered) {
            after = `${caster.name} recovered ${trivia.hpRecovered} hp!`
        }
        if (trivia.statIncreases) {
            //HARDCODING THIS FOR NOW. ONLY ACCEPTING 1 IN THIS ARRAY
            if (trivia.statIncreases[0].statName == "accuracy") {
                after = `${caster.name}'s accuracy increased by ${trivia.statIncreases[0].increasedBy}%`
            }
            else {
                after = `${caster.name}'s ${trivia.statIncreases[0].statName} increased!`
            }

            //const trivia = trivia.statIncreases
            /* TODO: refactor this so multiple stats could be decreased or increased with one action */
        }

    }


    switch (trivia.action_id) {
        default:
            return {
                before: before,
                after: after
            }
    }
}