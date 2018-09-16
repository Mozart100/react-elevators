
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import elevatorImage from './Images/elv.png';
import { elevatorFloorChanged } from '../action/elevatorAction'
import soundFile from '../components/Audio/ding.mp3'
import styled, { keyframes } from 'styled-components';
import './style/elevator-style.css'

const ElevatorMoverStyled = (from, to) => keyframes`
   0% { top:${from}px; }
   100% { top:${to}px }
`;

const ImgStyled = styled.img`
  background-image:url(${elevatorImage});
  width: 50px;
  margin: 0 auto;
  position: relative;
  text-align:center;
  left:25%;
  animation: ${props => props.isTimeout ? ElevatorMoverStyled(props.currentTop, props.currentTop + 1) : ElevatorMoverStyled(props.currentTop, props.designatedTop)} ${props => props.animationTime}s linear;
  animation-fill-mode:forwards;
  animation-iteration-count:1;
`;


class Elevator2 extends Component {

    constructor(props) {
        super(props);

        this.elevater_Component_Id = "elevator_Component" + this.props.componentId;
        this.state = {
            elevatorId: this.props.componentId,
            componentHeight: this.props.componentHeight, // floorHeight
            numberFloorPressed: -1,
            amountOfFloors: this.props.amountOfFloors,

            totalHeight: this.props.amountOfFloors * this.props.componentHeight,
            currentTop: (this.props.amountOfFloors * this.props.componentHeight) - this.props.componentHeight,
            designatedTop: (this.props.amountOfFloors * this.props.componentHeight) - this.props.componentHeight,

            animationDuration: 0.5,
            isTimeout: false
        }
    }

    static propTypes = {
        componentId: PropTypes.number.isRequired,
        amountOfFloors: PropTypes.number.isRequired,
        componentHeight: PropTypes.number.isRequired,
    };

    componentDidMount() {
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        const { designatedFloor: numberFloorPressed, elevatorId: propsElevatorId } = nextProps;
        const { elevatorId: stateElevatorId, componentHeight, currentTop, amountOfFloors } = prevState;

        if (propsElevatorId === stateElevatorId && numberFloorPressed > 0) {

           console.log('propsElevatorId',propsElevatorId);
           console.log('stateElevatorId',stateElevatorId);

            const currentFloor = amountOfFloors - (currentTop / componentHeight);

            if (numberFloorPressed !== currentFloor) {

                //refactor
                let designated = componentHeight;
                if (currentFloor < numberFloorPressed) {
                    designated = designated * (-1);
                }

                return Object.assign({}, prevState, {
                    numberFloorPressed,
                    designatedTop: currentTop + designated,
                    animationDuration: 0.5,
                    isTimeout: false
                })
            }
            else {
                return Object.assign({}, prevState, { isTimeout: true }, { animationDuration: 2 });
            }
        }

        return prevState;
    }


    runAudio = () => {
        const sound = new Audio(soundFile);
        sound.play();
    }

    animationFinished = () => {
        const { designatedTop, componentHeight, numberFloorPressed, elevatorId, amountOfFloors, isTimeout } = this.state;
        const currentFloor = amountOfFloors - (designatedTop / componentHeight);

        if (isTimeout) {
            this.props.elevatorFloorChanged(elevatorId, currentFloor, 0, numberFloorPressed);
        }
        else {
            if (numberFloorPressed > 0) {
                let direction = numberFloorPressed - currentFloor; //up or down
                //Arrived
                if (direction === 0) 
                    this.runAudio();
                else {
                    direction = direction < 0 ? 1 : -1;
                    this.props.elevatorFloorChanged(elevatorId, currentFloor, direction, numberFloorPressed);
                }

                this.setState({ currentTop: designatedTop })
            }
        }
    }

    componentDidMount = () => {

        const element = document.getElementById(this.elevater_Component_Id);
        element.addEventListener('animationend', (e) => this.animationFinished());
    };

    render() {
        const { currentTop, designatedTop, animationDuration, isTimeout } = this.state;
        // const animationTime = Math.abs(designatedTop - currentTop) / 50 * 0.5;
        // console.log('currentTop=', currentTop);
        // console.log('isTimeout=', isTimeout);
        // console.log('animationDuration=', animationDuration);
        // console.log('designatedTop=', designatedTop);
        console.log('render=');
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