import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Box,
} from "@mui/material";

import CrossIcon from "../../Assests/img/add.svg";
import CustomButton from "../Widgets/CustomButton/CustomButton";
import CustomLoader from "../Widgets/CustomLoader/CustomLoader";
import { buttonTypes } from "../../Constants/constant";
import { styles } from "./DialogBoxStyles";

const DialogBox = (props) => {
  const {
    open,
    closeHandler,
    cancelBtnText,
    submitBtnText,
    customContentStyle,
    titleText,
    showCancelBtn,
    showSubmitBtn,
    cancelBtnHandler,
    submitBtnHandler,
    customSubmitButtonStyle,
    customStyles,
    description,
    isChildrenLoading,
    isSubmitLoading,
    errorMessage,
    dialogSize,
    customActionStyle,
    contentContainerId,
    descriptionWrapperStyle,
    customMainComponentStyle,
  } = props;

  const paperStyle = { sx: { ...styles.paperComponent, ...customStyles } };

  return (
    <Dialog
      sx={{ ...styles.mainComponent, ...customMainComponentStyle }}
      maxWidth={dialogSize ? dialogSize : "xl"}
      PaperProps={paperStyle}
      open={open}
      onClose={closeHandler}
    >
      <DialogTitle sx={styles.titleContainer}>
        <Typography sx={styles.titleText}>{titleText}</Typography>
        <IconButton sx={styles.crossBtn} onClick={closeHandler}>
          <Typography component="img" src={CrossIcon} />
        </IconButton>
      </DialogTitle>
      {description && (
        <Box
          sx={{
            ...styles.descriptionWrapper,
            ...descriptionWrapperStyle,
          }}
        >
          <Typography sx={styles.descriptionText}>{description}</Typography>
        </Box>
      )}
      {props.children &&
        (isChildrenLoading ? (
          <Box sx={styles.boxLoaderContainer}>
            <CustomLoader />
          </Box>
        ) : (
          <DialogContent
            sx={{ ...styles.contentContainer, ...customContentStyle }}
            id={contentContainerId}
          >
            {props.children}
          </DialogContent>
        ))}
      <DialogActions sx={{ ...styles.actionContainer, ...customActionStyle }}>
        {errorMessage && (
          <Typography sx={styles.errorStyle}>{errorMessage}</Typography>
        )}
        <Box display="flex" alignItem="center">
          {showCancelBtn && (
            <CustomButton
              onClick={cancelBtnHandler}
              type={buttonTypes.secondary}
              showFocusRippling
              customStyles={{ ...styles.commonBtn, ...styles.cancelBtn }}
              disabled={isSubmitLoading}
            >
              {cancelBtnText || "cancel"}
            </CustomButton>
          )}
          {showSubmitBtn &&
            (isSubmitLoading ? (
              <CustomLoader />
            ) : (
              <CustomButton
                type={buttonTypes.primary}
                onClick={submitBtnHandler}
                showFocusRippling
                customStyles={{
                  ...styles.commonBtn,
                  ...styles.cancelBtn,
                  ...customSubmitButtonStyle,
                }}
              >
                {submitBtnText || "yes"}
              </CustomButton>
            ))}
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;
