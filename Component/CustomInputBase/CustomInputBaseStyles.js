import {
  BORDER_GREY,
  PASSWORD_MATCHED,
  TEXT_BLACK,
  PLACEHOLDER_GREY,
  ICON_RED,
  DISABLED_BACKGROUND,
} from "../../../Constants/color";
import {
  FONT_FAMILY_METROPOLIS,
  FONT_FAMILY_INTER,
} from "../../../Assests/Styles/commonStyles";

export const styles = {
  inputBase: {
    border: `1px solid ${BORDER_GREY}`,
    boxSizing: "border-box",
    borderRadius: "5px",
    height: "2.5rem",
    width: "100%",
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
    ".MuiInputBase-input": {
      fontFamily: FONT_FAMILY_METROPOLIS,
      color: TEXT_BLACK,
      fontSize: "16px",
      fontWeight: "500",
      lineHeight: "16px",
      "&::placeholder": {
        fontFamily: FONT_FAMILY_INTER,
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "24px",
        color: PLACEHOLDER_GREY,
      },
    },
    "&.Mui-disabled": {
      backgroundColor: DISABLED_BACKGROUND,
      fontSize: "14px",
      lineHeight: "14px",
      fontWeight: "400",
      color: TEXT_BLACK,
    },
    "@media (max-width : 600px)": {
      width: "100%",
    },
  },
  searchIcon: {
    cursor: "pointer",
  },
  errorStyle: {
    borderColor: ICON_RED,
  },
  singleBorderStyle: {
    border: "none",
    borderBottom: `1px solid ${BORDER_GREY}`,
    borderRadius: "0px",
  },
  passwordVisibilityIcon: {
    color: BORDER_GREY,
    "&:hover": {
      backgroundColor: "transparent",
    },
    width: "21px",
    height: "21px",
  },
  checkEndIcon: {
    padding: "8px",
  },
  greenIcon: {
    fill: PASSWORD_MATCHED,
    padding: "8px",
  },
  redIcon: {
    fill: ICON_RED,
    padding: "8px",
  },
  clearIconStyles: {
    height: "15px",
    width: "15px",
  },
  errorIcon: {
    fill: ICON_RED,
  },
};
