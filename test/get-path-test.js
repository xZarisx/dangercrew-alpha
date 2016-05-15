import {assert, expect} from 'chai'
import {getPath} from '../src/people/get-path'

describe("getPath", () => {
    it("can provide a path to a destination A", ()=> {

        /*
            - - - - - - -
            - - - # - - -
            - C - # # D -
            - - - - - - -
         */

        const blockers = {
            "3x1": {},
            "3x2": {},
            "4x2": {}
        };

        const result = getPath("1x2", "5x2", blockers); //startingPoint and Destination point?
        assert.deepEqual(result, [
            "right",
            "down",
            "right",
            "right",
            "right",
            "up"
        ])
    });


    it("can provide a path to a destination B", ()=> {

        /*
         - - - - - - -
         - - - # - - D
         - C - # - - -
         - - - # - - -
         */

        const blockers = {
            "3x1": {},
            "3x2": {},
            "4x2": {}
        };

        const result = getPath("1x2", "6x1", blockers); //startingPoint and Destination point?
        assert.deepEqual(result, [
            "up",
            "right",
            "up",
            "right",
            "right",
            "right",
            "right",
            "down"
        ])
    });

    it("can provide a path to a destination C", ()=> {
        /*
         # # - - - # -
         C # - # - # -
         - # - # - # -
         - - - # - - D
         # # # # # # #
         */

        const blockers = {
            "0x0":{},

            "1x0":{},
            "1x1":{},
            "1x2":{},

            "3x1":{},
            "3x2":{},
            "3x3":{},

            "5x0":{},
            "5x1":{},
            "5x2":{},

            "0x4":{},
            "1x4":{},
            "2x4":{},
            "3x4":{},
            "4x4":{},
            "5x4":{},
            "6x4":{}
        };

        const result = getPath("0x1", "6x3", blockers); //startingPoint and Destination point?
        assert.deepEqual(result, [
            "down", "down", "right", "right", "up", "up", "up",
            "right", "right", "down", "down", "down", "right", "right"
        ])
    });

});