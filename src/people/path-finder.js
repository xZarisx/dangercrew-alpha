function getNewPositionFromDistance(position="", dir="", distance=0) {
    const xPos = parseInt(position.split('x')[0]);
    const yPos = parseInt(position.split('x')[1]);

    if (dir == "left") {
        return `${xPos - distance}x${yPos}`
    }
    if (dir == "right") {
        return `${xPos + distance}x${yPos}`
    }
    if (dir == "up") {
        return `${xPos}x${yPos - distance}`
    }
    if (dir == "down") {
        return `${xPos}x${yPos + distance}`
    }

}


export function getFreeDirections(position="", blockers={}) {
    const xPos = parseInt(position.split('x')[0]);
    const yPos = parseInt(position.split('x')[1]);

    const isUpTaken = Boolean(blockers[`${xPos}x${yPos-1}`]);
    const isDownTaken = Boolean(blockers[`${xPos}x${yPos+1}`]);
    const isLeftTaken = Boolean(blockers[`${xPos-1}x${yPos}`]);
    const isRightTaken = Boolean(blockers[`${xPos+1}x${yPos}`]);

    return ["up", "down", "left", "right"].filter(dir => {
        if (dir == "up") { return !isUpTaken && yPos -1 >= 0 }
        if (dir == "down") { return !isDownTaken }
        if (dir == "left") { return !isLeftTaken && xPos -1 >= 0 }
        if (dir == "right") { return !isRightTaken }
    });

}

export function getSegmentUntilBlocker(startingPosition="", dir="", blockers={}) {
    const startingXPos = parseInt(startingPosition.split('x')[0]);
    const startingYPos = parseInt(startingPosition.split('x')[1]);

    var hasCollided = false;
    var counter = 0;

    if (dir == "left" || dir == "right") {
        while (hasCollided == false && counter < 20) {
            counter += 1;
            const checkThisX = (dir == "left") ? startingXPos - counter : startingXPos + counter;
            const checkThisPos = `${checkThisX}x${startingYPos}`;

            if (Boolean(blockers[checkThisPos])) {
                hasCollided = true;
            }
        }
    }

    if (dir == "up" || dir == "down") {
        while (hasCollided == false && counter < 20) {
            counter += 1;
            const checkThisY = (dir=="up") ? startingYPos - counter : startingYPos + counter;
            const checkThisPos = `${startingXPos}x${checkThisY}`;

            if (Boolean(blockers[checkThisPos])) {
                hasCollided = true;
            }
        }
    }

    if (counter >= 20) {
        return null;
    }

    return {
        dir: dir,
        distance: counter - 1,
        newPos: getNewPositionFromDistance(startingPosition, dir, counter - 1)
    };

}


export function getSegmentUntilOpening(startingPosition="", dir="", intent="", blockers={}) {
    const startingXPos = parseInt(startingPosition.split('x')[0]);
    const startingYPos = parseInt(startingPosition.split('x')[1]);

    var hasOpeningForIntent = false;
    var counter = 0;

    /* Automatic fail if direction is not free */
    const freeDirections = getFreeDirections(startingPosition, blockers);
    if (freeDirections.indexOf(dir) == -1) {
        return null;
    }


    if (dir == "up" || dir == "down") {
        while (hasOpeningForIntent == false && counter < 20) {
            counter += 1;
            const checkThisY = (dir=="up") ? startingYPos - counter : startingYPos + counter;

            const intentX = (intent=="left") ? startingXPos-1 : startingXPos+1;
            const checkIntent = `${intentX}x${checkThisY}`;

            if (Boolean(blockers[`${startingXPos}x${checkThisY}`])) {
                return null;
            }

            if (!Boolean(blockers[checkIntent])) {
                hasOpeningForIntent = true;
            }
        }
    }

    if (dir == "left" || dir == "right") {
        while (hasOpeningForIntent == false && counter < 20) {
            counter += 1;
            const checkThisX = (dir=="left") ? startingXPos - counter : startingXPos + counter;

            const intentY = (intent=="up") ? startingYPos-1 : startingYPos+1;
            const checkIntent = `${checkThisX}x${intentY}`;

            if (Boolean(blockers[`${checkThisX}x${startingYPos}`])) {
                return null;
            }

            if (!Boolean(blockers[checkIntent])) {
                hasOpeningForIntent = true;
            }
        }
    }

    if (counter >= 20) {
        return null;
    }

    return {
        dir: dir,
        distance: counter,
        newPos: getNewPositionFromDistance(startingPosition, dir, counter)
    };
}




