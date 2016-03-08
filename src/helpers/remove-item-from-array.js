export default function(itemList=[], targets=[]) {
    /* Remove any of targets from items */
    const items = [...itemList];
    targets.forEach(target => {
        if (items.indexOf(target) != -1) {
            items.splice(items.indexOf(target), 1)
        }
    });
    return [...items];
}