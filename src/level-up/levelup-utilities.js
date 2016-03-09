import store from '../init/store'
import LevelMap from './level-map' /* Array of milestones */

function skillPointsAvailable(level=1) {
    /* Start with 5, then +1, +2, +1, +2, etc */
    switch(level) {
        case 1: return 5;
        case 2: return 6;
        case 3: return 8;
        case 4: return 9;
        case 5: return 11;
        case 6: return 12;
        case 7: return 14;
        case 8: return 15;
        case 9: return 17;
        case 10: return 18;

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