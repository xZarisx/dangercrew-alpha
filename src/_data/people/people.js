const people = {
    drew: {
        name: "Drew",
        skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew.svg",
        level: 5,
        maxHp: 30,

        attackStatPoints: 2,
        defenseStatPoints: 1,
        speedStatPoints: 3,

        attacks: [
            "action_attack_basic_001",
            "action_attack_status_002",
            "action_attack_repetitions_001"
        ]
    },
    berg: {
        name: "Berg",
        skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-orange.svg",
        level: 8,
        maxHp: 75,

        attackStatPoints: 6,
        defenseStatPoints: 4,
        speedStatPoints: 3,

        attacks: [
            "action_attack_basic_002",
            "action_attack_status_001",
            "action_attack_repetitions_002"
        ]
    },
    punky: {
        name: "Punky",
        skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/drew-blonde.svg",
        level: 2,
        maxHp: 26,

        attackStatPoints: 1,
        defenseStatPoints: 1,
        speedStatPoints: 1,

        attacks: [
            "action_attack_basic_001",
            "action_attack_theft_001",
            "action_attack_repetitions_001"
        ]
    },
    jessie: {
        name: "Jessie",
        skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/jessie.svg",
        level: 4,
        maxHp: 39,

        attackStatPoints: 1,
        defenseStatPoints: 3,
        speedStatPoints: 2,

        attacks: [
            "action_attack_theft_001",
            "action_attack_basic_001",
            "action_attack_repetitions_001"
        ]
    },
    marie: {
        name: "Marie",
        skin: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/jessie-blue.svg",
        level: 6,
        maxHp: 52,

        attackStatPoints: 3,
        defenseStatPoints: 5,
        speedStatPoints: 4,

        attacks: [
            "action_attack_theft_002",
            "action_attack_status_001",
            "action_attack_basic_002",
            "action_attack_basic_002"
        ]
    }
};

export default people;