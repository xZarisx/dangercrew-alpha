import React from 'react'
import { connect } from 'react-redux'
import {addKeyboardSinglePress, removeKeyboardSinglePress} from '../helpers/single-keypress-binding'
import {Howl} from 'howler'

var enterSound = new Howl({
    urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/163669/speedup6.mp3'],
    volume: 0.7
});

@connect((state, props) => {
    return {
        isTouchMode: state.game.isTouchMode
    }
})

class TitleScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            isPromptBlinking: true
        }
    }

    startGame() {
        var self = this;
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

        }, 2000);
    }

    componentDidMount() {
        var self = this;
        var handleEnter = function() {
            self.startGame();
        };
        addKeyboardSinglePress(13, handleEnter, 'title-screen')
    }

    componentWillUnmount() {
        removeKeyboardSinglePress('title-screen')
    }

    handleClick() {
        this.startGame();
    }

    renderText() {
        
        const enterText = {
            fontFamily: '"Source Code Pro", monospace',
            textAlign: 'center',
            fontSize: '3vw',
            position: 'relative',
            top: '-1vw',
            animation: (this.state.isPromptBlinking) ? 'blink 1s steps(2, start) infinite' : 'none'
        };

        const text = this.props.isTouchMode ? "TAP to Play" : "Press Enter"

        return (
            <div style={enterText}>
                {text}
            </div>
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
               <div onClick={::this.handleClick}>
                    <img style={imageStyle} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/logo.min.svg" />
                    {this.renderText()}
               </div>
               <div className="title-jacob"></div>
           </div>
        );
    }
}

export default TitleScreen;