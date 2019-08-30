import { fromJS } from 'immutable';

export const settingsStore = fromJS({
  difficulty: ''
});

export const statusStore = fromJS({
  dice: null,
  game: null,
  player1Position: null,
  player2Position: null,
  turn: 'player1'
});

export const boardStore = fromJS({
  board: []
});
