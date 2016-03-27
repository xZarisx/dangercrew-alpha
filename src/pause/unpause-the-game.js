/* Not sure this will work. Leveling up process makes it difficult */
/* For mobile, just repeating the store.dispatch part for now */

// import store from '../init/store'
// import {resetStatPoints} from '../level-up/levelup-utilities'
//
// export default function() {
//     /* Cancel out of Level Up page */
//     if (store.getState().pauseMenu.currentCursoringList == "pauseLevelUpMenu") {
//         sound_crapout.play();
//         resetStatPoints(initialStatLevels);
//         setPauseMenuValue({
//             currentCursoringList: "pauseRoot",
//             selectedMenuItem: "pauseRoot-levelup"
//         });
//         return;
//     }
//
//     /* Exit back to game */
//     store.dispatch({
//         type: "SET_GAME_AREA",
//         payload: {
//             gameArea: "map"
//         }
//     });
// }