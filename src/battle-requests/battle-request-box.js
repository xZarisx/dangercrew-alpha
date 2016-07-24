import React from 'react'
import { connect } from 'react-redux'
import {addKeyboardSinglePress, removeKeyboardSinglePress} from '../helpers/single-keypress-binding'
import initBattleFromRequest from './init-battle-from-request'
import {Howl} from 'howler'

var exclaimUp = new Howl({
    urls: ['/dist/assets/sfx/exclaim_up.mp3']
});
var exclaimDown = new Howl({
    urls: ['/dist/assets/sfx/exclaim_down.mp3']
});

@connect((state, props) => {
    return {
        battleRequests: state.battleRequests,
        isTouchMode: state.game.isTouchMode
    }
})

class BattleRequestBox extends React.Component {

    constructor() {
        super();
        this.timeout = null;
        this.state = {
            time: 10
        }
    }

    handleMobileTab() {
        initBattleFromRequest();
    }

    componentDidMount() {

        exclaimUp.play();

        this.timeout = setTimeout(() => {
            this.reduceTime();
        }, 1000);


        addKeyboardSinglePress(13, () => {
            initBattleFromRequest();
        }, 'battle-request-box');

        addKeyboardSinglePress(27, () => {
            clearTimeout(this.timeout);
            this.setState({time:0});
            exclaimDown.play();
            this.props.dispatch({
                type: "DECLINE_BATTLE_REQUEST"
            })
        }, 'battle-request-box');
    }

    componentWillUnmount() {
        removeKeyboardSinglePress('battle-request-box');
        clearTimeout(this.timeout)
    }

    reduceTime() {
        var self = this;
        self.setState({
            time: self.state.time - 1
        }, () => {
            if (self.state.time > 0) {
                self.timeout = setTimeout(() => {self.reduceTime()}, 1000);
            } else {
                exclaimDown.play();
                self.props.dispatch({
                    type: "DECLINE_BATTLE_REQUEST"
                })
            }
        });
    }

    renderPrompt() {

        if (this.props.isTouchMode) {
            return (
                <div className="js-no-dpad-on-touch">
                    TAP to accept
                </div>
            )
        }

        return (
            <div className="js-no-dpad-on-touch">
                <div>ENTER to accept</div>
                <div>ESC to decline</div>
            </div>
        )
    }

    render() {

        if (this.state.time <= 0) {
            return false
        }

        const style = {
            position:'absolute',
            right: '1vw',
            top: '1vw',
            padding: '2vw',
            fontSize: '3vw',
            fontFamily: 'monospace',
            width:'43vw', //temp
            background: '#111',
            color: '#fff'
        };

        const avatar = {
            background: `url(${this.props.battleRequests.requesterSkin}), linear-gradient(-330deg, #58a, #ff0090)`,
            width: '6vw',
            height: '6vw',
            float: 'left',
            marginRight: '1vw',
            backgroundPosition: `300% 100%`,
            backgroundSize:'400%',
            borderRadius: '50%',
            marginBottom: '2vw'
        };

        const titleStyle = {
            marginBottom: "1vw"
        };
        const levelStyle = {
            fontSize: "2vw",
            paddingLeft: "1vw",
            color: "rgba(255,255,255,0.6)",
        };
        const nameLineStyle = {
            marginBottom: "0.5vw"
        }

        return (
           <div style={style} className="js-no-dpad-on-touch" onClick={::this.handleMobileTab}>
               <div style={titleStyle}>
                   Battle Request
                   <div style={{float:'right'}}>
                       {this.state.time}
                   </div>
               </div>

               <div className="js-no-dpad-on-touch" style={nameLineStyle}> {/* MEDIA OBJECT */}
                   <div style={avatar} />
                   {this.props.battleRequests.requesterName}
                   <span style={levelStyle}>LVL {this.props.battleRequests.requesterLevel}</span>
               </div>
               {this.renderPrompt()}
           </div>
        );
    }
}


export default BattleRequestBox;