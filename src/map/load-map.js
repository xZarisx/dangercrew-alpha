import store from '../init/store';
import {addVisitedMap} from '../redux-action-creators/story-points-actions'

export function getJSON(urlvar) {
    var data = JSON.parse(decodeURIComponent(urlvar));

    //HACK! add a Player if the map from URL doesnt have one. TODO: The mapmaker should enforce a Player being present.
    data.people = data.people || {
            "player": {
                x: 0,
                y: 0,
                dir: "down"
            }
        };
    return data;
}


export function loadMap(map = {}, coords) {

    store.dispatch({
        type: "REMOVE_NPCS"
    })

    for (var id in map.people) {

        const person_id = id;
        var person = map.people[person_id];

        var npcBehaviorData = {...person.behaviorData}
        if (person.useBehavior == "roaming") {
            npcBehaviorData.pathIndex = 0;
        }

        /* Use "useCoords" X & Y for player */
        if (person_id == "player") {
            if (coords) {
                person.x = coords[0];
                person.y = coords[1];
            }
        }

        store.dispatch({
            type: "ADD_PERSON",
            personId: person_id,
            personData: {
                x: person.x,
                y: person.y,
                dir: person.dir,
                skin: person.skin || null,
                interaction: person.interaction || null,
                transitionProgress: 0, //default
                moving: false, //default,
                useBehavior: person.useBehavior,
                behaviorData: npcBehaviorData
            }
        });
    }


    /* CONTRACT */
    store.dispatch({
        type: "LOAD_MAP",
        map: {
            musicTrackId: map.musicTrackId,
            width:map.width,
            height:map.height,
            backgroundImage:map.backgroundImage,
            walls: map.walls,
            footEvents: map.footEvents,
            interactiveEvents: map.interactiveEvents
        }
    });

    /* Add this map to Story Points! */
    if (!map.mapId) {
        console.warn('WARNING! No mapId set for map:', map)
    } else {
        addVisitedMap(map.mapId)
    }
}