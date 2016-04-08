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