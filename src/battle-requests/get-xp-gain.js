export default function getXpGain(combatant={}) {
    const {
        level,
        attackStatPoints,
        defenseStatPoints,
        speedStatPoints,
        efficiencyStatPoints
    } = combatant;

    const levelValue = level * 5;
    const statValue = (attackStatPoints + defenseStatPoints + speedStatPoints + efficiencyStatPoints) * 2;

    return levelValue + statValue;
};
