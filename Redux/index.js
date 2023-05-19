import { combineReducers } from "redux";

import tableDataReducer from "./TableData";

const reducers = {
  data: tableDataReducer,
};

const reducer = combineReducers(reducers);
const store = (state, action) => reducer(state, action);

export default store;
