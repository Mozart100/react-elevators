import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import elevatorImage from './Images/elv.png';
import { elevatorFloorChanged } from '../action/elevatorAction'
import soundFile from '../components/Audio/ding.mp3'
import styled, { keyframes } from 'styled-components';
import './style/elevator-style.css'

const ImgStyled = styled.img`
  background-image:url(${elevatorImage});
  width: 50px;
  margin: 0 auto;
  position: relative;
  box-sizing:border-box;
  text-align:center;
  left:25%;
  /* top:${props => props.top + 'px'}; */
`;

class Elevator2 extends Component {

    constructor(props) {
        super(props);


        this.state = {
            elevatorId: this.props.componentId,
            numberFloorPressed: 1,
            currentFloor: 1

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
        const { elevatorId: stateElevatorId, currentFloor } = prevState;

        if (propsElevatorId === stateElevatorId) {
            if (designatedFloor !== currentFloor) {
                return Object.assign({}, prevState, { numberFloorPressed })
            }
        }

        return prevState;
    }


    runAudio = () => {

        // const sound = new Audio(soundFile);
        // sound.play();
    }

    TimerAction() {


    }


    render() {
        const { top } = this.state;
        return (
            <ImgStyled src={elevatorImage} style={{ top }}></ImgStyled>
        );
    }
}

const mapStateToProps = state => ({
    elevatorId: state.elevetorReducer.elevatorInstruction.elevatorId,
    designatedFloor: state.elevetorReducer.elevatorInstruction.designatedFloor,
})

export default connect(mapStateToProps, { elevatorFloorChanged })(Elevator2);