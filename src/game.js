import React from 'react';
import { connect } from 'react-redux'
import FastClick from 'fastclick'
import store from './init/store'

/* Dev Tools */
import ReduxStateDisplayer from './dev-tools/redux-state-displayer'
import seedBattle from './dev-tools/seed-battle'

/* World, Player and NPCs */
import Map from './map/map';

/* Loading a map */
import {loadMap, getJSON} from './map/load-map'

import AlphaStreetMap from './_data/maps/alpha-street-map'
import AlphaCoffeeMap from './_data/maps/alpha-coffeeshop-map'


/* Playing music */
import AudioOption from './music/audio-option'

/* Mobile detection */
import isTouchDevice from './helpers/is-touch-device'


class GameIndex extends React.Component {

    constructor(props) {
        super(props);

        /* Apply FastClick for mobile play */
        $(function() {
            FastClick.attach(document.body);
        });

        /* Init game music */
        //MusicPlayer.playTrack("coffeeShop")

        //Load a map
        //Option to load from URL bar for testing. Probably take this out of the full game?
        const mapToLoad = window.location.hash.match(/#useMap=/) ? getJSON(window.location.hash.split('#useMap=')[1]) : AlphaStreetMap; //AlphaCoffeeMap to load coffee shop on start
        loadMap(mapToLoad);

        /* DEV TOOL - Launch in battle mode */
        //seedBattle(); //Toggle this line on/off. Should be off for production build

    }

    componentWillMount() {
        if (isTouchDevice()) {
            store.dispatch({
                type: "SET_GAME_VALUE",
                payload: {
                    changes: {
                        isTouchMode: true
                    }
                }
            });
        }
    }

    render() {
        return (
                <div className="ui-wrapper">
                    <AudioOption />
                    <Map />
                    <ReduxStateDisplayer />
                </div>
        );
    }
}




export default GameIndex;