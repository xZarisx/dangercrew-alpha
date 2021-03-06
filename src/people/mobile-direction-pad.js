import React from 'react'
import { connect } from 'react-redux'
import Move from './move'
import store from '../init/store'
import LocationService from './location-service'
import {verticalDpadArrow, horizontalDpadArrow} from '../_icons/dpad-icons'


@connect((state, props) => {
    return {
        playerX: state.people.player.x, /* For updating */
        playerY: state.people.player.y,
        playerDirection: state.people.player.dir,
        moving: state.people.player.moving,
        gameArea: state.game.gameArea
    }
})

class MobileDirectionPad extends React.Component {

    constructor() {
        super();
        this.state = {
            isTouching: false,
            lastDirectionTouched: null,
            initialTouchX: 0,
            initialTouchY: 0
        }
    }

    componentWillUpdate(newProps, newState) {
        if (this.state.lastDirectionTouched != newState.lastDirectionTouched) {
            //this.props.onDirectionChange();

            if (newState.lastDirectionTouched && !newProps.moving) {
                this.startMoving(newState.lastDirectionTouched);
            }
        }
    }

    componentDidMount() {
        var self = this;
        var $body = $('body');
        var $dpad = $('.mobile-dpad');


        var upCoords, downCoords, leftCoords, rightCoords;
        function updateCoords() {
            upCoords = $('.hb-up')[0].getBoundingClientRect();
            downCoords = $('.hb-down')[0].getBoundingClientRect();
            leftCoords = $('.hb-left')[0].getBoundingClientRect();
            rightCoords =$('.hb-right')[0].getBoundingClientRect();
        }

        function isInBox(topEdge, bottomEdge, leftEdge, rightEdge, userX, userY) {
            const isValidHorizontal = (userX >= leftEdge && userX <= rightEdge);
            const isValidVertical = (userY >= topEdge && userY <= bottomEdge);
            return isValidHorizontal && isValidVertical;
        }

        $body.on('mousemove touchmove', function(e) {
            e.preventDefault();
        });

        $('.viewport').on('mousedown touchstart', function(e) {
            //console.log( e.originalEvent.pageX, e.originalEvent.pageY )

            if (self.props.gameArea != "map") {
                return;
            }
            if (e.target.classList.contains('js-no-dpad-on-touch')) {
                return;
            }


            const gameViewportLeft = $(this)[0].getBoundingClientRect().left;
            const gameViewportTop = $(this)[0].getBoundingClientRect().top;

            const touchPageX = (e.originalEvent.touches) ? e.originalEvent.touches[0].pageX : e.originalEvent.pageX;
            const touchPageY = (e.originalEvent.touches) ? e.originalEvent.touches[0].pageY : e.originalEvent.pageY;


            self.setState({
                isTouching: true,
                initialTouchX: touchPageX - gameViewportLeft,
                initialTouchY: touchPageY - gameViewportTop,
                indicatorX: touchPageX - gameViewportLeft,
                indicatorY: touchPageY - gameViewportTop
            });

            updateCoords();


        });

        $body.on('mouseup touchend', function() {
            self.setState({
                isTouching: false,
                lastDirectionTouched: null
            });
        });

        $('.viewport').on('mousemove touchmove', function(e) {

            if (self.state.isTouching) {

                const gameViewportLeft = $(this)[0].getBoundingClientRect().left;
                const gameViewportTop = $(this)[0].getBoundingClientRect().top;

                const touchPageX = (e.originalEvent.touches) ? e.originalEvent.touches[0].pageX : e.originalEvent.pageX;
                const touchPageY = (e.originalEvent.touches) ? e.originalEvent.touches[0].pageY : e.originalEvent.pageY;

                self.setState({
                    indicatorX: touchPageX - gameViewportLeft,
                    indicatorY: touchPageY - gameViewportTop
                });


                const x =  (e.originalEvent.touches) ? e.originalEvent.touches[0].pageX : e.originalEvent.pageX;
                const y =  (e.originalEvent.touches) ? e.originalEvent.touches[0].pageY : e.originalEvent.pageY;



                if (isInBox(upCoords.top, upCoords.bottom, upCoords.left, upCoords.right, x, y)) {
                    self.setState({ lastDirectionTouched: "up" });
                    return;
                }
                if (isInBox(downCoords.top, downCoords.bottom, downCoords.left, downCoords.right, x, y)) {
                    self.setState({ lastDirectionTouched: "down" });
                    return;
                }
                if (isInBox(leftCoords.top, leftCoords.bottom, leftCoords.left, leftCoords.right, x, y)) {
                    self.setState({ lastDirectionTouched: "left" });
                    return;
                }
                if (isInBox(rightCoords.top, rightCoords.bottom, rightCoords.left, rightCoords.right, x, y)) {
                    self.setState({ lastDirectionTouched: "right" });
                }

            }
        });

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
        });

        if (!LocationService.isFree(this.getUpdatedX(direction), this.getUpdatedY(direction))) {
            //Stop if it aint free
            this.stopMoving();

            /* Check actions to see if we are against a map transition cell */
            /* This is really only used if you are against the end of a map, because you
             * weren't facing the right direction when entering this cell */
            LocationService.checkActions(this.props.playerX, this.props.playerY);


            return;
        }

        LocationService.reserveCell(this.getUpdatedX(direction), this.getUpdatedY(direction), "player")

        this.props.dispatch({
            type: 'START_MOVING',
            mover_id: "player"
        });

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


            if (this.state.lastDirectionTouched) {
                this.startMoving(this.state.lastDirectionTouched)
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


    render() {
        const activeClass = this.state.isTouching ? "dpad-active" : "";

        const activeUpClass = this.state.lastDirectionTouched == "up" ? "hb-active" : "";
        const activeDownClass = this.state.lastDirectionTouched == "down" ? "hb-active" : "";
        const activeLeftClass = this.state.lastDirectionTouched == "left" ? "hb-active" : "";
        const activeRightClass = this.state.lastDirectionTouched == "right" ? "hb-active" : "";

        const dpadStyle = {
            visibility: this.state.isTouching ? "visible" : "hidden",
            left: this.state.initialTouchX - 70,
            top: this.state.initialTouchY - 70
        };

        const indicatorStyle = {
            position: 'absolute',
            visibility: this.state.isTouching ? "hidden" : "hidden",
            width: 10,
            height: 10,
            marginLeft: -5,
            marginTop: -5,
            zIndex: 20,
            background: "blue",
            left: this.state.indicatorX,
            top: this.state.indicatorY
        };
        
        return (
            <div>
                <div style={indicatorStyle}></div>

                <div style={dpadStyle} className={`mobile-dpad ${activeClass}`}>


                    <div className="circle js-dpad-circle"></div>

                    <div className={`hitbox hb-up ${activeUpClass}`}>
                        {verticalDpadArrow(44, "")}
                    </div>
                    <div className={`hitbox hb-down ${activeDownClass}`}>
                        {verticalDpadArrow(44, "")}
                    </div>
                    <div className={`hitbox hb-left ${activeLeftClass}`}>
                        {horizontalDpadArrow(66, "")}
                    </div>
                    <div className={`hitbox hb-right ${activeRightClass}`}>
                        {horizontalDpadArrow(66, "")}
                    </div>

                </div>
            </div>
        );
    }
}

export default MobileDirectionPad;