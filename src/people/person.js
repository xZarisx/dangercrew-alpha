import React from 'react';
import { connect } from 'react-redux'

/* NOTE: Gives special methods to NPCs */
import { npcStationaryBehavior } from './npc-stationary-methods'
import { npcRoamingBehavior } from './npc-roaming-methods'

@connect((state, props) => {
    const node = state.people[props.id];

    if (!node) {
        return {}
    }

    return {
        x: node.x,
        y: node.y,
        dir: node.dir,
        transitionProgress: node.transitionProgress,
        moving: node.moving,
        skin: node.skin,
        useBehavior: node.useBehavior || null, /* null = player node */
        vpWidth: state.map.viewportWidth
    }
})

class Person extends React.Component {

    componentDidMount() {
        if (this.props.useBehavior == "stationary") {
            npcStationaryBehavior.call(this, this.props.id);
        }
        if (this.props.useBehavior == "roaming") {
            npcRoamingBehavior.call(this, this.props.id);
        }
    }

    componentWillUnmount() {
        if (this.props.useBehavior == "stationary" || this.props.useBehavior == "roaming") {
            this.clearNpcTimeout(); /* Defined inside npcBehavior files */
        }
    }

    getTranslateValue() {

        let xValue = 0;
        let yValue = 0;

        if (this.props.dir == "left") {
            xValue = this.props.transitionProgress * -1 + 'px';
        }
        if (this.props.dir == "right") {
            xValue = this.props.transitionProgress + 'px';
        }
        if (this.props.dir == "up") {
            yValue = this.props.transitionProgress * -1 + 'px';
        }
        if (this.props.dir == "down") {
            yValue = this.props.transitionProgress + 'px';
        }

        return `${xValue}, ${yValue}, 0px`;
    }

    getDirectionSpritePosition() {
        let horizontalPos;

        if (this.props.dir == "left") { horizontalPos = "0px"; }
        if (this.props.dir == "right") { horizontalPos = "32px"; }
        if (this.props.dir == "up") { horizontalPos = "16px"; }
        if (this.props.dir == "down") { horizontalPos = "48px"; }


        const verticalPos = (this.props.moving) ? "0" : "16px";

        return `${horizontalPos} ${verticalPos}`;
    }

    getStyles() {
        var CELL = this.props.vpWidth / 11;
        var translate = this.getTranslateValue();
        return {
            left: this.props.x * CELL,
            top: this.props.y * CELL,

            width: CELL,
            height: CELL,

            transform: `translate3d( ${translate} )`,
            WebkitTransform: `translate3d( ${translate} )`,
            ...this.getSkinImage()
        }
    }

    getDirectionSpriteClass() {
        const isWalking = (this.props.moving) ? "is-walking" : "";
        return `person-${this.props.dir} ${isWalking}`;
    }

    getSkinImage() {
        if (this.props.useBehavior != null) {
            /* Kinda quick way of checking if NPC */
            return {
                backgroundImage: `url(${this.props.skin})`
            }
        }
        return {
            /* This is the player! */
            backgroundImage: `url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/svJacob-2.svg)`
        }
    }

    render() {

        var directionClass = this.getDirectionSpriteClass();
        const touchClass = (this.props.id == "player") ? "" : "js-no-dpad-on-touch";


        return (
           <div className={`cell player ${touchClass} ${directionClass}`} style={this.getStyles()}>

           </div>
        );
    }
}

export default Person;