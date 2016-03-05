import store from '../../init/store'
import Actions from '../../battles/actions/battle-actions'

const baseMenuItems = [
    {
        label: "Attack...",
        description: null,
        nextView: "menuAttacks"
    },
    {
        label: "Items...",
        description: null,
        nextView: "menuItems"
    }
];

const backItem = {
    label: "(back)",
    isBackControl: true,
    nextView: "menuRoot"
};


function formatItemsWithQuantity(items=[]) { /* This could be exported as a public function in the future if needbe. For an inventory menu or something */
    var sorted = [];

    items.forEach(i => {

        const isAlreadySorted = sorted.filter(sortedItem => {return sortedItem.actionId == i}).length > 0;
        const occurances = items.filter(id => {return id==i}).length;

       if (!isAlreadySorted) {
           const action = Actions[i];
           sorted.push({
               label: action.name,
               description: action.description,
               quantity: occurances,
               actionId: i
           });
       }
    });

    return sorted;
}


export default function(playerId="") {
    const combatant = store.getState().combatants[playerId];

    if (!combatant) {
        console.warn('player combatant not found in `getSubmissionMenuData`')
    }

    const attacks = combatant.attacks.map(attack => {
        const action = Actions[attack];
        return {
            label: action.name,
            ppCost: action.ppCost,
            description: action.description,
            actionId: attack
        }
    });

    const items = formatItemsWithQuantity(combatant.items);

    return {
        menuRoot: {
            title: "Commands",
            items: baseMenuItems
        },
        menuAttacks: {
            title: "Commands > Attacks",
            items: [
                ...attacks,
                {...backItem}
            ]
        },
        menuItems: {
            title: "Commands > Items",
            items: [
                ...items,
                {...backItem}
            ]
        }
    }
}