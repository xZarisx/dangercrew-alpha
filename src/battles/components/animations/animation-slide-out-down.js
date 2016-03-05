import React from 'react'
import { connect } from 'react-redux'
import {incrementRolloutStation2} from '../../rollout/rollout-station-navigator'

@connect((state, props) => {
    return {
        playerId: state.battleUi.playerId
    }
})

class AnimationSlideOutDown extends React.Component {

    constructor(props) {
        super(props);

        this.caster_id = this.props.event.caster_id || null;
        //this.state = {
        //    isDone: false
        //}
    }

    componentDidMount() {

        this.props.dispatch({
            type: "ADD_STYLE_TO_COMBATANT",
            payload: {
                key: this.caster_id,
                style: {
                    animation: "slideOutDown 1s infinite"
                }
            }
        });

        setTimeout(() => {
            //this.setState({isDone: true});
            incrementRolloutStation2();

            //Lose the shaking part of the animation
            this.props.dispatch({
                type: "ADD_STYLE_TO_COMBATANT",
                payload: {
                    key: this.caster_id,
                    style: {}
                }
            });
        }, 1002);
    }

    render() {
        return null;
    }
}

AnimationSlideOutDown.propTypes = {
    /*someRequiredProp: React.PropTypes.string.isRequired*/
};

AnimationSlideOutDown.defaultProps = {
};

export default AnimationSlideOutDown;