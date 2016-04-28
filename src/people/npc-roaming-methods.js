import store from '../init/store'
import { addReversePath } from '../people/add-reverse-path'
import LocationService from './location-service'
import {getUpdatedX, getUpdatedY, getOppositeDirection} from './location-helpers'
import Move from './move'
import {percentChance, getRandomInRange} from '../helpers/numbers-helper'

export function npcRoamingBehavior(npc) {
    var self = this;
    self.timeout = null;

    const node = store.getState().people[npc];
    var path = (node.behaviorData.isCircular) ? [...node.behaviorData.path] : addReversePath([...node.behaviorData.path]);


    //var isAbleToHesitate = true;
    //var hesitateTimeout = null;
    var continuousStepCounter = 0;


    self.clearNpcTimeout = function() {
        clearTimeout(self.timeout);
    };

    self.startMoving = function() {

        /* It is that NPC was removed before this fn executes */
        if (!store.getState().people[npc]) {
            return;
        }

        continuousStepCounter += 1;

        var pathIndex = node.behaviorData.pathIndex || 0;
        const hesitantAfterSteps = node.behaviorData.hesitantAfterSteps || 9999; /* Default to something really high */

        const direction = path[pathIndex];
        const prevDirection = path[pathIndex - 1] || null;

        /* Hesitate: If stepped so many spaces, there is a chance to stop for a break */
        if (continuousStepCounter > hesitantAfterSteps && direction == prevDirection && percentChance(30)) {

            continuousStepCounter = 0;
            store.dispatch({ type: 'STOP_MOVING', mover_id: npc });

            self.timeout = setTimeout(() => {
                self.startMoving()
            }, getRandomInRange(1000, 3400));

            return
        }



        var currentNodeState = {
            x: store.getState().people[npc].x, /* get fresh x & y of node */
            y: store.getState().people[npc].y
        };

        store.dispatch({ type: 'UPDATE_DIRECTION', direction: direction, mover_id: npc })

        const isFree = LocationService.isFree(getUpdatedX(direction, currentNodeState.x), getUpdatedY(direction, currentNodeState.y));
        if (!isFree || store.getState().game.isShowingTextbox) {

            //Stop if it aint free or textbox is showing
            store.dispatch({ type: 'STOP_MOVING', mover_id: npc });

            store.dispatch({
                type: "UPDATE_DIRECTION",
                mover_id: npc,
                direction: getOppositeDirection(store.getState().people.player.dir)
            });




            self.timeout = setTimeout(() => {
                self.startMoving()
            }, 1000);
            return;
        }

        LocationService.reserveCell(getUpdatedX(direction, currentNodeState.x), getUpdatedY(direction, currentNodeState.y), npc)

        store.dispatch({ type: 'START_MOVING', mover_id: npc })

        Move(npc, () => {
            //on Done...
            LocationService.removeReservedCell(getUpdatedX(direction, currentNodeState.x), getUpdatedY(direction, currentNodeState.y));

            store.dispatch({
                type: 'UPDATE_PLAYER_POSITION',
                x: getUpdatedX(direction, currentNodeState.x),
                y: getUpdatedY(direction, currentNodeState.y),
                mover_id: npc
            });

            pathIndex = (pathIndex == (path.length - 1)) ? 0: pathIndex +1;

            store.dispatch({
                type:"SET_NPC_PATH_INDEX",
                mover_id: npc,
                pathIndex: pathIndex
            });

            /* Move again if Game is still in map mode */
            if (store.getState().game.gameArea == "map") {

                function attemptMoveIfClose() {
                    const playerNode = store.getState().people.player;
                    const myNode = store.getState().people[npc];
                    if (!myNode) {
                        return false;
                    }
                    if (inViewOfPlayer(playerNode.x, playerNode.y, myNode.x, myNode.y)) {
                        //move again
                        //console.log('inView');
                        self.clearNpcTimeout(); //Clear in case something is waiting to fire
                        self.startMoving();
                    } else {
                        /* Wait a second, then check again */
                        /* TODO: This is a little dumb. Shouldn't it just listen to the player's X/Y value? */
                        self.timeout = setTimeout(() => {
                            //console.log('attempt')
                            attemptMoveIfClose();
                        }, 1000);
                    }
                }
                attemptMoveIfClose();
            }

        }, node.behaviorData.walkingSpeed || 16 );
    };

    self.startMoving();
}

function inViewOfPlayer(playerX, playerY, myX, myY) {
    const xDiff = Math.abs(playerX - myX);
    const yDiff = Math.abs(playerY - myY);

    return (xDiff < 10 && yDiff < 7);
}