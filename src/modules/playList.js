import sort from 'lodash/sortBy';

const initialState = {
  songs: [],
  favorites: [],
  idx: 0,
  sortBy: '',
  current: { title: 'Loading songs', artist: '...' },
};
// ACTION TYPES
const LIKE = 'playlist/LIKE';
const UNLIKE = 'playlist/UNLIKE';
const SELECT = 'playlist/SELECT';
const SORT = 'playlist/SORT';
const NEXT = 'playlist/NEXT';
const PREV = 'playlist/PREV';

// ACTION CREATORS
const like = title => ({
  type: LIKE,
  title,
});

const unlike = title => ({
  type: UNLIKE,
  title,
});

const select = title => ({
  type: SELECT,
  title,
});

const sortBy = by => ({
  type: SORT,
  payload: by,
});

const next = _ => ({
  type: NEXT,
});

const previous = _ => ({
  type: PREV,
});

export const actionCreators = {
  like,
  unlike,
  select,
  next,
  sortBy,
  previous,
};

// REDUCER
/* This is what I called high order reducers. Instead of coupling related (or potentially related)
reducers between them by requiring their respective actions we just accept them as a parameters, allowing
actions injection, which will then be composed on a store file and you will see the relation between all reducers
there, clearly and in one single place.
*/
export default ({ SONGS_LOADED }) => (
  state = initialState,
  action = { payload: {} }
) => {
  const goto = i => ({
    current: state.songs[i],
    idx: i,
  });

  switch (action.type) {
    case LIKE:
      return {
        ...state,
        favorites: state.favorites.concat(action.title),
      };
    case UNLIKE:
      return {
        ...state,
        favorites: state.favorites.filter(i => i !== action.title),
      };
    case SORT:
      return {
        ...state,
        songs: sort(state.songs, action.payload),
        sortBy: action.payload,
      };
    case SELECT:
      const idx = state.songs.findIndex(song => song.title === action.title);
      return {
        ...state,
        ...goto(idx),
      };
    case NEXT:
      const next = state.idx + 1;
      return {
        ...state,
        ...(next < state.songs.length ? goto(next) : {}),
      };
    case PREV:
      const prev = state.idx - 1;
      return {
        ...state,
        ...(prev >= 0 ? goto(prev) : {}),
      };
    case SONGS_LOADED:
      return {
        ...state,
        // I know, we are a bit coupled to the API, but who isn't
        songs: action.payload.songs,
        current: action.payload.songs[0],
        page: action.payload.page,
        total: action.payload.total,
      };
    default:
      return state;
  }
};
