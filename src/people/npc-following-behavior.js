import store from '../init/store'
import { addReversePath } from '../people/add-reverse-path'
import LocationService from './location-service'
import {getUpdatedX, getUpdatedY, getOppositeDirection} from './location-helpers'
import Move from './move'
import {percentChance, getRandomInRange} from '../helpers/numbers-helper'
import {getPath} from './get-path'


export function goToPosition(npc, destinationPosition="", path=[]) {

    //console.log('goToPos')
    if (!destinationPosition) {
        console.warn('destinationPosition not defined in goToPosition', 'should be a coordinate string: EX: 3x2');
        return
    }

    var timeout = null;
    const node = store.getState().people[npc];


    var clearNpcTimeout = function() {
        clearTimeout(timeout);
    };

    store.dispatch({
        type:"SET_NPC_PATH_INDEX",
        mover_id: npc,
        pathIndex: 0
    });

    var startMoving = function() {

        //console.log('SM')
        /* It is that NPC was removed before this fn executes */
        if (!store.getState().people[npc]) {
            return;
        }


        var pathIndex = node.behaviorData.pathIndex || 0;

        const direction = path[pathIndex];
        if (!direction) {
            //console.log('no direction');
            store.dispatch({ type: 'STOP_MOVING', mover_id: npc });
            return;
        }


        var currentNodeState = {
            x: store.getState().people[npc].x, /* get fresh x & y of node */
            y: store.getState().people[npc].y
        };

        store.dispatch({
            type: 'UPDATE_DIRECTION',
            direction: direction,
            mover_id: npc
        });

        const isFree = LocationService.isFree(getUpdatedX(direction, currentNodeState.x), getUpdatedY(direction, currentNodeState.y));
        if (!isFree || store.getState().game.isShowingTextbox) {

            //Stop if it aint free or textbox is showing
            store.dispatch({ type: 'STOP_MOVING', mover_id: npc });

            //store.dispatch({
            //    type: "UPDATE_DIRECTION",
            //    mover_id: npc,
            //    direction: direction
            //});

            console.log('couldnt complete path')
            return;
        }

        LocationService.reserveCell(getUpdatedX(direction, currentNodeState.x), getUpdatedY(direction, currentNodeState.y), npc);

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

            pathIndex = pathIndex +1;

            store.dispatch({
                type:"SET_NPC_PATH_INDEX",
                mover_id: npc,
                pathIndex: pathIndex
            });

            /* Move again if Game is still in map mode */
            if (store.getState().game.gameArea == "map") {
                clearNpcTimeout(); //Clear in case something is waiting to fire
                console.log('sM 2')
                startMoving();
            }
        }, node.behaviorData.walkingSpeed || 16 );
    };

    startMoving();
}

export function followPerson(myId, followId) {

    var currentPlayerLocation;
    var unsubscribe = store.subscribe(function() {
        var previousPlayerLocation = currentPlayerLocation;

        const followingNode = store.getState().people[followId];
        const node = store.getState().people[myId];

        if (!node) {
            unsubscribe();
            return;
        }

        currentPlayerLocation = `${followingNode.x}x${followingNode.y}`;

        if (currentPlayerLocation != previousPlayerLocation) {

            const blockers = {
                ...store.getState().map.walls
                /* NOTE TO SELF: this will also include solid walls from interactive events, whether they are being
                ignored by walking characters or not. Right now, the Following behavior will still walk around "picked up" items
                 */
            };
            var path = getPath(`${node.x}x${node.y}`, `${followingNode.x}x${followingNode.y}`, blockers);


            if (path && !node.moving) {
                console.log('go to path', `${followingNode.x - 1}x${followingNode.y}`);
                console.log(path)
                goToPosition(myId, `${followingNode.x + 2}x${followingNode.y}`, path)
            }
        }
    });


}

//function inViewOfPlayer(playerX, playerY, myX, myY) {
//    const xDiff = Math.abs(playerX - myX);
//    const yDiff = Math.abs(playerY - myY);
//
//    return (xDiff < 10 && yDiff < 7);
//}