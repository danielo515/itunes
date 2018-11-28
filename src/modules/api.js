import axios from 'axios';

const initialState = {
  loading: false,
  failed: false,
  error: null,
};

// Build time configurations
const {
  REACT_APP_BASE_URL: BASE_URL = 'http://localhost:3001/api',
  REACT_APP_SONGS_PATH: SONGS_PATH = '/songs',
} = process.env;

const api = axios.create({ baseURL: BASE_URL, json: true });
// ACTION TYPES

export const FETCH_SONGS = 'api/FETCH_SONGS';
export const FETCH_COVER = 'api/FETCH_COVER';
export const FETCH_COVER_SUCCEED = 'api/FETCH_COVER_SUCCEED';
export const FETCH_FAILED = 'api/FETCH_FAILED';
export const FETCH_SUCCEED = 'api/FETCH_SUCCEED';
export const FETCHING_SONGS = 'api/FETCHING_SONGS';

// this are not regular action creators, just utility functions
const fetchFailed = dispatch => err =>
  dispatch({
    type: FETCH_FAILED,
    payload: err.message,
  });

const fetchSucceed = dispatch => payload => {
  return dispatch({
    type: FETCH_SUCCEED,
    payload: payload.data,
  });
};

// ACTION CREATORS
export const fetchSongs = _ => dispatch => {
  dispatch({ type: FETCH_SONGS });
  return api
    .get(SONGS_PATH)
    .then(fetchSucceed(dispatch))
    .catch(fetchFailed(dispatch));
};

export const fetchPage = page => dispatch => {
  dispatch({ type: FETCH_SONGS });
  return api
    .get(`${SONGS_PATH}?page=${page}`)
    .then(fetchSucceed(dispatch))
    .catch(fetchFailed(dispatch));
};

export const getCoverUrl = songId => dispatch => {
  dispatch({ type: FETCH_COVER });
  return api
    .get(SONGS_PATH + `/${songId}/cover`)
    .then(covers =>
      dispatch({ type: FETCH_COVER_SUCCEED, payload: covers.data })
    )
    .catch(err => dispatch({ type: FETCH_FAILED, payload: err }));
};

export const actionCreators = {
  fetchSongs,
  getCoverUrl,
  fetchPage,
};

// MAIN REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SONGS:
      return { ...state, failed: false, loading: true, error: null };
    case FETCH_FAILED:
      return { ...state, failed: true, loading: false, error: action.payload };
    case FETCH_SUCCEED:
      return { ...state, failed: false, loading: false, error: null };
    default:
      return state;
  }
};
