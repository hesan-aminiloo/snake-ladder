import React from 'react';
import { connect } from 'react-redux';
import NewGame from './NewGame';
import Game from './Game';

const Board = ({ game }) => {
  return (
    <div className="board-container">
      {
        !game
          ? (
            <NewGame />
          )
          : (
            <Game />
          )
      }
    </div>
  )
};

function mapStateToProps(state){
  return {
    game: state.status.get('game')
  }
}

function mapDispatchToProps(dispatch){
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
