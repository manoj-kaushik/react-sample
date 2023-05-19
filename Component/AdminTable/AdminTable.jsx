import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import {
  Box,
  Pagination,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SearchBar from "../SearchBar/SearchBar";
import CustomLoader from "../CustomLoader/CustomLoader";
import AdminTableRow from "./AdminTableRow";
import CustomButton from "../CustomButton/CustomButton";
import EmptyIcon from "../../../Assests/img/empty.svg";
import DoubleArrow from "../../../Assests/img/arrow.png";
import CustomToolTip from "../../CustomToolTip/CustomToolTip";
import {
  buttonTypes,
  ROW_PER_PAGE_OPTIONS,
  DEBOUNCE_TIME,
} from "../../../Constants/constant";
import { urlService } from "../../../Services/urlservice";
import { SOMETHING_WENT_WRONG } from "../../../Constants/errorMessage";
import { commonStyles } from "../../../Assests/Styles/commonStyles";
import { styles } from "./AdminTableStyles";
import "./AdminTable.css";

const AdminTable = (props) => {
  const {
    tableData,
    metaData,
    heading,
    customHeadingStyle,
    actionButtonText,
    searchBarPlaceHolder,
    handlerActionButtonClick,
    searchBarInputMaxLength,
    hidePagination,
    dispatchFunction,
    totalCount,
    isLoading,
    type,
    isError,
    customTableRowContainer,
    showHorizontalScroll,
    hideSearch,
    customMainWrapper,
    showFilters,
    filterData,
    customTableWrapper,
    childComponent,
    callbackOnTableParamsChange,
    enableSort,
    enabledSortingIds,
    tableTopChildren,
    headerRoute,
  } = props;

  const [tableQueryParams, setTableQueryParams] = useState(() =>
    urlService.getTableQueryParams(
      hidePagination,
      hideSearch,
      showFilters,
      enableSort,
      enabledSortingIds,
      filterData
    )
  );
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handlepageChange = (event, pageNumber) => {
    setTableQueryParams((prev) => {
      return { ...prev, page: pageNumber };
    });
  };

  const handleSearch = (searchedValue) => {
    setTableQueryParams((prev) => {
      return { ...prev, search: searchedValue, page: 1 };
    });
  };

  const handleSort = (filter, dir) => {
    setTableQueryParams((prev) => {
      const newPrevSort =
        { ...prev }?.sort?.filter(
          (sortDetail) => sortDetail.filter !== filter
        ) || [];

      if (!dir) {
        return { ...prev, sort: [...newPrevSort] };
      }
      return {
        ...prev,
        sort: [...newPrevSort, { filter, direction: dir }],
      };
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setTableQueryParams((prev) => {
      return { ...prev, page: 1, rowPerPage: +event.target.value };
    });
  };

  const defaultLabelDisplayedRows = ({ from, to, count }) => {
    return `View ${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`;
  };

  const getPaginationCount = () => {
    return Math.ceil(totalCount / +tableQueryParams.rowPerPage);
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((searchValue) => {
        setTableQueryParams((prev) => {
          return { ...prev, search: searchValue, page: 1 };
        });
      }, DEBOUNCE_TIME),
    []
  );

  const handleDispatch = () => {
    const paginationParams = {
      keyword: tableQueryParams.search,
      limit: tableQueryParams.rowPerPage,
      skip: (tableQueryParams.page - 1) * tableQueryParams.rowPerPage || 0,
    };

    dispatch(
      dispatchFunction({
        ...(!hidePagination && paginationParams),
      })
    );
  };

  useEffect(() => {
    dispatchFunction && handleDispatch();
    let newTableParams = { ...tableQueryParams };
    if (enableSort && tableQueryParams.sort) {
      newTableParams = {
        ...tableQueryParams,
        sort: JSON.stringify(tableQueryParams.sort),
      };
    }
    urlService.setQueryParameters({ ...newTableParams });
    callbackOnTableParamsChange && callbackOnTableParamsChange();
  }, [tableQueryParams]);

  useEffect(() => {
    totalCount &&
      +tableQueryParams?.page > getPaginationCount() &&
      setTableQueryParams((prev) => {
        return { ...prev, page: 1 };
      });
  }, [totalCount]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, []);

  const renderSortingCoumns = (data) => {
    const currentDirection = tableQueryParams?.sort?.find(
      (sortData) => sortData.filter === data.mappingKey
    )?.direction;

    return (
      <>
        {currentDirection === "asc" ? (
          <CustomToolTip title="ascending sort">
            <ArrowDownwardIcon sx={styles.sortingIcons} />
          </CustomToolTip>
        ) : currentDirection === "desc" ? (
          <CustomToolTip title="descending sort">
            <ArrowUpwardIcon sx={styles.sortingIcons} />
          </CustomToolTip>
        ) : (
          <Typography
            component="img"
            src={DoubleArrow}
            sx={styles.doubleArrow}
          />
        )}
      </>
    );
  };

  const handleClickSortableColumn = (mappingKey) => {
    const direction = tableQueryParams?.sort?.find(
      (sortData) => sortData.filter === mappingKey
    )?.direction;
    enableSort && direction === "asc"
      ? handleSort(mappingKey, "desc")
      : direction === "desc"
      ? handleSort(mappingKey, "")
      : handleSort(mappingKey, "asc");
  };

  return (
    <Box sx={{ ...styles.tableMainWrapper, ...customMainWrapper }}>
      {headerRoute?.length && (
        <Box display="flex">
          {headerRoute?.map((item, index) => {
            return (
              <Box key={item?.name} display="flex">
                {item?.icon && item?.icon}&nbsp;
                <Typography
                  onClick={item?.url ? () => navigate(item?.url) : () => {}}
                  sx={!item?.isActive && styles.inactiveHeaderNavigation}
                >
                  {item?.name}
                </Typography>
                &nbsp;&nbsp;
                {index !== headerRoute?.length - 1 && "/"}&nbsp;
              </Box>
            );
          })}
        </Box>
      )}

      <Box sx={styles.topContainer}>
        <Typography sx={{ ...styles.heading, ...customHeadingStyle }}>
          {heading}
        </Typography>

        <Box sx={styles.actionItemContainer}>
          <Box sx={styles.searchbarContainer}>
            {searchBarPlaceHolder && (
              <SearchBar
                placeholder={searchBarPlaceHolder}
                onSearch={handleSearch}
                debouncer={debouncedSearch}
                type={type}
                maxLength={searchBarInputMaxLength}
                initialValue={tableQueryParams.search}
              />
            )}
          </Box>
          {actionButtonText && (
            <CustomButton
              type={buttonTypes.subPrimary}
              customStyles={styles.actionButton}
              onClick={handlerActionButtonClick}
            >
              {actionButtonText}
            </CustomButton>
          )}
        </Box>
      </Box>
      <Box sx={{ ...styles.tableWrapper, ...customTableWrapper }}>
        {tableTopChildren && <Box>{tableTopChildren}</Box>}
        <Box sx={showHorizontalScroll && styles.outerScrollStyle}>
          {childComponent ? (
            childComponent
          ) : (
            <Box sx={showHorizontalScroll && styles.innerScrollStyle}>
              <TableContainer
                component={Paper}
                sx={{
                  ...styles.tableMainContainer,
                  ...commonStyles.customScrollBar,
                }}
              >
                <Table
                  sx={styles.tableContainer}
                  stickyHeader
                  aria-label="customized table"
                >
                  <TableHead>
                    <TableRow sx={styles.tableHeadRow}>
                      {metaData.map((data, index) => {
                        return (
                          <TableCell
                            key={index}
                            className={data.className}
                            sx={{ ...styles.headingText, ...data.headingStyle }}
                            width={data.width}
                          >
                            {!enableSort ||
                            !enabledSortingIds?.includes(data.mappingKey) ? (
                              data.headingName
                            ) : (
                              <Box
                                sx={styles.enableSortHeadingContainer}
                                onClick={() =>
                                  handleClickSortableColumn(data.mappingKey)
                                }
                              >
                                <Box>{data.headingName}</Box>
                                {enabledSortingIds?.includes(data.mappingKey) &&
                                  renderSortingCoumns(data)}
                              </Box>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
              {isLoading || isError || !+totalCount ? (
                <Box sx={styles.presentation}>
                  {isLoading ? (
                    <CustomLoader />
                  ) : isError ? (
                    <Box sx={commonStyles.heading}>
                      {SOMETHING_WENT_WRONG}...
                    </Box>
                  ) : (
                    <Box sx={commonStyles.heading}>
                      <Typography
                        component="img"
                        src={EmptyIcon}
                        sx={styles.emptyIcon}
                      />
                      <Typography sx={styles.emptyMessage}>
                        It's empty in here
                      </Typography>
                    </Box>
                  )}
                </Box>
              ) : (
                <TableContainer
                  component={Paper}
                  sx={{
                    ...styles.tableMainContainer,
                    ...commonStyles.customScrollBar,
                    ...styles.tableRowContainer,
                    ...customTableRowContainer,
                  }}
                >
                  <Table
                    sx={styles.tableContainer}
                    stickyHeader
                    aria-label="customized table"
                  >
                    <TableBody>
                      {tableData.map((data, index) => {
                        return (
                          <AdminTableRow
                            key={index}
                            tableData={data}
                            metaData={metaData}
                          />
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          )}
        </Box>
      </Box>
      {!hidePagination && +totalCount ? (
        <Box sx={styles.paginationContainer}>
          <Pagination
            count={getPaginationCount() || 0}
            variant="outlined"
            shape="rounded"
            next={"text"}
            page={+tableQueryParams.page}
            onChange={handlepageChange}
            sx={styles.pagination}
          />
          <TablePagination
            rowsPerPageOptions={ROW_PER_PAGE_OPTIONS}
            sx={styles.tablePagination}
            component="div"
            count={+totalCount || 0}
            SelectProps={{
              IconComponent: KeyboardArrowDownIcon,
            }}
            onPageChange={() => {}}
            rowsPerPage={+tableQueryParams.rowPerPage}
            labelDisplayedRows={defaultLabelDisplayedRows}
            page={+tableQueryParams.page - 1}
            showFirstButton={false}
            labelRowsPerPage=""
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default AdminTable;
