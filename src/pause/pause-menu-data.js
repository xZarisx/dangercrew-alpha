import Attacks from '../battles/actions/attacks'

export default {
    /* The structure of these objects will not be the same. Different functionalities */
    "pauseRoot": [
        {
            "id": "pauseRoot-stats",
            "label": "STATS",
            "pageTitle": "Stats & Skills",
            "rightKeyDest": "pauseStats-health"
        },
        {
            "id": "pauseRoot-laptop",
            "label": "LAPTOP",
            "pageTitle": "Laptop",
            //"rightKeyDest": "pauseStats-whateverFirstOptionIdIs"
            infoBoxDescription: "Your laptop can be configured with parts and components."
        },
        {
            "id": "pauseRoot-attacks",
            "label": "ATTACKS",
            "pageTitle": "Attacks",
            //"rightKeyDest": "pauseStats-health"
        },
        {
            "id": "pauseRoot-items",
            "label": "ITEMS",
            "pageTitle": "Items",
            //"rightKeyDest": "pauseStats-health"
        }
        /* Some day: MAP?, SAVE GAME? */
    ],

    "pauseStatsMenu": [
        {
            id: "pauseStats-health",
            label: "Health",
            infoBoxTitle: "Health",
            infoBoxDescription: "--Some description for health--"
        },
        {
            id: "pauseStats-attack",
            label: "Attack",
            infoBoxTitle: "Attack",
            infoBoxDescription: "--Some description for attack--"
        },
        {
            id: "pauseStats-defense",
            label: "Defense",
            infoBoxTitle: "Defense",
            infoBoxDescription: "--Some description for defense--"
        },
        {
            id: "pauseStats-speed",
            label: "Speed",
            infoBoxTitle: "Speed",
            infoBoxDescription: "--Some description for speed--"
        },
        {
            id: "pauseStats-efficiency",
            label: "Efficiency",
            infoBoxTitle: "Efficiency",
            infoBoxDescription: "--Some description for eff--"
        }
    ],


    "pauseAttacksMenu": [ /* Order these however you want them later */
        {
            ...mergeAttackData("action_attack_basic_001"),
            levelRequirement: 1,
        },
        {
            ...mergeAttackData("action_attack_theft_001"),
            levelRequirement: 1,
        },
        {
            ...mergeAttackData("action_attack_repetitions_001"),
            levelRequirement: 2,
        },
        {
            ...mergeAttackData("action_attack_status_002"),
            levelRequirement: 3,
        },
        {
            ...mergeAttackData("action_attack_basic_002"),
            levelRequirement: 3,
        },
        {
            ...mergeAttackData("action_attack_status_001"),
            levelRequirement: 4,
        },
        {
            ...mergeAttackData("action_attack_theft_002"),
            levelRequirement: 6,
        },
        {
            ...mergeAttackData("action_attack_repetitions_002"),
            levelRequirement: 7,
        },

    ]
}

function mergeAttackData(id) {
    return {
        id: `pauseAttacks-${id}`, //for cursoring stuff
        attackId: id, //for checking if turned on/off
        name: Attacks[id].name,
        description: Attacks[id].description
    }
};