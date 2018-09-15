
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import elevatorImage from './Images/elv.png';
import { elevatorFloorChanged } from '../action/elevatorAction'
import soundFile from '../components/Audio/ding.mp3'
import styled, { keyframes } from 'styled-components';
import './style/elevator-style.css'


// const ElevatorMoverStyled = (from, to) => keyframes`
//    from { top:${from}px }
//    to { top:${to}px }
// `;
const ElevatorMoverStyled = (from, to) => keyframes`
   0% { top:${from}px; }
   100% { top:${to}px }
`;

const ImgStyled = styled.img`
  background-image:url(${elevatorImage});
  width: 50px;
  margin: 0 auto;
  position: relative;
  box-sizing:border-box;
  text-align:center;
  left:25%;
  animation: ${props => ElevatorMoverStyled(props.currentTop, props.designatedTop)} ${props => props.animationTime}s linear;
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
            numberFloorPressed: 1,
            amountOfFloors: this.props.amountOfFloors,

            totalHeight: this.props.amountOfFloors * this.props.componentHeight,
            currentTop: (this.props.amountOfFloors * this.props.componentHeight) - this.props.componentHeight,
            designatedTop: (this.props.amountOfFloors * this.props.componentHeight) - this.props.componentHeight,

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

            if (numberFloorPressed !== currentFloor) {

                //refactor
                let designated = componentHeight;
                if (currentFloor < numberFloorPressed) {
                    designated = designated * (-1);
                }

                return Object.assign({}, prevState, {
                    numberFloorPressed,
                    designatedTop: currentTop + designated
                })
            }
        }

        return prevState;
    }


    runAudio = () => {

        // const sound = new Audio(soundFile);
        // sound.play();
    }

    componentDidMount = () => {

        const element = document.getElementById(this.elevater_Component_Id);

        element.addEventListener('animationend', (e) => {
            const { designatedTop, componentHeight, numberFloorPressed, elevatorId, amountOfFloors } = this.state;
            const currentFloor = amountOfFloors - (designatedTop / componentHeight);

            let direction = numberFloorPressed - currentFloor; //up or down

            if (direction !== 0) {
                direction = numberFloorPressed > currentFloor ? 1 : -1;
            }
            else
            {
                this.runAudio();
            }


            this.setState({ currentTop: designatedTop })
            this.props.elevatorFloorChanged(elevatorId, currentFloor, direction, numberFloorPressed);

        });
    };

    render() {
        const { currentTop, designatedTop } = this.state;
        const animationTime = Math.abs(designatedTop - currentTop) / 50 * 0.5;
        // console.log('currentTop=', currentTop);
        // console.log('designatedTop=', designatedTop);
        // console.log('animationTime=', animationTime);
        return (
            <ImgStyled src={elevatorImage} currentTop={currentTop} id={this.elevater_Component_Id}
                designatedTop={designatedTop} animationTime={0.5}></ImgStyled>
        );
    }
}

const mapStateToProps = state => ({
    elevatorId: state.elevetorReducer.elevatorInstruction.elevatorId,
    designatedFloor: state.elevetorReducer.elevatorInstruction.designatedFloor,
})

export default connect(mapStateToProps, { elevatorFloorChanged })(Elevator2);