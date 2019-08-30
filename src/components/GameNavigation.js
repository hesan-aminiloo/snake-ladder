import React from 'react';
import { connect } from 'react-redux';
import { Button } from './common';
import {
  closeGame, setGameDifficulty, changeTurn, updatePlayerStatus, createRandomBoard
} from '../App/Actions';
import Roll from './Roll';
import PlacePlayer from './PlacePlayer';

const GameNavigation = ({
  turn, game, player1Position,
  player2Position, difficulty, closeTheGame,
  updateThePlayer, newGame
}) => {

  const resetGame = () => {
    closeTheGame();
    newGame(difficulty);
    updateThePlayer('player1', null);
    updateThePlayer('player2', null);
  }

  return(
    <div className="game-navigation-container">
      <h1 className="game-title">Snake and Ladders</h1>
      {
        game
          ? (
            <div>
              <h3 className={`whos-turn ${turn}-turn`}>{turn}</h3>
              <h5>Game Mode: {difficulty}</h5>
              {
                player1Position && player2Position
                  ? (
                    <Roll />
                  ) : (
                    <PlacePlayer />
                  )
              }

              <div style={{ textAlign: 'center', marginTop: 20, marginBottom: 20 }}>
                <Button
                  className="new-game-btn difficulty-btn"
                  onClick={resetGame}
                >
                  New Game
                </Button>
              </div>

            </div>
          ) : null
      }
    </div>
  );
};

function mapStateToProps(state){
  return {
    turn: state.status.get('turn'),
    game: state.status.get('game'),
    difficulty: state.settings.get('difficulty'),
    player1Position: state.status.get('player1Position'),
    player2Position: state.status.get('player2Position')
  }
};

function mapDispatchToProps(dispatch){
  return {
    newGame: (difficulty) => dispatch(createRandomBoard(difficulty)),
    closeTheGame: () => dispatch(closeGame()),
    setDifficulty: () => dispatch(setGameDifficulty('')),
    changeTheTurn: () => dispatch(changeTurn('player1')),
    updateThePlayer: (player, status) => dispatch(updatePlayerStatus(player, status))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(GameNavigation);
