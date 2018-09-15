
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import elevatorImage from './Images/elv.png';
import { elevatorFloorChanged } from '../action/elevatorAction'
import soundFile from '../components/Audio/ding.mp3'
import styled, { keyframes } from 'styled-components';
import './style/elevator-style.css'



const TimeoutStyled = (from, to) => keyframes`
   0% { background:red; }
   100% { background:blue; }
`;
const ElevatorMoverStyled = (from, to) => keyframes`
   0% { top:${from}px; }
   100% { top:${to}px }
`;

const ImgStyled = styled.img`
  background-image:url(${elevatorImage});
  width: 50px;
  margin: 0 auto;
  position: relative;
  /* box-sizing:border-box; */
  text-align:center;
  left:25%;
  /* animation: ${props => props.isTimeout ? TimeoutStyled(1, 2) : ElevatorMoverStyled(props.currentTop, props.designatedTop)} ${props => props.animationTime}s linear; */
  animation: ${props => props.isTimeout ? ElevatorMoverStyled(props.currentTop, props.currentTop + 1) : ElevatorMoverStyled(props.currentTop, props.designatedTop)} ${props => props.animationTime}s linear;
  animation-fill-mode:forwards;
  /* animation-fill-mode:${props => props.isTimeout ? 'none' : 'forwards'}; */
  animation-iteration-count:1;
`;


class Elevator2 extends Component {

    constructor(props) {
        super(props);

        this.elevater_Component_Id = "elevator_Component" + this.props.componentId;
        this.state = {
            elevatorId: this.props.componentId,
            componentHeight: this.props.componentHeight, // floorHeight
            numberFloorPressed: 1,
            amountOfFloors: this.props.amountOfFloors,

            totalHeight: this.props.amountOfFloors * this.props.componentHeight,
            currentTop: (this.props.amountOfFloors * this.props.componentHeight) - this.props.componentHeight,
            designatedTop: (this.props.amountOfFloors * this.props.componentHeight) - this.props.componentHeight,

            steps: 100,
            animationDuration: 0.5,
            isTimeout: false
        }
    }

    static propTypes = {
        // designatedFloor: PropTypes.number.isRequired,
        // elevatorId: PropTypes.number.isRequired,
    };

    componentDidMount() {
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        const { designatedFloor: numberFloorPressed, elevatorId: propsElevatorId } = nextProps;
        const { elevatorId: stateElevatorId, componentHeight, currentTop, amountOfFloors } = prevState;

        if (propsElevatorId === stateElevatorId) {

            const currentFloor = amountOfFloors - (currentTop / componentHeight);

            if (currentTop % componentHeight === 0) { // removing unneccessary invokation  - Ignore
                if (numberFloorPressed !== currentFloor) {

                    const steps = numberFloorPressed - currentFloor;
                    //refactor
                    let designated = componentHeight;
                    if (currentFloor < numberFloorPressed) {
                        designated = designated * (-1);
                    }

                    return Object.assign({}, prevState, {
                        numberFloorPressed,
                        designatedTop: currentTop + designated,
                        steps: Math.abs(steps),
                        animationDuration: 0.5,
                        isTimeout: false
                    })
                }
                else {
                    return Object.assign({}, prevState, { isTimeout: true }, { animationDuration: 2 });
                }
            }
        }

        return prevState;
    }


    runAudio = () => {
        const sound = new Audio(soundFile);
        sound.play();
    }

    componentDidMount = () => {

        const element = document.getElementById(this.elevater_Component_Id);

        element.addEventListener('animationend', (e) => {
            const { designatedTop, componentHeight, numberFloorPressed, elevatorId, amountOfFloors, steps, isTimeout } = this.state;
            const currentFloor = amountOfFloors - (designatedTop / componentHeight);

            console.log('animationend!!!');

            let direction = numberFloorPressed - currentFloor; //up or down

            // if (steps === 0) {
            //     this.setState({ steps: steps - 1 })
            // }
            // else {
            //     if (steps === -1) {
            //         this.setState({ currentTop: designatedTop, steps: steps - 1 })
            //         this.props.elevatorFloorChanged(elevatorId, currentFloor, 0, numberFloorPressed);
            //         return;
            //     }
            //     else {
            //         // first time its not mistake
            //         if (direction !== 0) {
            //             direction = direction < 0 ? 1 : -1;
            //         }
            //         this.setState({ currentTop: designatedTop, steps: steps - 1 })
            //         this.props.elevatorFloorChanged(elevatorId, currentFloor, direction, numberFloorPressed);
            //     }
            // }


            if (isTimeout) {
                console.log('isTimeout!!!!!!!!!!!!!!!!!!');
                console.log('steps', steps);
                this.runAudio();
                this.setState({ currentTop: designatedTop, steps: steps - 1 })
                this.props.elevatorFloorChanged(elevatorId, currentFloor, 0, numberFloorPressed);

            }
            else{
                if (direction === 0) {
                    // this.runAudio();
                    console.log('direction =================0');
                    
                }
                else {
                    direction = direction < 0 ? 1 : -1;
                    this.props.elevatorFloorChanged(elevatorId, currentFloor, direction, numberFloorPressed);
                }
                
                this.setState({ currentTop: designatedTop, steps: steps - 1 })
            }
                
            // this.setState({ currentTop: designatedTop, steps: steps - 1 })
            // this.props.elevatorFloorChanged(elevatorId, currentFloor, direction, numberFloorPressed);

        });
    };

    render() {
        const { currentTop, designatedTop, animationDuration, isTimeout } = this.state;
        // const animationTime = Math.abs(designatedTop - currentTop) / 50 * 0.5;
        // console.log('currentTop=', currentTop);
        // console.log('isTimeout=', isTimeout);
        // console.log('animationDuration=', animationDuration);
        // console.log('designatedTop=', designatedTop);
        // console.log('animationTime=', animationTime);
        return (
            <ImgStyled src={elevatorImage} currentTop={currentTop} id={this.elevater_Component_Id}
                designatedTop={designatedTop} isTimeout={isTimeout} animationTime={animationDuration}></ImgStyled>
        );
    }
}

const mapStateToProps = state => ({
    elevatorId: state.elevetorReducer.elevatorInstruction.elevatorId,
    designatedFloor: state.elevetorReducer.elevatorInstruction.designatedFloor,
})

export default connect(mapStateToProps, { elevatorFloorChanged })(Elevator2);