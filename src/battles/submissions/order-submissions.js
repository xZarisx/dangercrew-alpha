import {coinToss} from '../../helpers/numbers-helper'

export default function(turns) {
    /* return submissions ordered by speed */
    const t = [...turns];
    return t.sort(function(a, b) {
        var x = a.speedRoll;
        var y = b.speedRoll;

        if (x == y) {
            x = coinToss() ? x+1 : x-1;
        }
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    }).reverse();
}