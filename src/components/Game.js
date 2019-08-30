import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Cell from './Cell';

const Game = ({ board }) => {
  return (
    <div className="board-container-game">
      {
        board.map(cell => {
          return (
            <Cell
              key={cell.index}
              cell={cell}
            />
          );
        })
      }
    </div>
  );
};

function mapStateToProps(state){
  return {
    board: state.board.get('board')
  }
}

export default connect(mapStateToProps, null)(Game);
