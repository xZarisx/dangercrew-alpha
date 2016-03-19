import React from 'react';
import { connect } from 'react-redux'
import {Howl} from 'howler'
import {addKeyboardSinglePress, removeKeyboardSinglePress} from '../../../helpers/single-keypress-binding';
import {incrementRolloutStation2} from '../../rollout/rollout-station-navigator'

var typeBlip = new Howl({
    urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/163669/Blip_0.ogg'],
    volume: 0.5
});

@connect((state, props) => {
    return {
    }
})

class TextMessageLine extends React.Component {

    constructor(props) {
        super();

        this.timeout = null;
        this.state = {
            characterIndex: 0
        };
    }

    componentDidMount() {
        this.props.dispatch({
            type: "SET_TEXT_MESSAGE_DONE_ROLLING",
            payload: { textMessageDoneRolling:false }
        });

        /* Mini delay before kicking off the message */
        this.initTimeout = setTimeout(() => {
            this.initMessaging();
        }, 100)
    }

    handleDone() {
        this.props.dispatch({
            type: "SET_TEXT_MESSAGE_DONE_ROLLING",
            payload: { textMessageDoneRolling:true }
        });

        if (!this.props.onDone) { /* TODO: Hack! This component should offer a callback instead of always doing iR2 */
            incrementRolloutStation2();
        } else {
            this.props.onDone();
        }
    }


    initMessaging() {
        var self = this;
        function increase() {
            typeBlip.play(); /* Play the blip */

            self.setState({
                characterIndex: self.state.characterIndex + 1
            }, () => {

                const node = self.props.content[self.state.characterIndex] || {delayBefore: 0};
                if (self.state.characterIndex < self.props.content.length) {
                    self.timeout = setTimeout(increase, node.delayBefore);
                } else {
                    self.handleDone();
                }
            })
        }
        increase();
    }

    render() {
        var spans = this.props.content.map((d,i) => {
            const style = {
                visibility: (i < this.state.characterIndex) ? "visible" : "hidden"
            };
            return <span style={style} key={i}>{d.content}</span>
        });

        return (
            <div>
                {spans}
            </div>
        )
    }
}

export default TextMessageLine;