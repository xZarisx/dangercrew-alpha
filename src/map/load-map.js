import store from '../redux/store';

export function loadMap(map = {}) {

    store.dispatch({
        type: "REMOVE_NPCS"
    })

    for (var id in map.people) {

        const person_id = id;
        const person = map.people[person_id];

        var npcBehaviorData = {...person.behaviorData}
        if (person.useBehavior == "roaming") {
            npcBehaviorData.pathIndex = 0;
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



    store.dispatch({
        type: "LOAD_MAP",
        map: {
            width:map.width,
            height:map.height,
            backgroundImage:map.backgroundImage,
            walls: map.walls,
            footEvents: map.footEvents,
            interactiveEvents: map.interactiveEvents
        }
    })
}