import store from '../../../init/store'

export default function() {
    /* Get the challenger combatatant */
    const combatants = store.getState().combatants;
    const challenger = Object.keys(combatants).filter(c => {
        return combatants[c].isChallenger
    })[0];

    const notChallenger = Object.keys(combatants).filter(c => {
        return !combatants[c].isChallenger
    })[0];

    return `[FAST]${combatants[challenger].name} challenges ${combatants[notChallenger].name} to a HACK BATTLE`
}