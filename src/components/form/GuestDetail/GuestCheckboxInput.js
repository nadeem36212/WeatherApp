import React from "react";
import CheckboxInput from "../CheckboxInput";
import { margins, iconSize, typography, withTheme } from "@common";

const GuestCheckboxInput = (props) => {
  const { theme, labelTextStyle, containerStyles, is_checked } = props;

  const defaultProps = {
    iconColor: theme.colors.secondaryForeground,
    iconSize: iconSize.md,
    labelTextStyle: {
      ...typography.inputText,
      color: theme.colors.secondaryForeground,
      ...labelTextStyle,
      marginRight: margins.md,
    },
    containerStyle: {
      ...containerStyles,
    },
    ...props,
    isChecked: is_checked,
    theme,
  };
  return <CheckboxInput {...defaultProps} />;
};

export default withTheme(GuestCheckboxInput);
