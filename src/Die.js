import React from 'react';


export default function Die(props) {
    const styles = {
        backgroundColor: props.isheld ? "#59E391" : "#fff"
    } 

    return (
    <div 
    className="die-face"
    onClick={props.holdDice}
    style={styles}
    >
        <h3 className="die-num">
            {props.value}
        </h3>
    </div>)
}