// import { Elevator_Launch_Type } from './types';
import { Designated_Floor_Number} from './elevator_types';

// export const elevatorLaunch = (flag)=> dispatch => {

//   dispatch({
//     type:Elevator_Launch_Type,
//     payload: flag
//   });
// }


export const requestedElevator = (floorNumber)=> dispatch=>{
  dispatch({
    type:Designated_Floor_Number,
    payload:floorNumber
  });
}

