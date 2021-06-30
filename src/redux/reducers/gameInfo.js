import {
  ADDUSERANSWER,
  ADDLASTGAMESCORE,
  ADDWRONGANSWER,
} from "../actions/actionTypes";

const initialState = {
  userAnswer: [],
  wrongAnswer: [],
  addLastGameScore: 0,
};

// retun in obj form to store the info form the user shopping cart
function gameInfoReducer(state = initialState, action) {
  switch (action.type) {
    case ADDUSERANSWER:
      return { ...state, userAnswer: [...state.userAnswer, action.payload] };

    case ADDWRONGANSWER:
      return { ...state, wrongAnswer: [...state.wrongAnswer, action.payload] };

    case ADDLASTGAMESCORE:
      return {
        ...state,
        addLastGameScore: [state.addLastGameScore, action.payload],
      };

    default:
      return state;
  }
}

export default gameInfoReducer;
