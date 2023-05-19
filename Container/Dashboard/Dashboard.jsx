import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import AdminTable from "../../Component/AdminTable/AdminTable";
import TableActionModal from "./TableActionModal";
import { getTableData } from "../../Redux/TableData/tableDataActions";
import { COLUMN_TYPES } from "../../Constants/constant";

const TableDemo = () => {
  const [openModel, setOpenModal] = useState(false);

  const { tableData, isErrorTableData, isLoadingTableData } = useSelector(
    (state) => state?.data
  );

  const toggleModal = () => {
    setOpenModal((prev) => !prev);
  };

  const metaData = [
    {
      headingName: "Name",
      mappingKey: "firstName",
      secondaryMappingKey: "lastName",
      width: "40%",
      colType: COLUMN_TYPES.text,
      handler: {},
    },
    {
      headingName: "Email ID",
      mappingKey: "email",
      width: "30%",
      colType: COLUMN_TYPES.text,
      handler: {},
    },
    {
      headingName: "Mobile Number",
      mappingKey: "phone",
      width: "30%",
      colType: COLUMN_TYPES.mobileNumber,
      handler: {},
    },
  ];

  return (
    <Box>
      <AdminTable
        metaData={metaData}
        tableData={tableData?.result}
        heading="Table Demo"
        actionButtonText="Add data"
        handlerActionButtonClick={toggleModal}
        dispatchFunction={getTableData}
        isLoading={isLoadingTableData}
        isError={isErrorTableData}
        totalCount={tableData?.totalCount}
        responseData={tableData}
        searchBarPlaceHolder={"Search by name"}
        tableDataKey="result"
      />
      {openModel && (
        <TableActionModal open={openModel} toggleModal={toggleModal} />
      )}
    </Box>
  );
};

export default TableDemo;
