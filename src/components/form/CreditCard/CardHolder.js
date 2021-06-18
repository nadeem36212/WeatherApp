import React from "react";
import DefaultCardInput from "./DefaultCardInput";

const CardHolder = (props) => {
  return (
    <DefaultCardInput
      iconName="Person"
      iconType="local"
      placeholder="Cardholder name"
      {...props}
    />
  );
};

export default CardHolder;
