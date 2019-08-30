/* eslint-disable default-case */
import produce from 'immer';
import {
  SET_RANDOM_BOARD,
  ROLL_DICE,
  OPEN_NEW_GAME,
  SET_DIFFICULTY,
  PLACE_PLAYER,
  MOVE_PLAYER,
  CHANGE_TURN,
  UPDATE_PLAYER_STATUS
} from './Contants';
import { randomNum } from '../helpers';
import store from '../configureStore';
import configs from '../configs';

const getMinMaxByDifficulty = (mode) => {
  const difficulty = store.getState().settings.get('difficulty');
  switch (difficulty) {
    case 'easy':
      return (mode === 'snake') ? [40, 70] : [10, 85];
    case 'normal':
      return (mode === 'snake') ? [20, 85] : [20, 85];
    case 'hard':
      return (mode === 'snake') ? [8, 40] : [25, 70];
  }
};

const putChallenges = (board, snakes, ladders) => {

  for (let i = 0; i < snakes; i += 1){
    board[randomNum(20, 95)].snake = randomNum(...getMinMaxByDifficulty());
  }

  for (let i = 0; i < ladders; i += 1){
    board[randomNum(78, 20)].ladder = randomNum(...getMinMaxByDifficulty());
  }

  return board;
};

const makeRandomCell = (index) => {
  let title = index;
  if (index === 1){
    title = 'Start!';
  }
  if (index === 100){
    title = 'Finish!';
  }
  return {
    index,
    title,
    snake: null,
    ladder: null,
    player1: null,
    player2: null
  };
};

const generateRandomBoard = (snakes, ladders) => {
  let board = [];
  let counter = 100;
  for (let i = 0; i < 10; i += 1){
    let row = [];
    for (let j = 0; j < 10; j += 1){
      row.push(makeRandomCell(counter));
      counter -= 1;
    }
    if (i % 2){
      row = row.reverse();
    }
    board.push(...row);
  }
  // putChallenges(board, snakes, ladders);
  board = putChallenges(board, snakes, ladders);
  return board;
};

const createRandomBoard = difficulty => {
  return dispatch => dispatch({ type: SET_RANDOM_BOARD, data: generateRandomBoard(...configs[difficulty]) });
};

const rollDice = () => {
  const random = Math.floor(Math.random() * 7);
  return dispatch => dispatch({ type: ROLL_DICE, data: random || 1 });
};

const openNewGame = () => dispatch => dispatch({ type: OPEN_NEW_GAME, data: true });

const closeGame = () => dispatch => dispatch({ type: OPEN_NEW_GAME, data: false });


const setGameDifficulty = (difficulty) => {
  return dispatch => dispatch({ type: SET_DIFFICULTY, data: difficulty });
};

const placePlayer = (player) => {
  let gameState = store.getState().board.get('board');
  const newGameState = produce(gameState, draft => {
    draft[gameState.length - 10][player] = true;
  });
  return dispatch => dispatch({ type: PLACE_PLAYER, data: newGameState });
}

const movePlayer = (player, to = undefined) => {
  let gameState = store.getState().board.get('board');
  let increment = store.getState().status.get('dice');
  let playerCurrentPosition = gameState.find(cell => cell[player]);
  let playerNewPosition = null;

  if ((playerCurrentPosition.index + increment) >= 100){
    playerNewPosition = 100;
  }

  if (to){
    playerNewPosition = Math.abs(to - playerCurrentPosition.index);
  } else {
    playerNewPosition = playerCurrentPosition.index + increment;
  }

  const targetPosition = gameState.find(el => {
    if (to){
      return parseInt(el.title) === to;
    }
    return parseInt(el.title) === playerNewPosition
  });
  
  const newGameState = produce(gameState, draft => {
    draft[draft.findIndex(cl => cl.title === playerCurrentPosition.title)][player] = false;
    draft[draft.findIndex(cl => cl.title === targetPosition.title)][player] = true;
  });
  return dispatch => dispatch({ type: MOVE_PLAYER, data: newGameState });
}

const changeTurn = (player) => {
  let playerState = 'player1';
  if (player === 'player1'){
    playerState = 'player2';
  }
  return dispatch => dispatch({ type: CHANGE_TURN, data: playerState });
};

const updatePlayerStatus = (player, status) => {
  return dispatch => dispatch({ type: UPDATE_PLAYER_STATUS, data: `${player}Position`, status });
};

export {
  createRandomBoard,
  rollDice,
  openNewGame,
  closeGame,
  setGameDifficulty,
  placePlayer,
  movePlayer,
  changeTurn,
  updatePlayerStatus
};
