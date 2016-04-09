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
export function hasVisitedMap(storyPoints, id="") {
    return nodeExists(storyPoints, "visitedMaps", id);
}