export function addQueuedSubmissions(queue=[], submission, turnsToWait=1) {
    if (turnsToWait < 1) {
        console.warn('turnsToWait must be 1 or more ');
        return [];
    }

    var train = [];
    for (var i=0; i<= turnsToWait-1; i++) {
        if (queue[i] && queue[i].length) {
            train.push( [...queue[i] ]);
        } else {
            train.push( [] )
        }
    }

    var copy = [...train];
    copy[turnsToWait-1] = [ ...copy[turnsToWait-1], submission ];

    return copy;
}

export function extractQueuedSubmissions(queue=[]) {
    /* Check the first in queue line for submissions. Return array of submissions or empty array */
    return queue.length ? queue[0] : [];
}

export function removeQueueSlot(queue=[]) {
    /* Move the queue train forward by removing the first in the queue*/
    return queue.filter((d,i) => {return i > 0});
}