import Actions from '../actions/battle-actions'
import shuffleArray from '../../helpers/shuffle-array'

/* Used to identify the best items */
export function getBestItems(items=[], quantity=1) {
    const valueMap = items.map(item => {
       return {
           id: item,
           value: Actions[item].itemValue
       }
    }).sort(function(a, b) {
        return a.value - b.value;
    }).reverse().map(item => {
        return item.id
    });

    return [...valueMap].slice(0,quantity)
}

/* Used to identify the worst items */
export function getWorstItems(items=[], quantity=1) {
    const valueMap = items.map(item => {
        return {
            id: item,
            value: Actions[item].itemValue
        }
    }).sort(function(a, b) {
        return a.value - b.value;
    }).map(item => {
        return item.id
    });
    return [...valueMap].slice(0,quantity)
}

/* Used to identify the worst items */
export function getRandomItems(items=[], quantity=1) {
    const shuffledItems = shuffleArray(items);
    return shuffledItems.slice(0,quantity)
}