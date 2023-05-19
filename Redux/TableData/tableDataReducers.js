import { updateObject } from "../utility";
import * as types from "./types";

const initialState = {
  tableData: [],
  isErrorTableData: false,
  isLoadingTableData: false,
};

const setTableDataResponse = (state, action) => {
  return updateObject(state, {
    tableData: action.payload,
  });
};

const setIsTableDataLoading = (state, action) => {
  return updateObject(state, {
    isLoadingTableData: action.payload,
  });
};

const setIsTableDataApiFailed = (state, action) => {
  return updateObject(state, {
    isErrorTableData: action.payload,
  });
};

const tableReducers = (state = initialState, actions = {}) => {
  switch (actions.type) {
    case types.GET_TABLE_DATA:
      return setTableDataResponse(state, actions);
    case types.IS_ERROR_TABLE_DATA:
      return setIsTableDataApiFailed(state, actions);
    case types.IS_TABLE_DATA_LOADING:
      return setIsTableDataLoading(state, actions);
    default:
      return state;
  }
};

export default tableReducers;
