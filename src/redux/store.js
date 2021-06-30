import { configureStore } from "@reduxjs/toolkit";
import gameInfoReducer from "./reducers/gameInfo";
const reducer = {
  gameINfo: gameInfoReducer,
};

const store = configureStore({ reducer });

export default store;
