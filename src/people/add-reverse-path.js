export function addReversePath(pathArray) {

    const opposite = pathArray.map(dir => {
      if (dir == "up") {return "down"}
      if (dir == "down") {return "up"}
      if (dir == "left") {return "right"}
      if (dir == "right") {return "left"}
    }).reverse();

    return [...pathArray, ...opposite];
}