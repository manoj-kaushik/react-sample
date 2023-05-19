import React, { useState } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import { Box, Grid } from "@mui/material";

import DialogBox from "../../Component/DialogBox/DialogBox";
import CustomModalInput from "../Widgets/CustomModalInput/CustomModalInput";
import { addData } from "../../Services/addDataService";
import {
  checkValidEmail,
  checkValidLengthOfString,
  checkValidPhoneNumber,
  updateKeyInState,
} from "../../Services/helperService";
import { SOMETHING_WENT_WRONG } from "../../Constants/errorMessage";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

const TableActionModal = (props) => {
  const { showModal, toggleModal } = props;
  const [apiCallDetail, setApiCallDetail] = useState({
    isApiCallLoading: false,
    apicallErrorMessage: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [tableFormData, setTableFormData] = useState(initialFormData);

  const validateFormDetail = () => {
    let isFormValid = true;
    if (
      checkValidLengthOfString(
        tableFormData?.firstName,
        2,
        30,
        true,
        "firstName"
      ) ||
      checkValidLengthOfString(tableFormData?.lastName, 2, 30, true, "lastName") ||
      checkValidPhoneNumber(tableFormData.phoneNumber, true, "phoneNumber") ||
      checkValidEmail(tableFormData?.email, true, "email")
    ) {
      isFormValid = false;
    }
    return isFormValid;
  };

  const handleChangeWasherDetail = (event) => {
    let { name, value } = event.target;
    updateKeyInState(name, value, setTableFormData);
  };

  const getFormDetails = () => {
    return {
      firstName: tableFormData.firstName,
      lastName: tableFormData.lastName,
      email: tableFormData.email,
    };
  };

  const submitBtnHandler = async () => {
    !isFormSubmitted && setIsFormSubmitted(true);
    if (validateFormDetail()) {
      updateKeyInState("isApiCallLoading", true, setApiCallDetail);
      const response = await addData(getFormDetails());
      if (!response.error) {
        toast.success(response.data?.data?.message);
        toggleModal && toggleModal();
      } else {
        const errorCode = response.error?.data?.code;
        toast.error(
          ["MOBILE_EXIST", "EMAIL_EXISTS"].includes(errorCode)
            ? response.error?.data?.message
            : SOMETHING_WENT_WRONG
        );
      }
      updateKeyInState("isApiCallLoading", false, setApiCallDetail);
    }
  };

  return (
    <DialogBox
      open={showModal}
      toggleModal={toggleModal}
      closeHandler={toggleModal}
      titleText="Add detail"
      showSubmitBtn
      submitBtnText="submit"
      submitBtnHandler={submitBtnHandler}
      isSubmitLoading={apiCallDetail?.isApiCallLoading}
      errorMessage={apiCallDetail?.apicallErrorMessage}
    >
      <Box>
        <Grid container spacing={2}>
          <Grid xs={6} item>
            <CustomModalInput
              labelName="First Name"
              value={tableFormData?.firstName}
              name="firstName"
              maxLength={30}
              isLableRequire
              onChangeHandler={handleChangeWasherDetail}
              errorMessage={
                isFormSubmitted &&
                checkValidLengthOfString(tableFormData?.firstName, 2, 30)
              }
            />
          </Grid>
          <Grid xs={6} item>
            <CustomModalInput
              labelName="Last Name"
              value={tableFormData?.lastName}
              name="lastName"
              maxLength={30}
              isLableRequire
              onChangeHandler={handleChangeWasherDetail}
              errorMessage={
                isFormSubmitted &&
                checkValidLengthOfString(tableFormData?.lastName, 2, 30)
              }
            />
          </Grid>
          <Grid xs={6} item>
            <CustomModalInput
              labelName="Email"
              value={tableFormData?.email}
              name="email"
              isLableRequire
              onChangeHandler={handleChangeWasherDetail}
              errorMessage={
                isFormSubmitted && checkValidEmail(tableFormData?.email)
              }
            />
          </Grid>
        </Grid>
      </Box>
    </DialogBox>
  );
};

export default TableActionModal;
