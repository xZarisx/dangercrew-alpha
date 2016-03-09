import store from '../init/store'
import LevelMap from './level-map' /* Array of milestones */

export function totalSkillPoints() {
    /* (5 * 1) + (5 * 2) */
    return 15
}

/* If odd level, gain 2 points */
/* If even level, gain 1 point */


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