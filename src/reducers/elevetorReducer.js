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
  requestedElevatorQueue: [],
  floorNotified:  {
    designatedFloorId: 0,
    elevatorLocationFloor: 0,
    elevatorId: 0,

  }
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

      // console.log('Designated_Floor_Number_Requested');
      let item = locatingSuitableElevator(newState, payload);
      return item;

    case Elevator_Changed_Floor:

      const elevator = newState.elevators[payload.elevatorId - 1];
      elevator.currentFloor = payload.currentFloor;
      elevator.direction = payload.direction;
      elevator.designatedFloor = payload.designatedFloor;

      let returnedState = newState;
      if (payload.designatedFloor === payload.currentFloor) // reached desitinatio which mean it ready to work
      {
        const destinationFloor = returnedState.requestedElevatorQueue.shift();
        returnedState = locatingSuitableElevator(newState, destinationFloor);
      }
      
      returnedState.floorNotified.designatedFloorId = elevator.designatedFloor;
      returnedState.floorNotified.elevatorLocationFloor = elevator.currentFloor;
      returnedState.floorNotified.elevatorId = elevator.elevatorId;
      return returnedState;

    default:
      return state;
  }
}

function locatingSuitableElevator(newState, payload) {

  if (payload === undefined)
    return newState;

  const requestedFloorNumber = payload;
  const elev = findNeededElevator(newState.elevators, requestedFloorNumber, newState.amountOfFloors);

  if (elev === null) {
    console.log('elev = null and requestedFloorNumber=', requestedFloorNumber);
    newState.requestedElevatorQueue.push(requestedFloorNumber);
  }
  else {
    if (elev.direction !== 0) {
      console.log('elev.direction !== 0 and elev.designatedFloor=', elev.designatedFloor);

      newState.requestedElevatorQueue.push(elev.designatedFloor)
    }
    elev.designatedFloor = requestedFloorNumber;
    newState.elevatorInstruction = Object.assign({}, newState.elevatorInstruction, elev);
  }
  return newState;
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


function findAllElevetorsSuitableToRequestFloor(elevators, requestedFloor) {
  const elevs = []

  for (let index = 0; index < elevators.length; index++) {
    const elev = elevators[index];

    if (elev.direction === 0) {
      elevs.push(elev);
      continue;
    }

    //checking whether elevator heading in the right direction.
    if (elev.currentFloor < requestedFloor && elev.direction === 1)
      if (elev.designatedFloor > requestedFloor) {
        elevs.push(elev);
      }
      else
        if (elev.currentFloor > requestedFloor && elev.direction === -1)
          if (elev.designatedFloor < requestedFloor) {
            elevs.push(elev);
          }
  }
  return elevs;
}

