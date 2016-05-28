/* Player starts the game with these values: */
export default {
    name: "Jacob",
    skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/svJacob-2.svg",
    level: 1,
    hp: 25,
    maxHp: 25,

    pp: 1, //20,
    maxPp: 20,

    xp: 0, //0,
    coins: 10,

    healthStatPoints: 3,
    attackStatPoints: 3,  //3,
    defenseStatPoints: 3,
    speedStatPoints: 3,
    efficiencyStatPoints: 3,

    attacks: [
        "action_attack_basic_001",
        "action_attack_theft_001"
    ],
    items: ["action_item_hp_001"]
}