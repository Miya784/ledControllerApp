import {MODE_1, MODE_2, MODE_3} from './actions';

export const initialState = {
  mode2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

const Reducers = (state = initialState, action) => {
  switch (action.type) {
    case MODE_1: {
      return {
        ...state,
      };
    }
    case MODE_2: {
      const {id, value} = action.payload;
      let newValue = [...state.mode2];
      newValue[id] = value;
      return {
        ...state,
        mode2: newValue,
      };
    }
    case MODE_3: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default Reducers;
