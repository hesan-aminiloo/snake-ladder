import React from 'react';
import { connect } from 'react-redux';
import { Board } from './components';
import GameNavigation from './components/GameNavigation';

const SnakeLadder = ({ props }) => {
  return(
    <div className="container clearfix">
      <GameNavigation />
      <Board />
    </div>
  );
};

function mapStateToProps(state){
  return {
    board: state.board
  }
}

export default connect(mapStateToProps, null)(SnakeLadder);
