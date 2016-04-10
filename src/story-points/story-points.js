export function hasWonBattle(storyPoints, id="") {
    const battles = storyPoints.battles;
    if (!battles[id]) {
        return false;
    }
    return (battles[id].wins && battles[id].wins > 0) ? true : false;
}

export function hasAcquiredBattleWinCount(storyPoints, expectedCount=0) {
    const battles = storyPoints.battles;
    var winsCount = 0;
    Object.keys(battles).forEach(opponent => {
        const model = battles[opponent]
        winsCount = winsCount + model.wins;
    });
    return winsCount >= expectedCount;
}

function nodeExists(structure={}, categoryKey="", requestedKey="") {
    const category = structure[categoryKey];
    return (typeof category[requestedKey] != "undefined");
}


export function hasAcquiredItem(storyPoints, id="") {
    return nodeExists(storyPoints, "acquiredItems", id);
}
export function hasFoundPackage(storyPoints, id="") {
    return nodeExists(storyPoints, "foundPackages", id);
}
export function hasVisitedMap(storyPoints, id="") {
    return nodeExists(storyPoints, "visitedMaps", id);
}

/* QUERY LANGUAGE */
import store from '../init/store'
export function doesHaveStoryPoint(queryStr="") {

    /* EX: "hasVisitedMap::alphaStreet" */
    if (/hasVisitedMap::/.test(queryStr)) {
        const mapId = queryStr.split("hasVisitedMap::")[1];
        return hasVisitedMap(store.getState().storyPoints, mapId);
    }

    /* EX: "hasFoundPackage::package_00whatever" */
    if (/hasFoundPackage::/.test(queryStr)) {
        const packageId = queryStr.split("hasFoundPackage::")[1];
        return hasFoundPackage(store.getState().storyPoints, packageId);
    }
    return false;
}

export function doesNotHaveStoryPoint(queryStr="") {
    return !doesHaveStoryPoint(queryStr); /* return the opposite of having the query */
}