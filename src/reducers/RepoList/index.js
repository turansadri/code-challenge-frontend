import { FETCH_START, FETCH_ERROR, FETCH_SUCCESS } from '../../actions';

const initialState = {
  loading: true,
  error: null,
  data: [],
  nextPage: null,
  isLastPage: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case FETCH_SUCCESS: {
      const isLastPage = action.nextPage ? false : true;
      const nextPage = action.nextPage ? action.nextPage : null;
      const newData = [ ...state.data, ...action.data ];
      return {
        ...state,
        loading: false,
        error: null,
        nextPage,
        isLastPage,
        data: newData,
      }
    }
    default:
      return state;
  }
};