export function getSegmentToDestination(startingPosition="", desintationPosition="", dir="", blockers={}) {
    const startingXPos = parseInt(startingPosition.split('x')[0]);
    const startingYPos = parseInt(startingPosition.split('x')[1]);

    const destinationXPos = parseInt(desintationPosition.split('x')[0]);
    const destinationYPos = parseInt(desintationPosition.split('x')[1]);


    if (dir == "left" || dir == "right") {
        if (startingYPos != destinationYPos) {
            return null;
        }
        const diff = Math.abs(startingXPos - destinationXPos);
        for (var i=diff; i>0; i-=1) {

            const checkThisX = (dir == "left") ? startingXPos-i : startingXPos+i;
            if (Boolean(blockers[`${checkThisX}x${startingYPos}`])) {
                return null;
            }
        }

        return {
            dir: dir,
            distance: diff,
            newPos: getNewPositionFromDistance(startingPosition, dir, diff)
        }
    }

    if (dir == "up" || dir == "down") {
        if (startingXPos != destinationXPos) {
            return null;
        }
        const diff = Math.abs(startingYPos - destinationYPos);
        for (var i=diff; i>0; i-=1) {

            const checkThisY = (dir == "up") ? startingYPos-i : startingYPos+1;
            if (Boolean(blockers[`${startingXPos}x${checkThisY}`])) {
                return null;
            }
        }

        return {
            dir: dir,
            distance: diff,
            newPos: getNewPositionFromDistance(startingPosition, dir, diff)
        }
    }
}

export function getNextDirection(startingPosition="", destinationPosition="", previousDir=null) {
    const startingXPos = parseInt(startingPosition.split('x')[0]);
    const startingYPos = parseInt(startingPosition.split('x')[1]);
    const destinationXPos = parseInt(destinationPosition.split('x')[0]);
    const destinationYPos = parseInt(destinationPosition.split('x')[1]);

    const xDiff = Math.abs(startingXPos - destinationXPos);
    const yDiff = Math.abs(startingYPos - destinationYPos);



    /* Don't reverse previous direction */
    if (previousDir == "down" && destinationYPos < startingYPos) {
        return (destinationXPos <= startingXPos) ? "left" : "right";
    }
    if (previousDir == "up" && destinationYPos > startingYPos) {
        return (destinationXPos <= startingXPos) ? "left" : "right";
    }

    if (previousDir == "right" && destinationXPos < startingXPos) {
        return (destinationYPos <= startingYPos) ? "up" : "down";
    }

    if (previousDir == "left" && destinationXPos > startingXPos) {
        return (destinationYPos <= startingYPos) ? "up" : "down";
    }

    /* Handle standard directions */
    if (destinationXPos == startingXPos && destinationYPos < startingYPos ) {
        return "up"
    }
    if (destinationXPos == startingXPos && destinationYPos > startingYPos ) {
        return "down"
    }
    if (destinationYPos == startingYPos && destinationXPos < startingXPos ) {
        return "left"
    }
    if (destinationYPos == startingYPos && destinationXPos > startingXPos ) {
        return "right"
    }


    if (xDiff <= yDiff) {
        return (destinationXPos <= startingXPos) ? "left" : "right";
    } else {
        return (destinationYPos <= startingYPos) ? "up" : "down";
    }

}





