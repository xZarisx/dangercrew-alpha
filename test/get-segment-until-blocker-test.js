import {assert, expect} from 'chai'
import {getSegmentUntilBlocker} from '../src/people/path-finder'

describe("getSegmentUntilBlocker", () => {
    it("returns a LEFT distance to the next blocker", ()=> {
        /*
         (5x4)
         ---------
         -X-------
         -X----C--
         -X-------
         ---------
         */

        const blockers = {
            "1x1": {},
            "1x2": {},
            "1x3": {}
        };
        const result = getSegmentUntilBlocker("6x2", "left", blockers);
        assert.deepEqual(result, {
            dir: "left",
            distance: 4,
            newPos: "2x2"
        })
    });

    it("returns a RIGHT distance to the next blocker", ()=> {
        /*
         (5x4)
         ---------
         -C------X
         --------X
         --------X
         --------X
         */

        const blockers = {
            "8x1": {},
            "8x2": {},
            "8x3": {}
        };
        const result = getSegmentUntilBlocker("1x2", "right", blockers);

        assert.deepEqual(result, {
            dir: "right",
            distance: 6,
            newPos: "7x2"
        })
    });

    it("returns an UP distance to the next blocker", ()=> {
        /*
         -------
         XXX----
         -------
         -------
         C------
         */

        const blockers = {
            "0x1": {},
            "1x1": {},
            "2x1": {}
        };
        const result = getSegmentUntilBlocker("0x4", "up", blockers);

        assert.deepEqual(result, {
            dir: "up",
            distance: 2,
            newPos: "0x2"
        })
    });

    it("returns a DOWN distance to the next blocker", ()=> {
        /*
         -C-----
         -------
         XXX----
         -------
         */

        const blockers = {
            "0x2": {},
            "1x2": {},
            "2x2": {}
        };
        const result = getSegmentUntilBlocker("1x0", "down", blockers);

        assert.deepEqual(result, {
            dir: "down",
            distance: 1,
            newPos: "1x1"
        })
    })

    it("returns null for not finding a blocker", ()=> {
        /*
         -C-----
         -------
         X-X----
         -------
         */

        const blockers = {
            "0x2": {},
            "2x2": {}
        };
        const result = getSegmentUntilBlocker("1x0", "down", blockers);

        assert.isNull(result)
    })


});