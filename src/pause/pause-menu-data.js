import {isLevelupEligible} from '../level-up/levelup-utilities'
import Attacks from '../battles/actions/attacks'
import Items from '../battles/actions/items'

var PauseMenuData = {
    /* The structure of these objects will not be the same. Different functionalities */
    "pauseRoot": [
        {
            id: "pauseRoot-stats",
            label: "STATS",
            isVerticalMovement: false,
            isHorizontalMovement: true,
            downKeyDest: ["pauseStatsMenu", "pauseStats-health"],
            leftKeyDest: ["pauseSidebarMenu", "pauseSidebarMenu-save"/* */]
            //"rightKeyDest": ["pauseStatsMenu", "pauseStats-health"]
        },
        {
            id: "pauseRoot-laptop",
            label: "LAPTOP",
            isVerticalMovement: false,
            isHorizontalMovement: true,
            infoBoxDescription: "Your laptop can be configured with parts and components.",
            //downKeyDest: ["TODO:whateverLaptopMenu", "TODO:whateverLaptopMenuItem"]
        },
        {
            id: "pauseRoot-attacks",
            label: "ATTACKS",
            isVerticalMovement: false,
            isHorizontalMovement: true,
            downKeyDest: ["pauseAttacksMenu", "pauseAttacks-action_attack_basic_001"]
        },
        {
            id: "pauseRoot-items",
            label: "ITEMS",
            isVerticalMovement: false,
            isHorizontalMovement: true,
            downKeyDest: ["pauseItemsMenu", "pauseItems-action_item_hp_001"]
        }
    ],

    "pauseSidebarMenu": [
        {
            id: "pauseSidebarMenu-levelup",
            isVerticalMovement: true,
            isHorizontalMovement: false,
            rightKeyDest: ["pauseRoot", "pauseRoot-stats"]
        },
        {
            id: "pauseSidebarMenu-save",
            isVerticalMovement: true,
            isHorizontalMovement: false,
            rightKeyDest: ["pauseRoot", "pauseRoot-stats"]
        },
        {
            id: "pauseSidebarMenu-load",
            isVerticalMovement: true,
            isHorizontalMovement: false,
            rightKeyDest: ["pauseRoot", "pauseRoot-stats"]
        }
    ],



    "pauseStatsMenu": [
        {
            id: "pauseStats-health",
            label: "Health",
            statId: "healthStatPoints",
            infoBoxTitle: "Health",
            infoBoxDescription: "Increases maximum battery health points (HP). Battles are lost when HP is depleted",
            upKeyDest: ["pauseRoot", "pauseRoot-stats"]
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
            infoBoxDescription: "Increases maximum battery health points (HP). Battles are lost when HP is depleted",
            //No destination here yet for now. Not sure what we'll do here when on Level Up menu
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
            upKeyDest: ["pauseRoot", "pauseRoot-attacks"]
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
        {
            ...mergeItemData("action_item_hp_001"),
            upKeyDest: ["pauseRoot", "pauseRoot-items"]
        },
        {...mergeItemData("action_item_accuracy_001")},
        {...mergeItemData("action_item_clearStatus_lag_001")},
        {...mergeItemData("action_item_clearStatus_memoryLeak_001")},
        {...mergeItemData("action_item_sticker_attack_001")},
        {...mergeItemData("action_item_sticker_defense_001")},
        {...mergeItemData("action_item_sticker_speed_001")},
    ]

};

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

export function getMenuNode(menuKey="", id="", dataset) {
    const match = dataset[menuKey].filter(item => {
        return item.id == id;
    });
    return (match.length) ? match[0] : null;
};

export function getCensoringList(key="", dataset) {
    if (key !="pauseSidebarMenu") {
        return [...dataset[key]];
    }

    /* If able to level up, return the full list including the Level Up button on top*/
    if (isLevelupEligible()) {
        return [...dataset.pauseSidebarMenu]
    }
    /* Otherwise, return the list without Level Up */
    //console.log(dataset)
    return dataset.pauseSidebarMenu.filter(tab => { return tab.id != "pauseSidebarMenu-levelup" })
};



export default PauseMenuData;