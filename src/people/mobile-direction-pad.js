import React from 'react'
import { connect } from 'react-redux'

@connect((state, props) => {
    return {
    }
})

class MobileDirectionPad extends React.Component {

    constructor() {
        super();
        this.state = {
            isTouching: false,
            lastDirectionTouched: null
        }
    }

    componentDidMount() {
        var self = this;
        var $body = $('body');
        var $dpad = $('.mobile-dpad');

        const leftBorder = $dpad.offset().left;  //may get messed up on resize
        const dpadWidth = $dpad.width();
        const dpadHeight = $dpad.height();
        const halfHorizontalPoint = leftBorder + (dpadWidth / 2);

        console.log('leftBorder', leftBorder)
        console.log('dpadWidth', dpadWidth, dpadWidth/2)


        // const topRightCorner = topLeftCorner+$dpad.width();  //may get messed up on resize
        // const bottomLeftCorner = topLeftCorner + $dpad.height();


        const upCoords = $('.hb-up')[0].getBoundingClientRect();
        const downCoords = $('.hb-down')[0].getBoundingClientRect();
        const leftCoords = $('.hb-left')[0].getBoundingClientRect();
        const rightCoords =$('.hb-right')[0].getBoundingClientRect();

        console.log(upCoords)


        function isInBox(topEdge, bottomEdge, leftEdge, rightEdge, userX, userY) {
            const isValidHorizontal = (userX >= leftEdge && userX <= rightEdge);
            const isValidVertical = (userY >= topEdge && userY <= bottomEdge);
            return isValidHorizontal && isValidVertical;
        }



        $body.on('mousemove touchmove', function(e) {
            e.preventDefault();
        });

        $body.on('mousedown touchstart', function() {
            self.setState({ isTouching: true });
        });

        $body.on('mouseup touchend', function() {
            self.setState({
                isTouching: false,
                lastDirectionTouched: null
            });
        });

        $dpad.on('mousemove touchmove', function(e) {

            if (self.state.isTouching) {
                //console.log(e);
                const x =  e.originalEvent.pageX;
                const y =  e.originalEvent.pageY;

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
        // $('.hb-down').on('mousemove touchmove', function(e) {
        //     if (self.state.isTouching) {
        //         self.setState({lastDirectionTouched: "down"});
        //     }
        // });
        // $('.hb-left').on('mousemove touchmove', function(e) {
        //     if (self.state.isTouching) {
        //         self.setState({lastDirectionTouched: "left"});
        //     }
        // });
        // $('.hb-right').on('mousemove touchmove', function(e) {
        //     if (self.state.isTouching) {
        //         self.setState({lastDirectionTouched: "right"});
        //     }
        // });


    }


    render() {
        const activeClass = this.state.isTouching ? "dpad-active" : "";

        const activeUpClass = this.state.lastDirectionTouched == "up" ? "hb-active" : "";
        const activeDownClass = this.state.lastDirectionTouched == "down" ? "hb-active" : "";
        const activeLeftClass = this.state.lastDirectionTouched == "left" ? "hb-active" : "";
        const activeRightClass = this.state.lastDirectionTouched == "right" ? "hb-active" : "";

        return (
           <div className={`mobile-dpad ${activeClass}`}>
               <div className={`hitbox hb-up ${activeUpClass}`}></div>
               <div className={`hitbox hb-down ${activeDownClass}`}></div>
               <div className={`hitbox hb-left ${activeLeftClass}`}></div>
               <div className={`hitbox hb-right ${activeRightClass}`}></div>
           </div>
        );
    }
}

export default MobileDirectionPad;