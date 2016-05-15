import {assert, expect} from 'chai'
import {getSegmentToDestination} from '../src/people/path-finder'

describe("getSegmentToDestination", () => {
    // UP & DOWN
    it("returns a segment object for landing on the Destination going UP", ()=> {
        /*
         --D---
         ------
         --C---
         ------
         ------
         */

        const blockers = {};
        const result = getSegmentToDestination("2x2", "2x0", "up", blockers);
        assert.deepEqual(result, {
            dir: "up",
            distance: 2,
            newPos: "2x0"
        })
    });

    it("returns NULL when a blocker is found on the way UP to the Desintation", ()=> {
        /*
         --D---
         --X---
         --C---
         ------
         ------
         */

        const blockers = {
            "2x1": {}
        };
        const result = getSegmentToDestination("2x2", "2x0", "up", blockers);
        assert.isNull(result);
    });

    it("returns a segment object for landing on the Destination going DOWN", ()=> {
        /*
         --C---
         ------
         --D---
         ------
         ------
         */

        const blockers = {
        };
        const result = getSegmentToDestination("2x0", "2x2", "down", blockers);
        assert.deepEqual(result, {
            dir: "down",
            distance: 2,
            newPos: "2x2"
        })
    });

    it("returns NULL when a blocker is found on the way DOWN to the Desintation", ()=> {
        /*
         --C---
         --X---
         --D---
         ------
         ------
         */
        const blockers = {
            "2x1": {}
        };
        const result = getSegmentToDestination("2x0", "2x2", "down", blockers);
        assert.isNull(result);
    });

    // LEFT & RIGHT
    it("returns a segment object for landing on the Destination going LEFT", ()=> {
        /*
         -D-----C
         --------
         */

        const blockers = {};
        const result = getSegmentToDestination("7x0", "1x0", "left", blockers);
        assert.deepEqual(result, {
            dir: "left",
            distance: 6,
            newPos: "1x0"
        })
    });

    it("returns a segment object for landing on the Destination going RIGHT", ()=> {
        /*
         -C-D----
         --------
         */
        const blockers = {};
        const result = getSegmentToDestination("1x0", "3x0", "right", blockers);
        assert.deepEqual(result, {
            dir: "right",
            distance: 2,
            newPos: "3x0"
        })
    });

    it("returns null for finding a blocker when going RIGHT", ()=> {
        /*
         - C - # # D -
         */
        const blockers = {
            "3x0": {},
            "4x0":{}
        };
        const result = getSegmentToDestination("1x0", "4x0", "right", blockers);
        assert.isNull(result);
    });


    it("returns outrageous lengths", ()=> {
        const blockers = {};
        const result = getSegmentToDestination("1x0", "100x0", "right", blockers);
        assert.deepEqual(result, {
            dir: "right",
            distance: 99,
            newPos: "100x0"
        })
    });

});