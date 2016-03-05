//Location Helpers
export function getUpdatedX(direction, currentX) {
    if (direction == "left") {
        return currentX - 1;
    }
    if (direction == "right") {
        return currentX + 1;
    }
    return currentX;
}

export function getUpdatedY(direction, currentY) {
    if (direction == "up") {
        return currentY - 1;
    }
    if (direction == "down") {
        return currentY + 1;
    }
    return currentY;
}

export function getOppositeDirection(dir = "left") {
    if (dir == "left")  {return "right"}
    if (dir == "right") {return "left"}
    if (dir == "up")    {return "down"}
    if (dir == "down")  {return "up"}
}