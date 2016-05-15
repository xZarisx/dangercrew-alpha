import {assert, expect} from 'chai'
import {getFreeDirections} from '../src/people/path-finder'
/* C = Character, G = Goal */


describe("getFreeDirections", () => {
    it("has three free directions", ()=> {
        /*
         -X-
         -C-
         ---
         */
        const walls = {
            "1x0": {}
        };
        const character = "1x1";
        const result = getFreeDirections(character, walls);
        expect(result).to.include.members(["left", "down", "right"]);
        expect(result).to.not.include.members(["up"]);
    });


    it("has two free directions", ()=> {
        /*
         -X-
         XC-
         ---
         */
        const walls = {
            "1x0": {},
            "0x1": {}
        };
        const character = "1x1";
        const result = getFreeDirections(character, walls);
        expect(result).to.include.members(["down", "right"]);
        expect(result).to.not.include.members(["up", "left"]);
    });

    it("has two free directions", ()=> {
        /*
         -X-
         XCX
         ---
         */
        const walls = {
            "1x0": {},
            "0x1": {},
            "2x1": {}
        };
        const character = "1x1";
        const result = getFreeDirections(character, walls);
        expect(result).to.include.members(["down"]);
        expect(result).to.not.include.members(["up", "left", "right"]);
    });

    it("has zero free directions", ()=> {
        /*
         -X-
         XCX
         -X-
         */
        const walls = {
            "1x0": {},
            "0x1": {},
            "2x1": {},
            "1x2": {}
        };
        const character = "1x1";
        const result = getFreeDirections(character, walls);
        assert.equal(result.length, 0)
    });


    it("will not count negative spaces as free", ()=> {
        /*
         C--
         ---
         */
        const walls = {
        };
        const character = "0x0";
        const result = getFreeDirections(character, walls);
        assert.deepEqual(result, ["down", "right"])
    });


});
