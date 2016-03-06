import store from '../init/store'
import {randomFromArray} from '../helpers/random-from-array'
import {percentChance} from '../helpers/numbers-helper'

/* people data */
import People from '../_data/people/people'


/* These are temporary for Alpha. */
/* In real game, need to maybe match these to real personalities in a database */
//const people = [
//    {name: "Drew", skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew.svg"},
//    {name: "Berg", skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-orange.svg"},
//    {name: "Travis", skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-blonde.svg"},
//    {name: "Punky", skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-blonde.svg"},
//    {name: "Jessie", skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/jessie.svg"},
//    {name: "Marie", skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/jessie-blue.svg"},
//];
//const levels = [2,2,3,3,4,4,5,6];

const probability = [
    "berg",
    "drew", "drew",
    "punky", "punky", "punky", "punky",
    "jessie", "jessie",
    "marie", "marie"
];



export default function(action={}) {

    /* Ignore handler if already showing a request */
    if (store.getState().battleRequests.showRequest) {
        return false;
    }

    /* Roll to see if request is triggered */
    if (percentChance(66)) { //66 percent chance nothing will happen
        return false;
    }

    const challenger_id = randomFromArray(probability);
    const challenger = {
        ...People[challenger_id]
    };
    //console.log(challenger)
    store.dispatch({
        type: "SET_BATTLE_REQUEST",
        payload: {
            requesterId: challenger_id,
            requesterName: challenger.name,
            requesterSkin: challenger.skin,
            requesterLevel: challenger.level
        }
    })


}