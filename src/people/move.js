import store from '../init/store';

var Move = (mover_id, callback) => {
    var i = 0;

    var cellSize = (store.getState().map.viewportWidth / 11);

    var steps = [];
    var stepCount = 16;
    for (var s=0; s<= stepCount-1; s++) {
        steps.push( (cellSize / stepCount) * s)
    }
    var step = function() {
        if (i < steps.length) {

            store.dispatch({
                type: 'UPDATE_TRANSITION_PROGRESS',
                progress: steps[i],
                mover_id: mover_id
            });

            i += 1;

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