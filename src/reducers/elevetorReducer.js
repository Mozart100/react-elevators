import { Designated_Floor_Number_Requested, Elevator_Changed_Floor, Initialize_Elevators } from '../action/elevator_types';


const initialState = {
  elevatorInstruction: {
    elevatorId: 0,
    currentFloor: 1,
    designatedFloor: 1,
    direction: 0    //-1 down 0 -Idle 1-up
  },
  elevators: [],
  amountOfFloors: 0,
  requestedElevatorQueue: []
};


export default function (state = initialState, action) {

  const { payload } = action;
  const newState = Object.assign({}, state);

  switch (action.type) {

    case Initialize_Elevators:
      let elevators = [];//Array(payload.amountElevators);
      for (let i = 1; i <= payload.amountElevators; i++) {
        const elev = {
          elevatorId: i,
          currentFloor: 1,
          designatedFloor: 1,
          direction: 0    //-1 down 0 -Idle 1-up
        };
        elevators.push(elev)
      }
      return Object.assign({}, state, {
        elevators,
        amountOfFloors: payload.amountOfFloors,
        requestedElevatorQueue: []
      });


    case Designated_Floor_Number_Requested:
      const requestedFloorNumber = payload;
      var elev = findNeededElevator(newState.elevators, requestedFloorNumber, newState.amountOfFloors);
      if (elev.direction !== 0) {
        newState.requestedElevatorQueue.push(elev.designatedFloor)
      }
      elev.designatedFloor = requestedFloorNumber;
      newState.elevatorInstruction = Object.assign({}, newState.elevatorInstruction, elev);
      // newState.elevatorInstruction = Object.assign({}, newState.elevatorInstruction, elev, { elevatorId: elev.id });
      return newState;

    // case Designated_Floor_Number:
    //   let item = Object.assign({}, state);
    //   item.elevatorInstruction.designatedFloor = action.payload;
    //   return item;

    case Elevator_Changed_Floor:

      const elevator = newState.elevators[action.payload.elevatorId];
      elevator.currentFloor = action.payload.currentFloor;
      elevator.direction = action.payload.direction;
      elevator.designatedFloor = action.payload.designatedFloor;
      return newState;

    default:
      return state;
  }
}

function findNeededElevator(elevators, requestFloor, amountOfFloors) {

  var headedElevators = findAllElevetorsSuitableToRequestFloor(elevators, requestFloor);
  var floors = transformElevatorsToFloorStructures(headedElevators, amountOfFloors);

  for (let index = 0; index < floors.length; index++) {
    if (requestFloor + index <= floors.length) {
      if (floors[requestFloor + index] != null) {

        return floors[requestFloor + index];
      }
    }

    if (requestFloor - index >= 0) {
      if (floors[requestFloor - index] != null) {
        return floors[requestFloor - index];
      }
    }
  }

  return null;
}

function transformElevatorsToFloorStructures(suitableElevators, amountOfFloors) {
  const floors = Array(amountOfFloors);
  floors.fill(null);

  for (let index = 0; index < suitableElevators.length; index++) {
    const elev = suitableElevators[index];
    floors[elev.currentFloor] = elev;
  }

  return floors;
}


function findAllElevetorsSuitableToRequestFloor(elevators, requestFloor) {
  const elevs = []

  for (let index = 0; index < elevators.length; index++) {
    const elev = elevators[index];

    if (elev.direction === 0) {
      elevs.push(elev);
      continue;
    }

    if (elev.currentFloor < requestFloor && elev.direction === 1)
      elevs.push(elev);
    else
      if (elev.currentFloor > requestFloor && elev.direction === 0)
        elevs.push(elev);
  }
  return elevs;
}

