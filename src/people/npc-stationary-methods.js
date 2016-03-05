import store from './redux/store';
import { getRandomInRange } from './services/numbers'
import { randomFromArray } from './helpers/random-from-array'


export function npcStationaryBehavior(npc) {
    const node = store.getState().people[npc];

    var self = this;
    self.timeout = null;


    self.clearNpcTimeout = function() {
        clearTimeout(self.timeout)
    };

    self.rotate = () => {
        self.timeout = setTimeout(() => {

            if (!store.getState().game.isShowingTextbox) { //don't rotate if textbox is showing
                store.dispatch({
                    type: "UPDATE_DIRECTION",
                    mover_id: npc,
                    direction: randomFromArray(node.behaviorData.rotationDirections)
                })
            }
            self.rotate();
            }, getRandomInRange(600,3000)
        )
    };

    self.rotate(); //init
}