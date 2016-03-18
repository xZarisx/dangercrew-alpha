import store from '../init/store';
import {loadMap} from '../map/load-map'
import {getUpdatedX, getUpdatedY} from './location-helpers'
import handleBattleZoneTrigger from '../battle-requests/battle-request-handler'
import Maps from '../_data/maps/maps'

var LocationService = function() {
    var self = this;

    self.reserved = {};

    self.isFree = (x, y) => {
        const location = `${x}x${y}`;

        const locations = {...store.getState().map.walls};

        /* Don't let Character walk off the map */
        if (x < 0 || x >= store.getState().map.width) {
            return false;
        }
        if (y < 0 || y == store.getState().map.height) {
            return false;
        }



        //First check Statics & Reserved
        if (typeof locations[location] != "undefined" || typeof self.reserved[location] != "undefined") {
            //console.log('there is a thing here')
            return false
        }

        //Then check People
        const people = store.getState().people;
        var conflict = false;
        for (var person in people) {
            if (people[person].x == x && people[person].y == y) {
                conflict = true;
                //console.log('TRUE')
            }
        }
        if (conflict) {
            return false;
        };


        return true;

    }

    self.reserveCell = (x,y, id) => {
        if (!id) {
            console.warn("LocationService.reserveCell used without an id! This is bad. Fix it.")
        }
        self.reserved[`${x}x${y}`] = {"type":"solid", "id":id};
    };

    self.removeReservedCell = (x,y) => {
        delete self.reserved[`${x}x${y}`];
    };

    self.checkActions = (x,y) => {
        //console.log("checking actions on ", x, y);

        const footEvents = {...store.getState().map.footEvents, ...{}}

        const action = footEvents[`${x}x${y}`] || null;

        /* MAP TRANSITION */
        if (action && action.type == "map-transition") {

            const playerDirection = store.getState().people.player.dir;
            if (playerDirection == action.playerDirection) {

                if (!Maps[action.mapName]) {
                    console.warn('mapName known')
                    return false;
                }

                //setTimeout(() => { /* setTimeout in case you want to transition a fade in/out? */
                    loadMap(Maps[action.mapName])
                //}, 300)
            }
        }

        /* STEP ON A BATTLE ZONE */
        if (action && action.type == "battle-zone") {
            handleBattleZoneTrigger(action);
        }

    };

    self.getInteraction = () => {

        const node = store.getState().people.player;
        const checkX = getUpdatedX(node.dir, node.x);
        const checkY = getUpdatedY(node.dir, node.y);

        //Check static interactions
        const spaceEvent = store.getState().map.interactiveEvents[`${checkX}x${checkY}`];

        if (spaceEvent) {
            return spaceEvent
        }

        //Check people
        const people = store.getState().people;
        for (var person in people) {
            if (!people[person].moving && people[person].x == checkX && people[person].y == checkY) {
                console.log('MATCH', people[person])
                return {
                    ...people[person].interaction,
                    npc_id: person /* Included in response to control NPC being talked to */
                }
            }
        }

        /* check reserved */
        const reserved = self.reserved[`${checkX}x${checkY}`];
        if (reserved && reserved.id.match(/npc_/)) {
            return {
                ...people[reserved.id].interaction,
                npc_id: reserved.id /* Included in response to control NPC being talked to */
            }
        }

        //didn't find anything
        return null;

    }


};
export default new LocationService();
