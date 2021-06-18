import React, { useState } from "react";
import DefaultCardInput from "./DefaultCardInput";
import moment from "moment";

const CardExpiry = (props) => {
  const [error, setError] = useState(null);

  const maskInput = (text) => {
    const regex = /^(\d{0,2})(\d{0,2})$/g;
    const onlyNumbers = text.replace(/[^\d]/g, "");

    // max credit card digits can go upto 19 + 4 white spaces = 23
    let formatedText = onlyNumbers.replace(regex, (_regex, $1, $2) =>
      [$1, $2].filter((group) => !!group).join(" / "),
    );

    return validate(formatedText);
  };

  const validate = (text) => {
    let min = moment().add(1, "M");
    let max = moment().add(10, "Y");

    if (text.length >= 7) {
      let curr = moment(text, "MM / YY");

      if (curr.isAfter(min) && curr.isBefore(max)) {
        setError("");
        return text;
      } else {
        setError("Invalid date");
        return text;
      }
    }

    return text;
  };

  return (
    <DefaultCardInput
      iconName="Dates"
      iconType="local"
      maskInput={maskInput}
      placeholder="Expiry date"
      keyboardType="number-pad"
      returnKeyType="done"
      maxLength={7}
      {...props}
      error={error || props.error}
    />
  );
};

export default CardExpiry;
