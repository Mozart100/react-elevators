import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import logo from './logo.svg';
import Building from './components/building'

const AppStyled = styled.div`
  width:90%;
  margin:auto;
  background-color: #222;
`;

const AppHeaderStyled = styled.div`
  height: 150px;
  padding: 20px;
  color: white;
  margin:0 auto;
  width: 200px;
`;

const TitledStyled = styled.h1`
  font-size: 1.5em;
`;

const ApplogoSpinStyled = keyframes`
  0% {transform: rotate(0deg);  }
  100% {transform: rotate(360deg);  }
`;

const LogoStyled = styled.img`
  animation: ApplogoSpinStyled infinite 20s linear;
  height: 80px;
  margin:0 auto;
  width: 150px;
`;


class App extends Component {
  render() {
    return (
      <AppStyled>
        <AppHeaderStyled >
          <LogoStyled src={logo} alt="logo" />
          <TitledStyled >Elevator HW</TitledStyled>
        </AppHeaderStyled>

        <Building amountOfFloors={10} amountOfElevators={2} />

      </AppStyled>

    );
  }
}

// const mapStateToProps = state => ({
//   posts: state.posts.items,
//   newPost: state.posts.item,
// });

export default App;
