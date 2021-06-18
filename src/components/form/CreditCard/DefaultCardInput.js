import React from "react";
import IconTextInput from "../IconTextInput";
import { typography, withTheme, iconSize } from "@common";

const DefaultCardInput = (props) => {
  const {
    theme,
    style,
    value,
    error,
    iconName,
    iconType,
    maskInput,
    multiline,
    maxLength,
    placeholder,
    keyboardType,
    returnKeyType,
    forwardedRef,

    onBlur,
    onFocus,
    onChange,
    onChangeText,
    onSubmitEditing,
  } = props;

  const inputProps = {
    icon: {
      name: iconName,
      type: iconType,
      size: iconSize.md,
      color: theme.colors.secondaryForegroundAccent,
    },
    input: {
      onBlur,
      onFocus,
      onChange,
      onChangeText,
      onSubmitEditing,

      value,
      error,
      maxLength,
      maskInput,
      multiline,
      placeholder,
      forwardedRef,
      keyboardType,
      returnKeyType,
      errorColor: theme.colors.error,
      placeholderColor: theme.colors.secondaryForeground,
      style: {
        ...typography.body,
        color: theme.colors.secondaryForeground,
      },
    },
    containerStyle: {
      ...style,
    },
  };

  return <IconTextInput {...inputProps} />;
};

export default withTheme(DefaultCardInput);
