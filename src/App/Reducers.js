import createReducer from './CreateReducer';

import {
  boardStore,
  statusStore,
  settingsStore
} from './Store';

const board = createReducer(boardStore, {
  SET_RANDOM_BOARD: (boardStore, { data }) => boardStore.set('board', data),
  PLACE_PLAYER: (boardStore, { data }) => boardStore.set('board', data),
  MOVE_PLAYER: (boardStore, { data }) => boardStore.set('board', data)
});

const status = createReducer(statusStore, {
  ROLL_DICE: (statusStore, { data }) => statusStore.set('dice', data),
  OPEN_NEW_GAME: (statusStore, { data }) => statusStore.set('game', data),
  CHANGE_TURN: (statusStore, { data }) => statusStore.set('turn', data),
  UPDATE_PLAYER_STATUS: (statusStore, { data, status }) => statusStore.set(data, status)
});

const settings = createReducer(settingsStore, {
  SET_DIFFICULTY: (settingsStore, { data }) => settingsStore.set('difficulty', data),
});

export {
  board,
  status,
  settings
};
