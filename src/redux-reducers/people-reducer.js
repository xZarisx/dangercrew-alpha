export function people(state = {}, action) {

    var updatePersonNode = (changes) => {

        if (!state[action.mover_id]) {
            return {...state}
        }

        var newNode = {
            ...state[action.mover_id],
            ...changes
        }
        var newState = {...state}
        newState[action.mover_id] = newNode;

        return newState;
    };

    switch(action.type) {

        case 'ADD_PERSON':
            let newState = {...state};
            newState[action.personId] = action.personData;
            return {
                ...newState
            };

        case 'START_MOVING':
            return updatePersonNode({
                moving: true
            });

        case 'SET_NPC_PATH_INDEX':

            if (!state[action.mover_id]) {
                return {...state}
            }

            var newNode = {
                ...state[action.mover_id]
            }
            newNode.behaviorData.pathIndex = action.pathIndex

            var newState = {...state}
            newState[action.mover_id] = newNode;

            return newState;

        case 'REMOVE_NPCS': /* remove all but player when moving to new map */
            var people = {...state};
            for (var person in people) {
                if (person.match(/npc_/)) {
                    console.log('deleting', person);
                    delete people[person];
                }
            }

            return people;

        case 'STOP_MOVING':
            return updatePersonNode({
                moving: false
            });

        case 'UPDATE_TRANSITION_PROGRESS':
            return updatePersonNode({
                transitionProgress: action.progress
            });

        case 'UPDATE_PLAYER_POSITION':
            return updatePersonNode({
                x: action.x,
                y: action.y
            });

        case 'UPDATE_DIRECTION':
            return updatePersonNode({
                dir: action.direction
            });

        default:
            return state;
    }
}

