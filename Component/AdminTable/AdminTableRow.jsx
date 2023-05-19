import React from "react";
import { Typography, TableRow, TableCell } from "@mui/material";

import { formattedPhoneNumber } from "../../../Services/phoneNumberService";
import { styles } from "./AdminTableStyles";
import { COLUMN_TYPES } from "../../Constants/constant";

const AdminTableRow = (props) => {
  const { tableData, metaData } = props;

  return (
    <React.Fragment>
      <TableRow sx={styles.mainRows}>
        {metaData.map((i, index) => {
          const IconComponentList = i.icon;
          return (
            <TableCell className={i.className} key={index} width={i.width}>
              {i.colType === COLUMN_TYPES.text && (
                <Typography
                  className={i.className}
                  sx={{
                    ...styles.itemNormalText,
                    ...(i.handler.onClick && styles.itemClickableText),
                  }}
                  onClick={
                    i?.handler?.onClick
                      ? () => i.handler.onClick(tableData?.[i?.idKey])
                      : () => {}
                  }
                >
                  {tableData[i.conditionalMappingTrueMappingKey] || "Nil"}
                  &nbsp;
                  {(i.conditionalMappingTrueSecondaryMappingKey &&
                    tableData[i.conditionalMappingTrueSecondaryMappingKey]) ||
                    ""}
                </Typography>
              )}
              {i.colType === COLUMN_TYPES.dynamicColumn && (
                <>{i?.getDynamicColumn(tableData, i)}</>
              )}
              {i.colType === COLUMN_TYPES.mobileNumber && (
                <Typography
                  component="a"
                  href={`tel:${tableData[i.mappingKey]}`}
                  className={i.className}
                  sx={{
                    ...styles.itemNormalText,
                    ...(i.handler.onClick && styles.itemClickableText),
                  }}
                >
                  {tableData[i.mappingKey] &&
                    formattedPhoneNumber(tableData[i.mappingKey])}
                </Typography>
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </React.Fragment>
  );
};

export default AdminTableRow;
