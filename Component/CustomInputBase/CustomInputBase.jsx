import React from "react";
import {
  InputBase,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import SearchIcon from "../../../Assests/img/search.svg";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import { styles } from "./CustomInputBaseStyles";

const CustomInputBase = (props) => {
  const {
    placeholder,
    value,
    setValue,
    type,
    onClick,
    onChange,
    onKeyPress,
    isRequire,
    showStartIcon,
    startIcon,
    showPasswordVisiblityOffIcon,
    showPasswordVisiblityOnIcon,
    showCheckIcon,
    iconFunction,
    maxLength,
    validationCheckIconOne,
    validationCheckIconTwo,
    customInputStyle,
    onBlur,
    onFocus,
    name,
    onStartIconClick,
    singleBorderInput,
    isError,
    showSearchIcon,
    showClearIcon,
    clearIconHandler,
    multiline,
    rows,
    isDisable,
    onSearchClick,
    inputRef,
    onInputFunction,
    endIcon,
    showEndIcon,
    readOnly = false,
  } = props;

  const changeHandler = (e) => {
    setValue && setValue(e.target.value);
  };

  const iconFunctionHandler = () => {
    iconFunction((prev) => !prev);
  };

  return (
    <React.Fragment>
      <InputBase
        inputRef={inputRef}
        inputProps={{ maxLength, readOnly }}
        placeholder={placeholder}
        type={type || "text"}
        name={name || ""}
        value={value}
        sx={{
          ...styles.inputBase,
          ...customInputStyle,
          ...(singleBorderInput && styles.singleBorderStyle),
          ...(isError && styles.errorStyle),
        }}
        multiline={multiline}
        rows={rows}
        onChange={onChange ? (event) => onChange(event) : changeHandler}
        onFocus={(e) => onFocus && onFocus(e)}
        autoComplete="off"
        required={isRequire}
        disabled={isDisable}
        onBlur={(e) => onBlur && onBlur(e)}
        onClick={onClick ? onClick : () => {}}
        onKeyPress={onKeyPress ? (event) => onKeyPress(event) : () => {}}
        onInput={onInputFunction}
        startAdornment={
          showStartIcon && (
            <InputAdornment
              position="start"
              onClick={() => onStartIconClick && onStartIconClick()}
            >
              {showStartIcon && <IconButton>{startIcon}</IconButton>}
            </InputAdornment>
          )
        }
        endAdornment={
          <InputAdornment position="end">
            {showPasswordVisiblityOffIcon && (
              <IconButton
                aria-label="toggle password visibility off"
                onClick={iconFunctionHandler}
              >
                <VisibilityOffOutlinedIcon sx={styles.passwordVisibilityIcon} />
              </IconButton>
            )}
            {showPasswordVisiblityOnIcon && (
              <IconButton
                aria-label="toggle password visibility on"
                onClick={iconFunctionHandler}
              >
                <VisibilityOutlinedIcon sx={styles.passwordVisibilityIcon} />
              </IconButton>
            )}
            {showSearchIcon && (
              <Typography
                component="img"
                src={SearchIcon}
                sx={styles.searchIcon}
                onClick={onSearchClick}
              />
            )}
            {showClearIcon && (
              <IconButton onClick={clearIconHandler} sx={{ padding: "0px" }}>
                <ClearIcon
                  sx={{
                    ...(isError && styles.errorIcon),
                    ...styles.clearIconStyles,
                  }}
                />
              </IconButton>
            )}
            {showCheckIcon && (
              <CheckIcon
                sx={{
                  ...(validationCheckIconOne
                    ? styles.checkEndIcon
                    : validationCheckIconTwo
                    ? styles.greenIcon
                    : styles.redIcon),
                }}
              />
            )}
            {showEndIcon && endIcon}
          </InputAdornment>
        }
      />
    </React.Fragment>
  );
};

export default CustomInputBase;
