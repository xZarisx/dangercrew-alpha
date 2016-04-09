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
        type: "MERGE_VISITED_MAP_STORYPOINT",
        payload: {
            key: "visitedMaps",
            changes: {...changes}
        }
    })
}