import React from 'react'
import $ from 'jquery'
import { connect } from 'react-redux'
import LocationService from './location-service'
import Move from './move'
import store from '../init/store'

//import DPad from './dpad'

@connect((state, props) => {
    return {
        playerX: state.people.player.x, /* For updating */
        playerY: state.people.player.y,
        playerDirection: state.people.player.dir,
        moving: state.people.player.moving
    }
})
class MovementController extends React.Component {

    //TODO: This module is tied to "player" being the mover_id. That could probably be variable so other things could use this guy.

    componentDidMount() {
        console.log('Movement controller mounted')

        /* --------- KEY QUEUE ------------ */
        this.keyQueue = [];

        //setInterval(() => {
        //    console.log(this.keyQueue);
        //}, 2000)

        var getDirection = (keyCode) => {
            if (keyCode == 37) {return "left"}
            if (keyCode == 39) {return "right"}
            if (keyCode == 38) {return "up"}
            if (keyCode == 40) {return "down"}
            //WASD
            if (keyCode == 65) {return "left"}
            if (keyCode == 68) {return "right"}
            if (keyCode == 87) {return "up"}
            if (keyCode == 83) {return "down"}
        }

        $(document).on('keydown.player-movement', (e) => {
            if (e.which == 37 || e.which == 38 ||
                e.which == 39 || e.which == 40 ||
                e.which == 65 || e.which == 68 ||
                e.which == 83 || e.which == 87) {
                this.addKey( getDirection(e.which) )
            }
        }).on('keyup.player-movement', (e) => {
            if (e.which == 37 || e.which == 38 ||
                e.which == 39 || e.which == 40 ||//{
            /*if (*/e.which == 65 || e.which == 68 ||
                e.which == 83 || e.which == 87) {

                this.releaseKey( getDirection(e.which) )
            }
        });

        this.addKey = this.addKey.bind(this);
        this.releaseKey = this.releaseKey.bind(this);

    }

    componentWillUnmount() {
        console.log('UNMOUNT')
        this.keyQueue = [];
        $(document).off('.player-movement');
        $(document).off('.action-button-controller'); /* TODO: move this to a better spot */
    }

    addKey(key) {

        if (this.keyQueue.indexOf(key) == -1) {
            this.keyQueue.unshift(key);
        }

        if (!this.props.moving) {
            this.startMoving( this.keyQueue[0] );
        }
    }

    releaseKey(key) {
        if (this.keyQueue.indexOf(key) != -1) {
            this.keyQueue.splice( this.keyQueue.indexOf(key), 1 );
        } else {
            //Try again if we released a key that wasn't there (DPad double taps)
            //console.log('setTimeout, releaseKey')
            setTimeout(() => {
                this.releaseKey(key);
            }, 20);
        }

        //If you released the lead key against a wall but still have another held down,
        //This should have you keep moving
        if (this.keyQueue.length && !this.props.moving) {
            this.startMoving( this.keyQueue[0] );
        }
    }


    getUpdatedX(direction) {
        if (direction == "left") {
            return this.props.playerX - 1;
        }
        if (direction == "right") {
            return this.props.playerX + 1;
        }
        return this.props.playerX;
    }

    getUpdatedY(direction) {
        if (direction == "up") {
            return this.props.playerY - 1;
        }
        if (direction == "down") {
            return this.props.playerY + 1;
        }
        return this.props.playerY;
    }


    startMoving(direction) {
        /* cancel if paused or dialoguing */
        if (store.getState().game.isPaused) {
            return false;
        }
        if (store.getState().message.messaging) {
            return false;
        }

        this.props.dispatch({
            type: 'UPDATE_DIRECTION',
            direction: direction,
            mover_id: "player"
        })


        if (!LocationService.isFree(this.getUpdatedX(direction), this.getUpdatedY(direction))) {
            //Stop if it aint free
            this.stopMoving();

            return;
        }

        LocationService.reserveCell(this.getUpdatedX(direction), this.getUpdatedY(direction), "player")

        this.props.dispatch({
            type: 'START_MOVING',
            mover_id: "player"
        })

        Move("player", () => {

            //Done
            LocationService.removeReservedCell(this.props.playerX, this.props.playerY);

            this.props.dispatch({
                type: 'UPDATE_PLAYER_POSITION',
                x: this.getUpdatedX(direction),
                y: this.getUpdatedY(direction),
                mover_id: "player"
            });

            //Check this position for any actions!
            LocationService.checkActions(this.props.playerX, this.props.playerY);


            if (this.keyQueue.length) {
                this.startMoving(this.keyQueue[0])
            } else {
                this.stopMoving();
            }

        });
    }

    stopMoving() {
        this.props.dispatch({
            type: 'STOP_MOVING',
            mover_id: "player"
        })
    }


    handleDPadPress(direction) {

        //check again to see
        var self = this;
        var move = function() {
            if (!self.props.moving) {
                self.props.dispatch({
                    type: 'UPDATE_DIRECTION',
                    direction: direction,
                    mover_id: "player"
                });
                self.addKey(direction);
            } else {
                console.log('setTimeout')
                setTimeout(function() {
                    //FUTURE SELF: this might cause weird problems in DPad movement.
                    //re-try the move action if Player is moving.
                    move();
                }, 10);
            }
        }
        move();

    }
    handleDPadRelease(direction) {
        //console.log('DPadRelease direction', direction);
        this.releaseKey(direction);
    }

    render() {
        return null; //FOR NOW

        //return (
        //    <DPad handlePress={::this.handleDPadPress} handleRelease={::this.handleDPadRelease}/>
        //)
    }
}




export default MovementController;