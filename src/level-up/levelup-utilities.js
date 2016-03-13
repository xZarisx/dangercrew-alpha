import store from '../init/store'
import LevelMap from './level-map' /* Array of milestones */
import getMaxHp from './get-max-hp'

function skillPointsAvailable(level=1) {
    /* Start with 5, then +1, +2, +1, +2, etc */
    // switch(level) {
    //     case 1: return 5;
    //     case 2: return 6;
    //     case 3: return 8;
    //     case 4: return 9;
    //     case 5: return 11;
    //     case 6: return 12;
    //     case 7: return 14;
    //     case 8: return 15;
    //     case 9: return 17;
    //     case 10: return 18;
    //
    //     default: return 0;
    // }
    switch(level) {
        case 1: return 15;
        case 2: return 16;
        case 3: return 18;
        case 4: return 19;
        case 5: return 21;
        case 6: return 22;
        case 7: return 24;
        case 8: return 25;
        case 9: return 27;
        case 10: return 28;

        default: return 0;
    }
}

/* Available points - Points applied   */
export function skillPointsRemaining() {
    const playerData = store.getState().playerData;
    const totalSkillPoints = [
        playerData.healthStatPoints,
        playerData.attackStatPoints,
        playerData.defenseStatPoints,
        playerData.speedStatPoints,
        playerData.efficiencyStatPoints
    ].reduce((a,b)=> {return a+b});

    return skillPointsAvailable(playerData.level+1) - totalSkillPoints;
}



export function remainingXpUntilNextLevel() {
    const playerData = store.getState().playerData;
    const difference = LevelMap[playerData.level+1] - playerData.xp;
    return difference > 0 ? String(difference) : "--";
}

/* isLevelupEligible */
export function isLevelupEligible() {
    const playerData = store.getState().playerData;
    return playerData.xp >= LevelMap[playerData.level+1]; /* Matches or passes next milestone */
}

/* Action Creator */
function setPlayerDataValue(changes={}) {
    store.dispatch({
        type: "SET_PLAYERDATA_VALUE",
        payload: {
            changes: changes
        }
    })
}

export function incrementStatPoint(stat, oldValue, maximum) {
    //console.log('change', stat, 'to', oldValue+1);

    /* Don't let number be higher than maximum */
    if (oldValue + 1 > maximum) {
        return false;
    }

    if ( skillPointsRemaining() > 0 ) {
        var changes = {};
        changes[stat] = oldValue + 1;
        setPlayerDataValue(changes);
    }
}

export function decrementStatPoint(stat, oldValue, minimum) {

    /* Don't let number go below the minimum */
    if (oldValue - 1 < minimum) {
        return false;
    }

    var changes = {};
    changes[stat] = oldValue-1;
    setPlayerDataValue(changes);
}

export function resetStatPoints(statPoints={}) {
    setPlayerDataValue({...statPoints});
}


export function submitLevelUp() { /* impure? */

    const playerLevel = store.getState().playerData.level;
    const newMaxHp = getMaxHp(playerLevel + 1);
    console.log(newMaxHp)

    if (playerLevel < 10) { /* Limiting to Level 10 for Alpha */
        setPlayerDataValue({
            level: playerLevel + 1,
            maxHp: newMaxHp,
            hp: newMaxHp /* Level up - refill your HP bonus! */
        });
    }
}