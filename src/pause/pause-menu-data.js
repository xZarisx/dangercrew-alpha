import {isLevelupEligible} from '../level-up/levelup-utilities'
import Attacks from '../battles/actions/attacks'
import Items from '../battles/actions/items'

export default {
    /* The structure of these objects will not be the same. Different functionalities */

    getCensoringList: function(key="") {
        if (key !="pauseRoot") {
            return [...this[key]];
        }

        /* If able to level up, return a list without the Stats tab */
        if (isLevelupEligible()) {
            return this.pauseRoot.filter(tab => { return tab.id != "pauseRoot-stats" })
        }
        /* Otherwise, return a list without Level Up */
        return this.pauseRoot.filter(tab => { return tab.id != "pauseRoot-levelup" })
    },

    "pauseRoot": [
        {
            "id": "pauseRoot-levelup",
            "label": "LEVEL UP!",
            "pageTitle": "Level Up",
            //"rightKeyDest": ["pauseLevelUpMenu", "pauseLevelUp-health"] //Hit Enter instead
        },
        {
            "id": "pauseRoot-stats",
            "label": "STATS",
            "pageTitle": "Stats & Skills",
            "rightKeyDest": ["pauseStatsMenu", "pauseStats-health"]
        },
        {
            "id": "pauseRoot-laptop",
            "label": "LAPTOP",
            "pageTitle": "Laptop",
            //"rightKeyDest": "pauseStats-whateverFirstOptionIdIs"
            "infoBoxDescription": "Your laptop can be configured with parts and components."
        },
        {
            "id": "pauseRoot-attacks",
            "label": "ATTACKS",
            "pageTitle": "Attacks",
            "rightKeyDest": ["pauseAttacksMenu", "pauseAttacks-action_attack_basic_001"]
        },
        {
            "id": "pauseRoot-items",
            "label": "ITEMS",
            "pageTitle": "Items",
            "rightKeyDest": ["pauseItemsMenu", "pauseItems-action_item_hp_001"]
        }
        /* Some day: MAP?, SAVE GAME? */
    ],

    "pauseStatsMenu": [
        {
            id: "pauseStats-health",
            label: "Health",
            statId: "healthStatPoints",
            infoBoxTitle: "Health",
            infoBoxDescription: "Increases maximum battery health points (HP). Battles are lost when HP is depleted"
        },
        {
            id: "pauseStats-attack",
            label: "Attack",
            statId: "attackStatPoints",
            infoBoxTitle: "Attack",
            infoBoxDescription: "Increases damage caused by outgoing commands"
        },
        {
            id: "pauseStats-defense",
            label: "Defense",
            statId: "defenseStatPoints",
            infoBoxTitle: "Defense",
            infoBoxDescription: "Reduces incoming damage. Can potentially thwart enemy attacks"
        },
        {
            id: "pauseStats-speed",
            label: "Speed",
            statId: "speedStatPoints",
            infoBoxTitle: "Speed",
            infoBoxDescription: "Determines which combatant will strike first"
        },
        {
            id: "pauseStats-efficiency",
            label: "Efficiency",
            statId: "efficiencyStatPoints",
            infoBoxTitle: "Efficiency",
            infoBoxDescription: "Increases benefits of items and reduces cost of high value attacks"
        }
    ],

    "pauseLevelUpMenu": [
        {
            id: "pauseLevelUp-health",
            label: "Health",
            statId: "healthStatPoints",
            infoBoxTitle: "Health",
            infoBoxDescription: "Increases maximum battery health points (HP). Battles are lost when HP is depleted"
        },
        {
            id: "pauseLevelUp-attack",
            label: "Attack",
            statId: "attackStatPoints",
            infoBoxTitle: "Attack",
            infoBoxDescription: "Increases damage caused by outgoing commands"
        },
        {
            id: "pauseLevelUp-defense",
            label: "Defense",
            statId: "defenseStatPoints",
            infoBoxTitle: "Defense",
            infoBoxDescription: "Reduces incoming damage. Can potentially thwart enemy attacks"
        },
        {
            id: "pauseLevelUp-speed",
            label: "Speed",
            statId: "speedStatPoints",
            infoBoxTitle: "Speed",
            infoBoxDescription: "Determines which combatant will strike first"
        },
        {
            id: "pauseLevelUp-efficiency",
            label: "Efficiency",
            statId: "efficiencyStatPoints",
            infoBoxTitle: "Efficiency",
            infoBoxDescription: "Increases benefits of items and reduces cost of high value attacks"
        },
        {
            id: "pauseLevelUp-done",
            label: "Done",
            infoBoxTitle: null,
            infoBoxDescription: null,
            //A few extra properties for the done button */
            bypassArrows: true,
            rowClass: "pause-levelup-done"
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
        }
    ],

    "pauseItemsMenu": [
        {...mergeItemData("action_item_hp_001")},
        {...mergeItemData("action_item_accuracy_001")},
        {...mergeItemData("action_item_clearStatus_lag_001")},
        {...mergeItemData("action_item_clearStatus_memoryLeak_001")},
        {...mergeItemData("action_item_sticker_attack_001")},
        {...mergeItemData("action_item_sticker_defense_001")},
        {...mergeItemData("action_item_sticker_speed_001")},
    ]


}

function mergeAttackData(id) {
    return {
        id: `pauseAttacks-${id}`, //for cursoring stuff
        attackId: id, //for checking if turned on/off
        name: Attacks[id].name,
        infoBoxTitle: Attacks[id].name,
        infoBoxDescription: Attacks[id].description
    }
}

function mergeItemData(id) {
    return {
        id: `pauseItems-${id}`, //for cursoring stuff
        itemId: id, //for checking if turned on/off
        name: Items[id].name,
        infoBoxTitle: Items[id].name,
        infoBoxDescription: Items[id].description
    }
}