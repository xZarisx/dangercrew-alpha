import React from 'react'
import { connect } from 'react-redux'
import {incrementRolloutStation2} from '../../rollout/rollout-station-navigator'

@connect((state, props) => {
    return {
        playerId: state.battleUi.playerId
    }
})

class AnimationShootingStar extends React.Component {

    constructor(props) {
        super(props);


        this.useReverse = this.props.event.caster_id != this.props.playerId;
        this.target_id = this.props.event.target_id || null;

        this.state = {
            isDone: false
        }
    }

    componentDidMount() {

        console.warn('shootingStar - set to shake')
        this.props.dispatch({
            type: "ADD_STYLE_TO_COMBATANT",
            payload: {
                key: this.target_id,
                style: {
                    animation: "shake 1s infinite linear"
                }
            }
        });

        setTimeout(() => {
            this.setState({isDone: true});
            incrementRolloutStation2();

            //Lose the shaking part of the animation
            /* This might be messing with the blinking */
            console.warn('shootingStar - remove shake')
            //this.props.dispatch({
            //    type: "ADD_STYLE_TO_COMBATANT",
            //    payload: {
            //        key: this.target_id,
            //        style: {}
            //    }
            //});
        }, 990);
    }

    render() {
        if (this.state.isDone) {
            return null;
        }

        const reverseClass = this.useReverse ? "reverse" : "";
        const style = {
            position:"absolute",
            animation: `projectile 1s ease-in ${reverseClass}, rise 1s ease-in ${reverseClass}, spin 1s linear infinite`
        };

        return (
            <div style={style}>
                <img style={imgStyle} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/star.png" />
            </div>
        );
    }
}

const imgStyle = {
    display:"block",
    width:"100%"
};


AnimationShootingStar.propTypes = {
    /*someRequiredProp: React.PropTypes.string.isRequired*/
};

AnimationShootingStar.defaultProps = {
};

export default AnimationShootingStar;