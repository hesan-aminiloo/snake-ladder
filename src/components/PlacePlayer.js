import React from 'react';
import { connect } from 'react-redux';
import { placePlayer, updatePlayerStatus } from '../App/Actions';
import { Button } from './common';

const PlacePlayer = ({
  placeThePlayer, player1Position, player2Position, updateThePlayerStatus
}) => {
  const putPlayer = (player) => {
    updateThePlayerStatus(player, true);
    placeThePlayer(player);
  };

  return(
    <div className="place-player-container">
      {
        !player1Position
          ? (
            <Button
              className="place-player-btn"
              onClick={() => putPlayer('player1')}
            >
              Place P1
            </Button>
          ) : null
      }
      {
        !player2Position
          ? (
            <Button
              className="place-player-btn"
              onClick={() => putPlayer('player2')}
            >
              Place P2
            </Button>
          ) : null
      }
    </div>
  );
};

function mapStateToProps(state){
  return {
    player1Position: state.status.get('player1Position'),
    player2Position: state.status.get('player2Position')
  }
};

function mapDispatchToProps(dispatch){
  return {
    placeThePlayer: (player) => dispatch(placePlayer(player)),
    updateThePlayerStatus: (player, status) => dispatch(updatePlayerStatus(player, status)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlacePlayer);
