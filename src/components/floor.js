import React from 'react';

const buttonContentStyle = {
  height: '50px',
  width: '50px',
  padding:'0px'
}


const Floor = (props)=> {
  return  <li key={props.id} style={{...buttonContentStyle}}><button type="button" onClick={props.clicked} value={props.id}> {props.id} </button></li>
}

export default Floor;