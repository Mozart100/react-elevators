import { Designated_Floor_Number_Requested, Elevator_Changed_Floor, Initialize_Elevators } from './elevator_types';

export const requestedElevator = (requestedFloorNumber) => dispatch => {
  dispatch({
    type: Designated_Floor_Number_Requested,
    payload: requestedFloorNumber
  });
}

export const initializeElevators = (amountElevators, amountOfFloors) => dispatch => {
  dispatch({
    type: Initialize_Elevators,
    payload: { amountElevators, amountOfFloors }
  });
}

export const elevatorFloorChanged = (elevatorId, currentFloor, direction,designatedFloor) => dispatch => {
  dispatch({
    type: Elevator_Changed_Floor,
    payload: {
      elevatorId,
      currentFloor,
      direction,
      designatedFloor,

    }
  });
}


