import store from '../init/store'
import {hasVisitedMap} from '../story-points/story-points'

export function addVisitedMap(id="") {

    if (hasVisitedMap(store.getState().storyPoints, id)) {
        /* Don't add this map, we've already added it */
        return;
    }

    var changes = {};
    changes[id] = {
        firstAcquiredAt: Date.now()
    };

    store.dispatch({
        type: "MERGE_STORYPOINT",
        payload: {
            key: "visitedMaps",
            changes: {...changes}
        }
    });
}


export function addBattleResult(opponentId="", result="") {

    if (!opponentId) {
        console.warn("opponentId parameter not being called correctly. Cant be blank.");
        return;
    }

    if (result != "win" && result != "loss") {
        console.warn("result parameter not being called correctly. Use 'win' or 'loss'");
        return;
    }

    const initialBattlesState = {...store.getState().storyPoints.battles};
    const previousWins = initialBattlesState[opponentId] ? initialBattlesState[opponentId].wins : 0;
    const previousLosses = initialBattlesState[opponentId] ? initialBattlesState[opponentId].losses : 0;

    const updatedBattleNode = {
        wins: previousWins + (result == "win" ? 1 : 0),
        losses: previousLosses + (result == "loss" ? 1 : 0),
        lastBattlePlayed: Date.now()
    };

    var changes = {...initialBattlesState};
    changes[opponentId] = {...updatedBattleNode};

    store.dispatch({
        type: "MERGE_STORYPOINT",
        payload: {
            key: "battles",
            changes: {...changes}
        }
    });

}