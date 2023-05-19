import React from "react";
import { Box } from "@mui/material";

import Label from "../Label/Label";
import CustomInputBase from "../CustomInputBase/CustomInputBase";
import CustomErrorMessage from "../CustomErrorMessage/CustomErrorMessage";
import { styles } from "./CustomModalInputStyle";

const CustomModalInput = (props) => {
  const {
    name,
    type,
    labelName,
    customStyle,
    value,
    setValue,
    onChangeHandler,
    isInputRequire,
    isLableRequire,
    maxLength,
    placeholder,
    errorMessage,
    multiline,
    rows,
    isDisable,
    customBoxStyle,
    customlabelStyle,
    hideErrorContainer,
  } = props;

  return (
    <Box sx={{ ...customBoxStyle }}>
      {labelName && (
        <Label
          labelInputProp={{ ...styles.lableStyle, ...customlabelStyle }}
          isRequire={isLableRequire}
        >
          {labelName}
        </Label>
      )}
      <CustomInputBase
        name={name}
        type={type || "text"}
        customInputStyle={{ ...styles.inputStyle, ...customStyle }}
        value={value}
        setValue={setValue}
        isRequire={isInputRequire}
        maxLength={maxLength}
        onChange={onChangeHandler}
        placeholder={placeholder}
        multiline={multiline}
        rows={rows}
        isDisable={isDisable}
      />
      {!hideErrorContainer && (
        <Box sx={styles.errorContainer}>
          {errorMessage && <CustomErrorMessage errorMessage={errorMessage} />}
        </Box>
      )}
    </Box>
  );
};

export default CustomModalInput;
