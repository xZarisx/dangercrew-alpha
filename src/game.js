import React from 'react';
import { connect } from 'react-redux'

/* Dev Tools */
import ReduxStateDisplayer from './dev-tools/redux-state-displayer'
import GameAreaSwitcher from './dev-tools/game-area-switcher'

/* World, Player and NPCs */
import Person from './people/person';
import Map from './map/map';
import MovementController from './people/movement-controller'
import PauseController from './pause/pause-controller'
import ActionButtonController from './people/action-btn-controller'

/* Battles */
import BattleArena from './battles/components/battle-arena'

/* Loading a map */
import {loadMap, getJSON} from './map/load-map'
import { getQueryVariable } from './helpers/get-url-parameter'
import TestMap from './_data/maps/dev-colorstreet-map'


@connect((state, props) => {
    return {
        gameArea: state.game.gameArea
    }
})

class GameIndex extends React.Component {

    constructor(props) {
        super(props);

        //Load a map
        //Option to load from URL bar for testing. Probably take this out of the full game?
        const mapToLoad = window.location.hash.match(/#useMap=/) ? getJSON(window.location.hash.split('#useMap=')[1]) : TestMap;

        loadMap(mapToLoad);

        //Init User controls controller
        new PauseController();
        new ActionButtonController();
    }



    renderGameArea() {
        if (this.props.gameArea == "map") {
            return <Map />
        }
        if (this.props.gameArea == "battle") {
            return <BattleArena />
        }
        return null;
    }

    render() {
        return (
            <div className="ui-wrapper">
                <GameAreaSwitcher />

                {this.renderGameArea()}
                <MovementController />
                <ReduxStateDisplayer />
            </div>
        );
    }
}




export default GameIndex;