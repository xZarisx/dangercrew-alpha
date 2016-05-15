import {assert, expect} from 'chai'
import {getNextDirection} from '../src/people/path-finder'

describe("getNextDirection", () => {
    // UP & DOWN
    it("initially chooses the closest direction to line up with the Destination", ()=> {
        /*
            -----
            -----
            -----
            -----
         */
        const currentPath = [];
        assert.equal(getNextDirection("0x3", "3x1", currentPath), "up");
        assert.equal(getNextDirection("1x0", "3x3", currentPath), "right");
        assert.equal(getNextDirection("0x0", "3x3", currentPath), "right");
        assert.equal(getNextDirection("0x1", "10x10", currentPath), "down");
        assert.equal(getNextDirection("10x1", "1x1", currentPath), "left");

    });

    xit("does not contradict the previous direction", ()=> {
        //If I went UP to avoid a wall on my RIGHT,
        //Don't go DOWN next time once I get to a free space
    });


});