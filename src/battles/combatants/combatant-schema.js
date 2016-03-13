export default {
    isChallenger: false,

    hp: 50,
    maxHp: 50,

    pp: 999, /* Not really using PP for Alpha. The mechanism does work though */
    maxPp: 999,

    xp: 0,
    level: 1,
    status: "normal", /* poisoned, etc */
    healthStatPoints: 0,
    attackStatPoints: 0,
    defenseStatPoints: 0,
    speedStatPoints: 0,
    efficiencyStatPoints: 0,
    healthModifier: 0,
    attackModifier: 0,
    defenseModifier: 0,
    speedModifier: 0,
    efficiencyModifier: 0,
    accuracyModifier: 0,

    upgrades: [
        /* in other words, your laptop parts */
    ],

    attacks: [
        "action_attack_basic_001",
        "action_attack_basic_002",
        "action_attack_repetitions_001",
        "action_attack_repetitions_002",
        "action_attack_status_001",
        "action_attack_status_002",
        "action_attack_theft_001",
        "action_attack_theft_002"

        //"action_naturaleffect_memoryLeak_001", You cant actually submit this. It happens Naturally
    ],
    items: [
        "action_item_hp_001",
        "action_item_pp_001",
        "action_item_accuracy_001",

        //"action_item_sticker_attack_001",
        //"action_item_sticker_defense_001",
        //"action_item_sticker_speed_001",
        //"action_item_sticker_efficiency_001",

        "action_item_clearStatus_lag_001",
        //"action_item_clearStatus_memoryLeak_001"
    ],

    /* Battle Status */
    targeting: ""
}