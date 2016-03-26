import $ from 'jquery'
import store from '../init/store'
import {convertText} from '../messaging/text-converter'
import LocationService from './location-service'
import { getOppositeDirection } from './location-helpers'


export default function ActionButtonController() {

    var ctrl = this;
    ctrl.btnSafe = true;

    const actionKey = 32; //THIS SHOULD BE LOADED IN FROM A SETTING?

    /* Mobile bindings */
    /* Keeping this here as a jQuery binding because the functionality for talking is right here */
    console.log('bind')
    $('.viewport').on('click', '.player', function() {
        console.log('yep');
        ctrl.handleActionButton();
    });




    $(document).on('keydown.action-button-controller', (e) => {
        if (e.which == actionKey && ctrl.btnSafe) {
            ctrl.btnSafe = false;
            //Callback...
            ctrl.handleActionButton();
        }
    }).on('keyup.action-button-controller', (e) => {
        if (e.which == actionKey) {
            ctrl.btnSafe = true;
        }
    });

    ctrl.handleActionButton = () => {

        if (store.getState().game.gameArea != "map") {
            return;
        }

        if (store.getState().game.isPaused) { /* TODO: remove this logic. It's old. gameArea is the way to go */
            console.log('action button during pause state')
            return;
        }
        if (store.getState().game.isShowingTextbox) {
            //console.log('textbox already open')
            return false;
        }


        console.log('action button');
        const interaction = LocationService.getInteraction();


        //Case: handle dialogue
        if (interaction && (interaction.type == "dialog" || interaction.type == "readable")) {

            if (interaction.type == "dialog") {
                console.warn('interaction type is `dialog`. change to `readable`')
            }


            //Puppet the NPC, if interaction is with an NPC
            if (interaction.npc_id) {
                if (store.getState().people[interaction.npc_id].useBehavior == "stationary") {
                    store.dispatch({
                        type: "UPDATE_DIRECTION",
                        mover_id: interaction.npc_id,
                        direction: getOppositeDirection(store.getState().people.player.dir)
                    });
                }
            }

            /* Define Content for the interaction */
            var content = interaction.dialog || interaction.content;
            if (interaction.content) {
                console.warn("`content` used instead of `dialog`. Clean it up.")
            }
            if (interaction.restrictedDirections) {
                if (!isPlayerValidDirection(interaction.restrictedDirections)) {
                    content = interaction.restrictionErrorDialog || interaction.restrictionErrorContent;
                }
                if (interaction.restrictionErrorContent) {
                    console.warn("`restrictionErrorContent` used instead of `restrictionErrorDialog`. Clean it up.")
                }
            }

            /* conver pages to useable thing */
            var pages = content.map(page => {
                return convertText(page)
            });


            store.dispatch({
                type: "SET_MESSAGE",
                payload: pages
            });

            store.dispatch({
                type: "SHOW_TEXTBOX",
            });

        }
    }

    /* Helpers */
    function isPlayerValidDirection(validDirections = []) {
        const dir = store.getState().people.player.dir;
        return (validDirections.indexOf(dir) != -1)
    }

}