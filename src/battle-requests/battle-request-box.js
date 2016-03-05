import React from 'react'
import { connect } from 'react-redux'
import {addKeyboardSinglePress, removeKeyboardSinglePress} from '../helpers/single-keypress-binding'
import initBattleFromRequest from './init-battle-from-request'

@connect((state, props) => {
    return {
        battleRequests: state.battleRequests
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

    componentDidMount() {
        this.timeout = setTimeout(() => {
            this.reduceTime();
        }, 1000);


        addKeyboardSinglePress(13, () => {
            initBattleFromRequest();
        }, 'battle-request-box');

        addKeyboardSinglePress(27, () => {
            clearTimeout(this.timeout);
            this.setState({time:0});
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
                self.props.dispatch({
                    type: "DECLINE_BATTLE_REQUEST"
                })
            }
        });
    }

    render() {

        if (this.state.time <= 0) {
            return false
        }

        const style = {
            position:'absolute',
            right: '1vw',
            top: '1vw',
            padding: '1vw',
            fontSize: '3vw',
            fontFamily: 'monospace',
            width:'46vw', //temp
            background: '#333',
            color: '#fff'
        };

        const avatar = {
            background: `url(${this.props.battleRequests.requesterSkin}), linear-gradient(-330deg, #58a, #ff0090) `,
            width: '8vw',
            height: '8vw',
            float: 'left',
            marginRight: '1vw',
            backgroundPosition: `300% 100%`,
            backgroundSize:'400%',
            borderRadius: '50%'
        };


        return (
           <div style={style}>
               <div>
                   Battle Request
                   <div style={{float:'right'}}>
                       {this.state.time}
                   </div>
               </div>

               <div> {/* MEDIA OBJECT */}
                   <div style={avatar} />
                   {this.props.battleRequests.requesterName}
                   <span>(Level {this.props.battleRequests.requesterLevel})</span>
               </div>
               <div>
                   <div>ENTER to accept</div>
                   <div>ESC to decline</div>
               </div>
           </div>
        );
    }
}

BattleRequestBox.propTypes = {
    /*someRequiredProp: React.PropTypes.string.isRequired*/
}

BattleRequestBox.defaultProps = {
}



export default BattleRequestBox;/**
 * Created by drewconley on 2/24/16.
 */
define(function () {
    return {};
});