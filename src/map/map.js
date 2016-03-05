import React from 'react';
import { connect } from 'react-redux'
import PauseScreen from '../pause/pause-screen';
import Textbox from '../messaging/textbox';

import Person from '../people/person';
import BattleRequestBox from '../battle-requests/battle-request-box'

@connect((state, props) => {
    return {
        x: state.people.player.x,
        y: state.people.player.y,
        dir: state.people.player.dir,
        transitionProgress: state.people.player.transitionProgress,

        vpWidth: state.map.viewportWidth,
        vpHeight: state.map.viewportHeight,
        mapWidth: state.map.width,
        backgroundImage: state.map.backgroundImage,

        people: state.people,

        isPaused: state.game.isPaused,
        isShowingTextbox: state.game.isShowingTextbox,

        showRequest: state.battleRequests.showRequest
    }
})

class Map extends React.Component {

    getTranslateValue() {

        let xValue = 0;
        let yValue = 0;

        if (this.props.dir == "left") {
            xValue = this.props.transitionProgress + 'px';
        }
        if (this.props.dir == "right") {
            xValue = this.props.transitionProgress * -1 + 'px';
        }
        if (this.props.dir == "up") {
            yValue = this.props.transitionProgress + 'px';
        }
        if (this.props.dir == "down") {
            yValue = this.props.transitionProgress * -1 + 'px';
        }

        return `${xValue}, ${yValue}, 0px`;
    }

    renderMap() {
        var CELL = (this.props.vpWidth / 11);

        const translate = this.getTranslateValue();
        const mapStyle = {
            left: (this.props.x * -CELL) + (CELL * 5),
            top: (this.props.y * -CELL) + (CELL * 3),
            transform: `translate3d( ${translate} )`,
            WebkitTransform: `translate3d( ${translate} )`,
        };

        //console.log(this.props.mapWidth)
        const mapImageStyle = {
            width: CELL * this.props.mapWidth //THIS IS THE WIDTH OF THE MAP IN CELLS
        };

        var persons = [];
        for (var id in this.props.people) {
            persons.push(
                <Person id={id} key={id} />
            )
        }


        return (
            <div style={mapStyle} className="map">
                <img className="mapImage" style={mapImageStyle} src={this.props.backgroundImage} />
                {persons}
            </div>
        )
    }

    render() {

        const viewportStyle = {
            width: this.props.vpWidth,
            height: this.props.vpHeight
        };

        const screenState = (this.props.isPaused) ? <PauseScreen /> : this.renderMap() ;
        const textbox = this.props.isShowingTextbox ? <Textbox /> : null;
        const battleRequestBox = this.props.showRequest ? <BattleRequestBox /> : null;

        return (
            <div style={viewportStyle} className={`viewport viewport-${this.props.vpWidth}`}>
                {screenState}
                {textbox}
                {battleRequestBox}
            </div>
        )
    }
}




export default Map;