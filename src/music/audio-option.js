import React from 'react'
import { connect } from 'react-redux'
import {soundOnIcon, soundMutedIcon } from '../_icons/sound-icons'

@connect((state, props) => {
    return {
        isAllowingMusic: state.game.isAllowingMusic
    }
})

class AudioOption extends React.Component {

    handleSwitch(e) {
        e.preventDefault();
        const newValue = !this.props.isAllowingMusic;
        this.props.dispatch({
            type: "SET_GAME_VALUE",
            payload: {
                changes: {
                    isAllowingMusic: newValue
                }
            }
        });

        /* Interact with music player. This is the only interaction with Howler for this feature */
        if (newValue == true) {
            window.Howler.unmute();

            this.refs.link.blur();
            return;
        }


        window.Howler.mute();
        this.refs.link.blur();
    }

    render() {
        const style = {
            position: 'absolute',
            right: 0,
            bottom: 0,
            fontFamily: '"Source Code Pro", monospace'
        };

        const soundIcon = (this.props.isAllowingMusic) ? soundOnIcon() : soundMutedIcon();
        const soundIconStyle = {
            width: 20,
            margin: "2px 2px 0 2px",
            display: "block"
        };


        return (
           <div style={style}>
               <a ref="link" href="#" onClick={::this.handleSwitch} style={soundIconStyle}>
                   {soundIcon}
               </a>
           </div>
        );
    }
}




export default AudioOption;