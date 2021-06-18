import React from "react";
import DefaultCardInput from "./DefaultCardInput";

const CardCVC = (props) => {
  return (
    <DefaultCardInput
      iconName="CVC"
      iconType="local"
      placeholder="CVC/CVV"
      keyboardType="number-pad"
      returnKeyType="done"
      maxLength={4}
      {...props}
    />
  );
};

export default CardCVC;
