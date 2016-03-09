import store from '../init/store'
import LevelMap from './level-map' /* Array of milestones */


export function remainingXpUntilNextLevel() {
    const playerData = store.getState().playerData;
    const difference = LevelMap[playerData.level+1] - playerData.xp;
    return difference > 0 ? difference : 0;
}

/* isLevelupEligible */
export function isLevelupEligible() {
    const playerData = store.getState().playerData;
    return playerData.xp >= LevelMap[playerData.level]; /* Matches or passes next milestone */
}