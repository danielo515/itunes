import { combineReducers } from 'redux';
import player from './player';
import playList from './playList';
import api, { FETCH_SUCCEED, FETCH_COVER_SUCCEED } from './api';

export default combineReducers({
  player: player({ COVER_LOADED: FETCH_COVER_SUCCEED }),
  playList: playList({ SONGS_LOADED: FETCH_SUCCEED }), // look Ma, high-order reducers !
  api,
});
