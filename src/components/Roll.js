import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  rollDice,
  movePlayer,
  updatePlayerStatus,
  changeTurn
} from '../App/Actions';
import Dice from './Dice';
import { Button } from './common';

const Roll = ({
  diceNumber, rollTheDice, moveThePlayer, playerTurn, changeTheTurn
}) => {
  const [loading, setLoading] = useState(false);

  const roll = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      rollTheDice();
      moveThePlayer(playerTurn);
      changeTheTurn(playerTurn);
    }, 1000);
  };

  return(
    <div className="roll-dice-container">
      {
        diceNumber
          ? (
            <Dice
              number={diceNumber}
              loading={loading}
            />
          ) : null
      }
      <div className="roll-btn-container">
        <Button
          onClick={roll}
          className="roll-btn"
          disabled={loading}
        >
          Roll
        </Button>
      </div>
    </div>
  );
};

function mapStateToProps(state){
  return {
    diceNumber: state.status.get('dice'),
    playerTurn: state.status.get('turn')
  }
}

function mapDispatchToProps(dispatch){
  return {
    rollTheDice: () => dispatch(rollDice()),
    moveThePlayer: (player) => dispatch(movePlayer(player)),
    changeTheTurn: (player) => dispatch(changeTurn(player))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Roll);
