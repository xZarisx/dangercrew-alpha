import React from 'react';
import { connect } from 'react-redux'
import PauseMenu from '../pause/pause-menu'
import Textbox from '../messaging/textbox';

import Person from '../people/person';
import BattleRequestBox from '../battle-requests/battle-request-box'
import BattleResultBox from '../battle-requests/battle-result-box'
import MovementController from '../people/movement-controller'
import BattleArena from '../battles/components/battle-arena'

import TitleScreen from '../title/title-screen'

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

        showRequest: state.battleRequests.showRequest,
        showResult: state.battleResultPrompt.showResult,

        gameArea: state.game.gameArea

    }
})

class Map extends React.Component { /* Considering this the "frame" rather than the "map" */

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

    renderGameArea() {


        if (this.props.gameArea == "title") {
            return <TitleScreen />;
        }
        if (this.props.gameArea == "pause") {
            return this.renderPause();
        }
        if (this.props.gameArea == "battle") {
            return <BattleArena />
        }
        if (this.props.gameArea == "map") {
            return this.renderMap();
        }

        return null;
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
            <div>
                {/* This extra container div helps consistency with renderPause */}
                <div style={mapStyle} className="map">
                    <MovementController /> {/* Also does the overworld Action Button controller */}
                    <img className="mapImage" style={mapImageStyle} src={this.props.backgroundImage} />
                    {persons}
                </div>
            </div>
        )
    }

    renderPause() {
        var CELL = (this.props.vpWidth / 11);
        const translate = this.getTranslateValue();
        const mapStyle = {
            left: (this.props.x * -CELL) + (CELL * 5),
            top: (this.props.y * -CELL) + (CELL * 3),
            transform: `translate3d( ${translate} )`,
            WebkitTransform: `translate3d( ${translate} )`,
        };

        const mapImageStyle = {
            width: CELL * this.props.mapWidth
        };

        return (
            <div>
                <div style={mapStyle} className="map">
                    <img className="mapImage" style={mapImageStyle} src={this.props.backgroundImage} />
                </div>
                <PauseMenu />
            </div>
        )
    }

    handleDevBtn() {
        window.addXp(5);
    }

    render() {

        const viewportStyle = {
            width: this.props.vpWidth,
            height: this.props.vpHeight
        };

        const screenState = this.renderGameArea();
        const textbox = this.props.isShowingTextbox ? <Textbox /> : null;
        const battleRequestBox = this.props.showRequest ? <BattleRequestBox /> : null;
        const battleResultBox = this.props.showResult ? <BattleResultBox /> : null;

        return (
            <div style={viewportStyle} className={`viewport viewport-${this.props.vpWidth}`}>
                {screenState}
                {textbox}
                {battleRequestBox}
                {battleResultBox}
                {/*<button onClick={::this.handleDevBtn} style={{position:"absolute", bottom:0, right:0}}>Debug: win a battle</button>*/}
            </div>
        )
    }
}




export default Map;