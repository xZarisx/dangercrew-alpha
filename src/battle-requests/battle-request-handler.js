import store from '../init/store'
import {randomFromArray} from '../helpers/random-from-array'
import {percentChance} from '../helpers/numbers-helper'
import getXpGain from './get-xp-gain'

/* people data */
import People from '../_data/people/people'

/* pure */
function getProbability(level=1) {

    if (level == 1) {
        return ["punky"] /* Ensure punky is first battle, because he is beatable */
    }

    if (level < 3) {
        return [
            "berg",
            "drew",
            "punky", "punky", "punky", "punky",
            "jessie", "jessie", "jessie",
            "marie"
        ];
    }

    return [
        "berg",
        "drew", "drew",
        "punky", "punky", "punky",
        "jessie", "jessie",
        "marie", "marie"
    ];
}



export default function(action={}) {

    /* Ignore handler if already showing a request */
    if (store.getState().battleRequests.showRequest) {
        return false;
    }

    /* Ignore handler if result window is open */
    if (store.getState().battleResultPrompt.showResult) {
        return false;
    }

    /* Roll to see if request is triggered */
    if (percentChance(66)) { //66 percent chance nothing will happen
        return false;
    }

    const probability = getProbability(store.getState().playerData.level);
    const challenger_id = randomFromArray(probability);
    const challenger = {
        ...People[challenger_id]
    };

    /* Set data for the request */
    store.dispatch({
        type: "SET_BATTLE_REQUEST",
        payload: {
            requesterId: challenger_id,
            requesterName: challenger.name,
            requesterSkin: challenger.skin,
            requesterLevel: challenger.level
        }
    });

    /* Set the XP that's on the table */
    const xpGain = getXpGain(challenger);
    store.dispatch({
        type: "SET_RESULT_PROMPT_VALUE",
        payload: {
            changes: {
                xpGain: xpGain
            }
        }
    });
    

}