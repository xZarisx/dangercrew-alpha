import {
    getNextDirection,
    getSegmentToDestination,
    getFreeDirections,
    getSegmentUntilBlocker,
    getSegmentUntilOpening
} from './path-finder'


var sequence = function(currentPos, destinationPosition, previousDir=null, blockers) {

    /* Get the next direction to go */
    const newDirection = getNextDirection(currentPos, destinationPosition, previousDir, blockers);
    //console.log('nD', newDirection)

    const myFreeDirections = getFreeDirections(currentPos, blockers);

    if (myFreeDirections.indexOf(newDirection) > -1) {
        //I am free to move in desired direction


        /* Attempt to hit the target */
        const directPath = getSegmentToDestination(currentPos, destinationPosition, newDirection, blockers);

        if (directPath) {
            return directPath;
        }

        /* Match the relevant X or relevant Y */
        const currentX = currentPos.split('x')[0];
        const currentY = currentPos.split('x')[1];
        const destinationX = destinationPosition.split('x')[0];
        const destinationY = destinationPosition.split('x')[1];

        const destinationMatch = (newDirection == "left" || newDirection == "right")
            ? `${destinationX}x${currentY}`
            : `${currentX}x${destinationY}`;

        const lineupPath = getSegmentToDestination(currentPos, destinationMatch, newDirection, blockers);

        if (lineupPath) {
            return lineupPath
        }

        return getSegmentUntilBlocker(currentPos, newDirection, blockers);

    } else {

        //I need to scan alternatives
        const intentA = (newDirection == "left" || newDirection == "right") ? "up" : "left";
        const intentB = (newDirection == "left" || newDirection == "right") ? "down" : "right";
        const alt1 = getSegmentUntilOpening(currentPos, intentA, newDirection, blockers);
        const alt2 = getSegmentUntilOpening(currentPos, intentB, newDirection, blockers);

        if (alt1 && alt2) {
            //console.log( (alt1.distance < alt2.distance) ? "alt1" : "alt2")
            //console.log('both availble', intentA)
            return (alt1.distance < alt2.distance) ? alt1 : alt2;
        }

        if (alt1 && !alt2) {
            //console.log('alt1')
            return alt1;
        }

        if (!alt1 && alt2) {
            //console.log('alt2')
            return alt2;
        }

        return null

    }




};

export function getPath(startingPosition="", destinationPosition="", blockers={}) {

    var getSteps = function() {

        var progress = [
            sequence(startingPosition,destinationPosition, null, blockers)
        ];

        var step = function() {
            const model = progress[progress.length-1];
            if (model) {

                const nextStep = sequence(model.newPos, destinationPosition, model.dir, blockers);
                progress.push(nextStep);
                if (nextStep && nextStep.newPos != destinationPosition) {
                    step();
                }
            }
        };
        step();

        return progress[progress.length-1] ? progress : null; /* impossible to find should be null */
    };

    var steps = getSteps();

    /* Can't find a path */
    if (!steps) {
        return null;
    }

    var directions = [];
    steps.forEach(model => {
        for (var i=1; i<=model.distance; i++) {
            directions.push(model.dir)
        }
    });

    return directions;
}