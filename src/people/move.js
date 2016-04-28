import store from '../init/store';


var Move = (mover_id, callback, speed=16) => {
    var i = 0;

    var cellSize = (store.getState().map.viewportWidth / 11);

    var steps = [];

    /* Default speed is 16 */
    /* Speed is the amount of frames it takes to get to the next cell */
    /* Faster walking speed = lower number */

    var stepCount = speed; //16;
    var stepInterval = 1; //1;
    for (var s=0; s<= stepCount-1; s++) {
        steps.push( (cellSize / stepCount) * s)
    }
    //console.log(steps)

    var step = function() {
        if (i < steps.length) {

            store.dispatch({
                type: 'UPDATE_TRANSITION_PROGRESS',
                progress: steps[i],
                mover_id: mover_id
            });

            i += stepInterval;

            requestAnimationFrame(step);

        } else {
            store.dispatch({
                type: 'UPDATE_TRANSITION_PROGRESS',
                progress: 0,
                mover_id: mover_id
            });
            callback();
        }
    };

    requestAnimationFrame(step);

};

export default Move;