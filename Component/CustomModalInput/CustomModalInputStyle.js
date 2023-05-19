import {
  MODAL_INPUT_BORDER,
  MODAL_INPUT_LABEL,
} from "../../../Constants/color";
import { FONT_FAMILY_METROPOLIS } from "../../../Assests/Styles/commonStyles";
import { commonStyles } from "../../../Assests/Styles/commonStyles";

export const styles = {
  lableStyle: {
    fontFamily: FONT_FAMILY_METROPOLIS,
    fontSize: "12px",
    lineHeight: "12px",
    fontWeight: "400",
    color: MODAL_INPUT_LABEL,
    textTransform: "lowercase",
    "&::first-letter": {
      textTransform: "capitalize",
    },
  },
  inputStyle: {
    borderRadius: "10px",
    border: `1px solid ${MODAL_INPUT_BORDER}`,
    ".MuiInputBase-input": {
      ...commonStyles.scrollBar,
      "&::placeholder": {
        fontSize: "12px",
        lineHeight: "12px",
        color: MODAL_INPUT_LABEL,
      },
    },
  },
  errorContainer: {
    marginTop: "10px",
    height: "13px",
  },
};
