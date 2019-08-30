import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createRandomBoard, openNewGame, setGameDifficulty } from '../App/Actions';
import { Button } from './common';

const NewGame = ({ newGame, openNewGameRoom, setDifficulty }) => {
  const [select, setSelect] = useState(false);

  const selectDifficulty = () => {
    setSelect(true);
  };

  const startNewGame = (difficulty) => {
    setDifficulty(difficulty);
    newGame(difficulty);
    openNewGameRoom();
  };

  return (
    <div className="new-game-container">
      {
        select
          ? (
            <div className={`select-difficulty`}>
              <Button
                className="new-game-btn difficulty-btn"
                onClick={() => startNewGame('easy')}
              >
                Easy
              </Button>

              <Button
                className="new-game-btn difficulty-btn"
                onClick={() => startNewGame('normal')}
              >
                Normal
              </Button>

              <Button
                className="new-game-btn difficulty-btn"
                onClick={() => startNewGame('hard')}
              >
                Hard
              </Button>
            </div>
          ) : (
            <Button
              className="new-game-btn"
              onClick={selectDifficulty}
            >
              Start new game
            </Button>
          )
      }
    </div>
  );
};

function mapDispatchToProps(dispatch){
  return {
    newGame: (difficulty) => dispatch(createRandomBoard(difficulty)),
    openNewGameRoom: () => dispatch(openNewGame()),
    setDifficulty: (difficulty) => dispatch(setGameDifficulty(difficulty))
  }
}

export default connect(null, mapDispatchToProps)(NewGame);
