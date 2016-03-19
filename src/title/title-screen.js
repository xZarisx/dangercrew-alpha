import React from 'react'
import { connect } from 'react-redux'
import {addKeyboardSinglePress, removeKeyboardSinglePress} from '../helpers/single-keypress-binding'
import isTouchDevice from '../helpers/is-touch-device'
import {Howl} from 'howler'

var enterSound = new Howl({
    urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/163669/speedup.ogg']
});

@connect((state, props) => {
    return {
    }
})

class TitleScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            isPromptBlinking: true,
            isMobileWarning: false,
        }
    }

    componentDidMount() {
        var self = this;

        if (isTouchDevice()) {
            //console.warn('touch device. Show the warning')
            self.setState({
                isMobileWarning: true
            });
        }


        var handleEnter = function() {
            /* Insert Sound Effect here */
            enterSound.play();

            self.setState({
               isPromptBlinking: false
            });

            setTimeout(function() {
                /* TODO: refactor game reducer to use utilities. That will clean this up */
                self.props.dispatch({
                    type: 'SET_GAME_AREA',
                    payload: {
                        gameArea: 'map'
                    }
                });
                setTimeout(function() {
                    self.props.dispatch({
                        type: 'SET_TRANSITION_OVERLAY_OPACITY',
                        payload: {
                            transitionOverlayOpacity: 0
                        }
                    });
                }, 1000)

            }, 800);
        };
        addKeyboardSinglePress(13, handleEnter, 'title-screen')
    }

    componentWillUnmount() {
        removeKeyboardSinglePress('title-screen')
    }

    renderText() {

        if (this.state.isMobileWarning) {
            const warningText = {
                fontFamily: '"Source Code Pro", monospace',
                textAlign: 'center',
                fontSize: '2vw',
                maxWidth: '40vw',
                margin: '0 auto',
                position: 'relative',
                top: '1vw',
                lineHeight: '2.5vw',
            };
            return (
                <div style={warningText}>
                    <div>Uh oh!</div>
                    <div>This game is "desktop only" for the moment. Check back soon!</div>
                </div>
            )
        }

        const enterText = {
            fontFamily: '"Source Code Pro", monospace',
            textAlign: 'center',
            fontSize: '3vw',
            position: 'relative',
            top: '-1vw',
            animation: (this.state.isPromptBlinking) ? 'blink 1s steps(2, start) infinite' : 'none'
        };

        return (
            <div style={enterText}>Press ENTER</div>
        )
    }

    render() {
        const containerStyle = {
            width: '100%',
            color: '#fff',
            position: 'relative'
        };

        const imageStyle = {
            width: '60vw',
            animation: 'fade-in 1s',
            display: 'block',
            margin: '7vw auto 0 auto'
        };

        return (
           <div style={containerStyle}>
               <div>
                    <img style={imageStyle} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/logo.svg" />
                    {this.renderText()}
               </div>
               <div className="title-jacob"></div>
           </div>
        );
    }
}

TitleScreen.propTypes = {
    /*someRequiredProp: React.PropTypes.string.isRequired*/
}

TitleScreen.defaultProps = {
}



export default TitleScreen;