import * as types from "./types";

export const setIsTableDataApiLoading = (boolean) => {
  return {
    type: types.IS_TABLE_DATA_LOADING,
    payload: boolean,
  };
};

export const setIsTableDataApiError = (boolean) => {
  return {
    type: types.IS_ERROR_TABLE_DATA,
    payload: boolean,
  };
};

export const getTableData = () => {
  return (dispatch) => {
    dispatch(setIsTableDataApiLoading(true));
    axios
      .get("url")
      .then((data) => {
        dispatch(setIsTableDataApiLoading(false));
        dispatch(setIsTableDataApiError(false));
        dispatch({
          type: types.GET_AVAILABLE_SERVICE,
          payload: data,
        });
      })
      .catch((err) => {
        dispatch(setIsTableDataApiError(true));
        dispatch(setIsTableDataApiLoading(false));
      });
  };
};
