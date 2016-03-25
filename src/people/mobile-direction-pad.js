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

        const upCoords = $('.hb-up')[0].getBoundingClientRect();
        const downCoords = $('.hb-down')[0].getBoundingClientRect();
        const leftCoords = $('.hb-left')[0].getBoundingClientRect();
        const rightCoords =$('.hb-right')[0].getBoundingClientRect();

        function isInBox(topEdge, bottomEdge, leftEdge, rightEdge, userX, userY) {
            const isValidHorizontal = (userX >= leftEdge && userX <= rightEdge);
            const isValidVertical = (userY >= topEdge && userY <= bottomEdge);
            return isValidHorizontal && isValidVertical;
        }

        $body.on('mousemove touchmove', function(e) {
            e.preventDefault();
        });

        $('.js-dpad-circle').on('mousedown touchstart', function() {
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

    }


    render() {
        const activeClass = this.state.isTouching ? "dpad-active" : "";

        const activeUpClass = this.state.lastDirectionTouched == "up" ? "hb-active" : "";
        const activeDownClass = this.state.lastDirectionTouched == "down" ? "hb-active" : "";
        const activeLeftClass = this.state.lastDirectionTouched == "left" ? "hb-active" : "";
        const activeRightClass = this.state.lastDirectionTouched == "right" ? "hb-active" : "";

        return (
           <div className={`mobile-dpad ${activeClass}`}>
               <div className="circle js-dpad-circle"></div>

               <div className='dot dot-up'></div>
               <div className='dot dot-down'></div>
               <div className='dot dot-left'></div>
               <div className='dot dot-right'></div>

               <div className={`hitbox hb-up ${activeUpClass}`}></div>
               <div className={`hitbox hb-down ${activeDownClass}`}></div>
               <div className={`hitbox hb-left ${activeLeftClass}`}></div>
               <div className={`hitbox hb-right ${activeRightClass}`}></div>
           </div>
        );
    }
}

export default MobileDirectionPad;