import store from '../init/store'

export default function(changes={}) {
    store.dispatch({
        type: "SET_PLAYERDATA_VALUE",
        payload: {
            changes: {...changes}
        }
    });
}