import React from "react";
import { typography, withTheme } from "@common";
import TextInput from "../TextInput";
import { guestFieldTypes } from "@envs/env.json";

const KEYBOARD_TYPES = {
  text: "default",
  email: "email-address",
  confirmEmail: "email-address",
  tel: "phone-pad",
};

const DefaultGuestInput = (props) => {
  const { type, theme, inputStyles, containerStyles } = props;

  const defaultProps = {
    errorColor: theme.colors.error,
    placeholderColor: theme.colors.secondaryForeground,
    style: {
      ...typography.body,
      color: theme.colors.secondaryForeground,
      ...inputStyles,
    },
    containerStyle: {
      ...containerStyles,
    },
    keyboardType: KEYBOARD_TYPES[type] || "default",
    returnKeyType: type === guestFieldTypes.tel ? "done" : undefined,
  };

  const mergedProps = {
    ...defaultProps,
    ...props,
  };

  return <TextInput {...mergedProps} />;
};

export default withTheme(DefaultGuestInput);
