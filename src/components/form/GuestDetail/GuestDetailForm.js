import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { padding, radius, margins, isValidEmail } from "@common";
import DefaultGuestInput from "./DefaultGuestInput";
import GuestSelectInput from "./GuestSelectInput";
import GuestCheckboxInput from "./GuestCheckboxInput";
import { guestFieldTypes } from "@envs/env.json";

const GuestDetailForm = (props) => {
  const { theme, fields, onValidate, onInvalidate } = props;
  const [error, setError] = useState({});
  const [formFields, setFormFields] = useState(fields);
  const arefs = useRef({});

  useEffect(() => {
    let emailIdx = formFields.findIndex(
      (v) => v.type === guestFieldTypes.email,
    );

    let cEmailIdx = formFields.findIndex(
      (v) => v.type === guestFieldTypes.confirmEmail,
    );

    if (emailIdx > -1 && cEmailIdx < 0) {
      let confirmField = {
        ...formFields[emailIdx],
        type: guestFieldTypes.confirmEmail,
        name: "confirmEmail",
        placeholder: "Confirm Email",
      };

      if (emailIdx + 1 >= formFields.length) {
        formFields.push(confirmField);
      } else {
        formFields.splice(emailIdx + 1, 0, confirmField);
      }

      setFormFields([...formFields]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields]);

  const addError = (idx, err) => {
    error["" + idx] = err;
    setError({ ...error });
  };

  const removeError = (idx) => {
    if (error.hasOwnProperty(idx)) {
      delete error["" + idx];
      setError({ ...error });
    }
  };

  const onFocus = (idx) => {
    removeError(idx);
  };

  const onBlur = (idx) => {
    validateField(idx);
    validateForm();
  };

  const switchFocus = (idx) => {
    arefs.current["" + idx]?.focus();
  };

  const onSubmitEditing = (idx, val) => {
    if (idx + 1 < formFields.length) {
      switchFocus(idx + 1);
    }

    validateForm();
  };

  const validateField = (idx) => {
    let { type, is_required } = formFields[idx];
    let value = arefs.current[idx].value();

    if (is_required && value === "") {
      addError(idx, "This is a required field");
    } else if (
      value &&
      value !== "" &&
      type === guestFieldTypes.email &&
      !isValidEmail(value)
    ) {
      addError(idx, "Invalid email address");
    } else if (value && value !== "" && type === guestFieldTypes.confirmEmail) {
      let emailIdx = formFields.findIndex(
        (v) => v.type === guestFieldTypes.email,
      );
      if (emailIdx > -1) {
        let email = arefs.current[emailIdx].value();

        if (email !== value) {
          addError(idx, "Emails don't match");
        }
      }
    }
  };

  const validateForm = () => {
    let formData = {};
    let reqCount = 0;
    for (let idx in arefs.current) {
      let fInput = arefs.current[idx];
      let field = formFields[idx];

      // TODO: remove when backend has fixed the checkbox array or array issue
      if (Array.isArray(field) && field.length > 0) field = field[0];

      // TODO: calculate the actual required fields,
      // in case of checkbox the input could just be one
      // but the options could be alot
      if (field.is_required) reqCount++;

      if (field.type === guestFieldTypes.checkbox && fInput.isChecked) {
        if (Array.isArray(formData[field.name])) {
          formData[field.name] = [...formData[field.name], field.value];
        } else {
          formData[field.name] = [field.value];
        }
      } else if (
        field.type !== guestFieldTypes.checkbox &&
        fInput.value() &&
        fInput.value() !== ""
      ) {
        formData[field.name] = fInput.value();
      }
    }
    // console.log(formData, reqCount);

    // if there are no error
    // and required fields are all filled
    // and onValidate is a function
    if (
      Object.keys(formData).length > 0 &&
      Object.keys(error).length === 0 &&
      reqCount <= Object.keys(formData).length &&
      typeof onValidate === "function"
    ) {
      onValidate(formData);
    } else if (typeof onInvalidate === "function") {
      onInvalidate();
    }
  };

  const renderInput = (field, idx) => {
    if (Array.isArray(field) && field.length > 0) {
      field = field[0];
    }
    switch (field.type) {
      case guestFieldTypes.dropdown:
        return (
          <GuestSelectInput
            {...field}
            key={field.name + idx}
            forwardedRef={(ref) => (arefs.current[idx] = ref)}
            containerStyles={idx > 0 ? styles.mt : {}}
            onSubmitEditing={(val) => {
              onSubmitEditing(idx, val);
            }}
          />
        );
      case guestFieldTypes.checkbox:
        return (
          <GuestCheckboxInput
            {...field}
            key={field.name + idx}
            forwardedRef={(ref) => (arefs.current[idx] = ref)}
            containerStyles={idx > 0 ? styles.mt : {}}
            onChange={(checked) => {
              validateForm();
            }}
          />
        );
      default:
        return (
          <DefaultGuestInput
            {...field}
            error={error[idx]}
            key={field.name + idx}
            onBlur={() => onBlur(idx)}
            onFocus={() => onFocus(idx)}
            containerStyles={idx > 0 ? styles.mt : {}}
            forwardedRef={(ref) => (arefs.current[idx] = ref)}
            onSubmitEditing={(val) => {
              onSubmitEditing(idx, val);
            }}
          />
        );
    }
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.secondaryBackgroundAccent,
      }}
    >
      {formFields.map((field, idx) => renderInput(field, idx))}
    </View>
  );
};

export default GuestDetailForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: radius.sm,
    paddingVertical: padding.xsm,
    paddingHorizontal: padding.sm,
  },
  mt: {
    marginTop: margins.sm,
  },
  mb: {
    marginBottom: margins.xxl,
  },
});
