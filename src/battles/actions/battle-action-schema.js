export default {
    name: "",
    description: "",
    animation: "tada",


    //Cost
    ppCost: 0,

    //Combatant Stats /* rolls will affect these too */
    affectTargetHpPoints: 0,
    affectTargetHpPointsByPercent: 0,
    affectTargetAttackPoints: 0,
    affectTargetDefensePoints: 0,
    affectTargetSpeedPoints: 0,
    affectTargetEfficiencyPoints: 0,
    affectTargetAccuracyPoints: 0,

    affectCasterHpPoints: 0,
    affectCasterHpPointsByPercent: 0,
    affectCasterAttackPoints: 0,
    affectCasterDefensePoints: 0,
    affectCasterSpeedPoints: 0,
    affectCasterEfficiencyPoints: 0,
    affectCasterAccuracyPoints: 0,

    //Neglect
    neglectAttackStat: false,


    //Item stats
    itemValue: 0,
    itemMalfunctionChance: 0,

    //statuses
    protectTargetFromStatuses: [],
    clearTargetStatuses: [],

    protectCasterFromStatuses: [],
    clearCasterStatuses: [],

    affectTargetStatus: "normal",
    statusTurnCount: [], /* [min, max] */

    //Theft
    theftQuantity: 0,
    theftQuality: "random", /* best, worst */
    targetResistanceNeeded: 0, /* target needs defense roll higher than this (?), or it will fail */

    //Turn status
    repetitions: [], /* [1, 4*/
    speedModifier: 0,
    accuracyModifier: 0,

    //Natural
    isNaturalStatusEvent: false,
    submittedByStatus: null



}