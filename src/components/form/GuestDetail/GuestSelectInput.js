import React from "react";
import ModalListSelect from "../ModalListSelect";
import localize from "@common/language/localizeController";
import { withTheme } from "@common";

const GuestSelectInput = (props) => {
  const { theme, value, containerStyle } = props;

  const defaultProps = {
    ...props,
    defaultValue: value,
    errorColor: theme.colors.error,
    placeholderColor: theme.colors.secondaryForeground,
    searchPlaceholder: localize.SEARCH,
    cancelText: localize.CANCEL,
    emptyListText: localize.EMPTYLIST,
    labelContainerStyle: containerStyle,
    optionItemTextStyle: {
      color: theme.colors.primaryForeground,
    },
  };
  return <ModalListSelect {...defaultProps} />;
};

export default withTheme(GuestSelectInput);
