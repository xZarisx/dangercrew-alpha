import {assert, expect} from 'chai'
import {getSegmentUntilOpening} from '../src/people/path-finder'

describe("getSegmentUntilOpening", () => {
    it("returns an UP distance to make first possible LEFT move", ()=> {
        /*
         ------
         -X----
         -XC---
         -X----
         ------
         */

        const blockers = {
            "1x1": {},
            "1x2": {},
            "1x3": {}
        };
        const result = getSegmentUntilOpening("2x2", "up", "left", blockers);
        assert.deepEqual(result, {
            dir: "up",
            distance: 2,
            newPos: "2x0"
        })
    });


    it("returns a DOWN distance to make first possible LEFT move", ()=> {
        /*
         ------
         -X----
         -XC---
         -X----
         -X----
         ------
         */

        const blockers = {
            "1x1": {},
            "1x2": {},
            "1x3": {},
            "1x4": {}
        };
        const result = getSegmentUntilOpening("2x2", "down", "left", blockers);
        assert.deepEqual(result, {
            dir: "down",
            distance: 3,
            newPos: "2x5"
        })
    });

    it("returns a LEFT distance to make first possible UP move", ()=> {
        /*
         ------
         -XXXX-
         ----C-
         ------
         ------
         ------
         */

        const blockers = {
            "1x1": {},
            "2x1": {},
            "3x1": {},
            "4x1": {}
        };
        const result = getSegmentUntilOpening("4x2", "left", "up", blockers);
        assert.deepEqual(result, {
            dir: "left",
            distance: 4,
            newPos: "0x2"
        })
    });

    it("returns a null value when no possible UP distance to make a LEFT", ()=> {
        /*
         ------
         -XXXX-
         ---X--
         ---X--
         ---XC-
         ------
         */

        const blockers = {
            "1x1": {},
            "2x1": {},
            "3x1": {},
            "4x1": {},
            //wall
            "3x2": {},
            "3x3": {},
            "3x4": {},

        };
        const result = getSegmentUntilOpening("4x4", "up", "left", blockers);
        assert.isNull(result)
    });

    it("returns a null value when no possible RIGHT distance to make a DOWN", ()=> {
        /*
         ------
         ---X--
         C--X--
         XXXX--
         ------
         */

        const blockers = {
            "3x1": {},
            "3x2": {},
            "3x4": {},
            "0x3": {},
            "1x3": {},
            "2x3": {},
            "3x3": {}

        };
        const result = getSegmentUntilOpening("0x2", "right", "down", blockers);
        assert.isNull(result)
    });


});