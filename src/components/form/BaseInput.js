import React from "react";
import { TextField } from "react-native-material-textfield";

const BaseInput = (props) => {
  const { maskInput, forwardedRef } = props;

  return (
    <TextField
      ref={forwardedRef}
      lineWidth={0}
      activeLineWidth={0}
      autoCorrect={false}
      formatText={maskInput}
      enablesReturnKeyAutomatically={true}
      contentInset={{ top: -10, label: 0, input: 0 }}
      {...props}
    />
  );
};

export default BaseInput;
