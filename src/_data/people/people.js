const people = {
    drew: {
        name: "Drew",
        skin: "/dist/assets/people/drew.svg",
        level: 5,
        maxHp: 30,

        attackStatPoints: 2,
        defenseStatPoints: 1,
        speedStatPoints: 3,
        efficiencyStatPoints: 1,

        attacks: [
            "action_attack_basic_001",
            "action_attack_status_002",
            "action_attack_repetitions_001"
        ]
    },
    berg: {
        name: "Berg",
        skin: "/dist/assets/people/drew-orange.svg",
        level: 8,
        maxHp: 75,

        attackStatPoints: 6,
        defenseStatPoints: 4,
        speedStatPoints: 3,
        efficiencyStatPoints: 2,

        attacks: [
            "action_attack_basic_002",
            "action_attack_status_001",
            "action_attack_repetitions_002"
        ]
    },
    punky: {
        name: "Punky",
        skin: "/dist/assets/people/drew-blonde.svg",
        level: 2,
        maxHp: 18,

        attackStatPoints: 1,
        defenseStatPoints: 0,
        speedStatPoints: 0,
        efficiencyStatPoints: 3,

        attacks: [
            "action_attack_basic_001",
            //Just for the demo: lots of CURLs
            "action_attack_theft_001",
            "action_attack_theft_001",
            "action_attack_theft_001"
            //"action_attack_repetitions_001"
        ]
    },
    jessie: {
        name: "Jessie",
        skin: "/dist/assets/people/jessie.svg",
        level: 4,
        maxHp: 39,

        attackStatPoints: 1,
        defenseStatPoints: 3,
        speedStatPoints: 2,
        efficiencyStatPoints: 1,

        attacks: [
            "action_attack_theft_001",
            "action_attack_basic_001",
            "action_attack_repetitions_001"
        ]
    },
    marie: {
        name: "Marie",
        skin: "/dist/assets/people/jessie-blue.svg",
        level: 6,
        maxHp: 52,

        attackStatPoints: 3,
        defenseStatPoints: 5,
        speedStatPoints: 4,
        efficiencyStatPoints: 1,

        attacks: [
            "action_attack_theft_002",
            "action_attack_status_001",
            "action_attack_basic_002",
            "action_attack_basic_002"
        ]
    }
};

export default people;