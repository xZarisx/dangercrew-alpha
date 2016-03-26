import store from '../init/store'

export default function() {
    /* Do not launch pause menu if battle request menu is up. Closes the request instead */
    if (store.getState().battleRequests.showRequest) {
        return false;
    }

    /* Do not launch pause menu if dialog box is up */
    if (store.getState().message.messaging) {
        return false;
    }

    /* Pausing during battle results window */
    if (store.getState().battleResultPrompt.showResult) {

        if (store.getState().battleResultPrompt.safeToPause) {
            /* safeToPause is true! You have leveled up! We are prompting you to hit ESC */
            store.dispatch({
                type: "SET_RESULT_PROMPT_VALUE",
                payload: {
                    changes: {
                        showResult: false
                    }
                }
            })
        } else {
            /* If Battle Results window hasnt set the safeToPause flag, we can't pause yet. */
            return false;
        }
    }

    store.dispatch({
        type: "SET_GAME_AREA",
        payload: {
            gameArea: "pause"
        }
    })
}