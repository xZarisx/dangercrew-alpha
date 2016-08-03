/* Player starts the game with these values: */
export default {
    name: "Jacob",
    skin: "/dist/assets/people/svJacob-2.svg",
    level: 1,
    hp: 25,
    maxHp: 25,

    pp: 20, //20,
    maxPp: 20,

    xp: 0, //0,
    coins: 10,

    healthStatPoints: 3,
    attackStatPoints: 5,//pumped for the demo  //3,
    defenseStatPoints: 3,
    speedStatPoints: 3,
    efficiencyStatPoints: 3,

    //For React Rally:
    accuracyModifier: 1000, //be super accurate

    attacks: [
        "action_attack_basic_001",
        "action_attack_theft_001"
    ],
    items: ["action_item_hp_001"]
}