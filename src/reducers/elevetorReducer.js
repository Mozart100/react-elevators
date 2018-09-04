import { Designated_Floor_Number } from '../action/elevator_types';


const initialState = {
  floorInstruction: {
    currentFloor: 0,
    designatedFloor: 1,
    direction: 0    //-1 down 0 -Idle 1-up
  }
};

export default function (state = initialState, action) {

  switch (action.type) {
    case Designated_Floor_Number:

        let item = Object.assign({},state);
        item.floorInstruction.designatedFloor = action.payload;
        return item;
        // return {
        //   ...state,
        //   designationFloor: {...state.floorInstruction,
        //      action.payload}
        // // };
      

    default:
      return state;
  }
}