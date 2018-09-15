
import React, { Component } from 'react';
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
   0% { top:${from}px }
    /* 99% { top:${to}px }  */
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
  /* animation: ${props => ElevatorMoverStyled(props.currentTop, props.designatedTop)} 2s linear; */
  animation-fill-mode:forwards;
  /* animation: ${props => ElevatorMoverStyled(props.currentTop, props.designatedTop)} infinite 5s linear; */
`;
/* animation: ${ElevatorMoverStyled}  ${props.animationTimeInSeconds}s linear; */
/* top:${props => props.top + 'px'}; */


class Elevator2 extends Component {

    // static  amountFloors = this.props.amountFloors;

    constructor(props) {
        super(props);

        this.amountFloors = this.props.amountFloors;

        this.state = {
            elevatorId: this.props.componentId,
            componentHeight: this.props.componentHeight, // floorHeight
            numberFloorPressed: 1,

            totalHeight: this.props.amountOfFloors * this.props.componentHeight,
            currentTop: (this.props.amountOfFloors * this.props.componentHeight) - this.props.componentHeight + 2,
            designatedTop: (this.props.amountOfFloors * this.props.componentHeight) - this.props.componentHeight,

        }

        // console.log('componentHeight = ',this.props.componentHeight);

        // console.log('currentTop = ', this.state.currentTop)
        // console.log('amountFloors = ',this.amountFloors);
        // console.log('currentTop = ',(this.amountOfFloors * this.props.componentHeight));
        // console.log('designatedTop = ',this.state.designatedTop);
    }

    static propTypes = {
        // designatedFloor: PropTypes.number.isRequired,
        // elevatorId: PropTypes.number.isRequired,
    };

    componentDidMount() {
    }

    calculateCurrentFloorByPosition(position) {
        return this.state.amountOfFloors - (position / this.state.componentHeight)
        // return 10 - (position / 50)
    }

    calculatePositionOfTheFloor(floor) {
        const height = (this.amountOfFloors * this.state.componentHeight);
        return height - ((floor * this.state.componentHeight) + this.state.componentHeight);
        // return 500 - ((floor * 50) + 50);
    }

    calculatePositionByFloor(floorNumber, componentHeight) {
        return floorNumber * componentHeight;
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        const { designatedFloor: numberFloorPressed, elevatorId: propsElevatorId } = nextProps;
        const { elevatorId: stateElevatorId, currentFloor, componentHeight } = prevState;



        if (propsElevatorId === stateElevatorId) {
            if (numberFloorPressed !== currentFloor) {
                // console.log('yyyy',this.amountFloors);
                return Object.assign({}, prevState, {
                    numberFloorPressed,
                    // designatedTop:300
                    designatedTop: (10 - numberFloorPressed) * componentHeight
                    // designatedFloor: this.calculatePositionByFloor(numberFloorPressed, componentHeight)
                })
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

    finishedCallback = (position) => {
        // this.setState((state)=>{})
        console.log('position=', position);
    }

    componentDidMount = () => {
        const element = document.getElementById('anatoliy_component');
        element.addEventListener('animationend', () => {
            console.log('animation finished');
            const { currentTop, designatedTop } = this.state;

            if (currentTop !== designatedTop) {
                this.setState({ currentTop: designatedTop });
            }
          // Do anything here like remove the node when animation completes or something else!
        });
      };

    render() {
        const { currentTop, designatedTop } = this.state;
        const animationTime = Math.abs(designatedTop - currentTop) / 50 * 0.5;
        console.log('currentTop=', currentTop);
        console.log('designatedTop=', designatedTop);
        console.log('animationTime=', animationTime);
        return (
            // <ImgStyled src={elevatorImage} currentTop={450}
            //     designatedTop={200} animationTime={2}></ImgStyled>


            <ImgStyled src={elevatorImage} currentTop={currentTop} id="anatoliy_component"
                designatedTop={designatedTop} animationTime={animationTime}></ImgStyled>


            // <ImgStyled src={elevatorImage} currentTop={currentTop} designatedTop={this.state.designatedTop}></ImgStyled>
            // <ImgStyled src={elevatorImage} currentTop={this.state.currentTop} designatedTop={this.state.designatedTop}></ImgStyled>
        );

    }
    componentDidUpdate(prevProps, prevState, prevContext) {
        // console.log('componentDidUpdate(prevProps, prevState, prevContext)')

        const { currentTop, designatedTop } = this.state;

        // if (currentTop !== designatedTop) {
        //     this.setState({ currentTop: designatedTop });
        // }

        // console.log('currentTop=', currentTop);
        // console.log('designatedTop=', designatedTop);
        // console.log('componentDidUpdate(prevProps, pr♫evState, prevContext)')
    }
}

const mapStateToProps = state => ({
    elevatorId: state.elevetorReducer.elevatorInstruction.elevatorId,
    designatedFloor: state.elevetorReducer.elevatorInstruction.designatedFloor,
})

export default connect(mapStateToProps, { elevatorFloorChanged })(Elevator2);