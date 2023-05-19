import { PALE_YELLOW, TEXT_BLACK, ERROR_RED } from "../../Constants/color";
import {
  FONT_FAMILY_METROPOLIS,
  FONT_FAMILY_INTER,
} from "../../Assests/Styles/commonStyles";
import { commonStyles } from "../../Assests/Styles/commonStyles";

export const styles = {
  mainComponent: {
    zIndex: "1",
  },
  paperComponent: {
    borderRadius: "16px",
    width: "732px",
    margin: "auto 20px",
    ...commonStyles.scrollBar,
  },
  errorStyle: {
    fontFamily: FONT_FAMILY_METROPOLIS,
    fontSize: "14px",
    lineHeight: "14px",
    fontWeight: "500",
    color: ERROR_RED,
    textAlign: "center",
    marginBottom: "20px",
  },
  titleContainer: {
    bgcolor: PALE_YELLOW,
    height: "72px",
    padding: "0 19px 0 46px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  descriptionWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "45px",
    marginLeft: "15px",
    marginRight: "15px",
  },
  titleText: {
    fontSize: "18px",
    fontWeight: "700",
    fontFamily: FONT_FAMILY_METROPOLIS,
    lineHeight: "20px",
    color: TEXT_BLACK,
  },
  crossBtn: {},
  contentContainer: {
    padding: 0,
    textAlign: "center",
    width: "90%",
    margin: "45px auto 0px",
    ...commonStyles.scrollBar,
  },
  actionContainer: {
    padding: 0,
    margin: "36px auto 44px",
    display: "flex",
    flexDirection: "column",
    alignItem: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  commonBtn: {
    width: "171px",
    height: "44px",
    borderRadius: "12px",
    fontFamily: FONT_FAMILY_INTER,
    fontWeight: "600",
    fontSize: "14px",
    boxShadow: "none",
    lineHeight: "20px",
    textTransform: "capitalize",
    "@media screen and (max-width:475px)": {
      width: "140px",
    },
  },
  boxLoaderContainer: {
    height: "150px",
    display: "flex",
    alignItems: "center",
  },
  descriptionText: {
    fontFamily: FONT_FAMILY_METROPOLIS,
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "18px",
    lineHeight: "20px",
    color: TEXT_BLACK,
  },
  cancelBtn: {
    marginRight: "26px",
    "@media(max-width:600px)": {
      marginRight: "10px",
    },
  },
  submitBtn: {
    fontWeight: "bold",
  },
};
