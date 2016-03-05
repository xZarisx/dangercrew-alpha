import $ from 'jquery';
import store from '../init/store';

export default function PauseController() {

    var ctrl = this;
    ctrl.btnSafe = true;

    const pauseKey = 13; //THIS SHOULD BE LOADED IN FROM A SETTING?

    $(document).on('keydown', (e) => {
        if (e.which == pauseKey && ctrl.btnSafe) {
            ctrl.btnSafe = false;
            //Callback...
            // ctrl.handlePauseButton(); /* TODO: taking pause out for now */
        }
    }).on('keyup', (e) => {
        if (e.which == pauseKey) {
            ctrl.btnSafe = true;
        }
    });

    ctrl.handlePauseButton = () => {


        if (store.getState().game.isShowingTextbox) {
            return;
        }

        console.log('pause button')
        if (store.getState().game.isPaused) {
            store.dispatch({ type: "UNPAUSE_GAME"})
            return;
        }

        store.dispatch({ type: "PAUSE_GAME"})


    }

}