import store from '../init/store'

/* Return the new maxHp value based on next level and existing stats */
export default function(level=1) {
    const playerData = {...store.getState().playerData};

    const levelBoost = level * 3;
    const statBoost = Math.round( (playerData.healthStatPoints * 3) / 2); //1.5 (round up) HP points for every stat boost

    return 17 + levelBoost + statBoost; /* Starting at 17, because 3 * Level 1 == 20 */
}