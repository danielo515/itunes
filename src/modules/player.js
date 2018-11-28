const initialState = {
  cover: null,
};
// ACTION TYPES


// ACTION CREATORS


export const actionCreators = {};

// REDUCER
export default ({ COVER_LOADED }) => (state = initialState, action = {}) => {
  switch (action.type) {
    case COVER_LOADED:
      return {
        ...state,
        cover: action.payload[1].url,
      };
    default:
      return state;
  }
};
