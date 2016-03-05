export default function(items=[], targets=[]) {
    /* Remove any of targets from items */
    targets.forEach(target => {
        if (items.indexOf(target) != -1) {
            items.splice(items.indexOf(target), 1)
        }
    });
    return [...items];
}