import React from "react";
import DefaultCardInput from "./DefaultCardInput";

const CardNumber = (props) => {
  const maskInput = (text) => {
    const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,3})$/g;
    const onlyNumbers = text.replace(/[^\d]/g, "");

    // max credit card digits can go upto 19 + 4 white spaces = 23
    return onlyNumbers.replace(regex, (_regex, $1, $2, $3, $4, $5) =>
      [$1, $2, $3, $4, $5].filter((group) => !!group).join(" "),
    );
  };

  return (
    <DefaultCardInput
      iconName="CreditCard"
      iconType="local"
      placeholder="Card number"
      keyboardType="number-pad"
      returnKeyType="done"
      maxLength={23}
      maskInput={maskInput}
      {...props}
    />
  );
};

export default CardNumber;
