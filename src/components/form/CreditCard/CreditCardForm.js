import React, { useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import CardCVC from "./CardCVC";
import CardHolder from "./CardHolder";
import CardNumber from "./CardNumber";
import CardExpiry from "./CardExpiry";
import { padding, radius, margins } from "@common";

const CreditCardForm = (props) => {
  const { theme, onFormValidate, onFormInvalidate } = props;

  const [errors, setErrors] = useState({});

  const styles = getStyles(theme);

  let cardHolderRef = useRef(null);
  let cardNumberRef = useRef(null);
  let cardExpiryRef = useRef(null);
  let cardCVCRef = useRef(null);

  const updateHolderRef = (ref) => {
    cardHolderRef = ref;
  };
  const updateNumberRef = (ref) => {
    cardNumberRef = ref;
  };
  const updateExpiryRef = (ref) => {
    cardExpiryRef = ref;
  };
  const updateCVCRef = (ref) => {
    cardCVCRef = ref;
  };

  // following block of code relates to form clear
  // useEffect(() => {
  //   formClear();
  // }, [clearForm, formClear]);
  // const formClear = useCallback(() => {
  //   cardHolderRef?.clear();
  //   cardNumberRef?.clear();
  //   cardExpiryRef?.clear();
  //   cardCVCRef?.clear();
  // }, [cardCVCRef, cardExpiryRef, cardHolderRef, cardNumberRef]);

  const onCardHolderSubmit = () => {
    cardNumberRef.focus();
  };
  const onCardNumberSubmit = () => {
    cardExpiryRef.focus();
  };
  const onCardExpirySubmit = () => {
    cardCVCRef.focus();
  };

  const onCardCVCSubmit = () => {
    // submitForm();
  };

  const submitForm = () => {
    if ((!errors || Object.keys(errors).length === 0) && !fieldsEmpty()) {
      let creditCard = {
        cardHolder: cardHolderRef.value(),
        cardNumber: cardNumberRef.value(),
        cardExpiry: cardExpiryRef.value(),
        cardCVC: cardCVCRef.value(),
      };

      console.log(creditCard);
      // a null value would mean the form is not valid or is empty
      if (typeof onFormValidate === "function") {
        onFormValidate(creditCard);
      }
    } else {
      onFormInvalidate();
    }
  };

  const fieldsEmpty = () => {
    let data = [
      cardHolderRef.value(),
      cardNumberRef.value(),
      cardExpiryRef.value(),
      cardCVCRef.value(),
    ];

    return data.indexOf("") > -1;
  };

  const clearError = (field, ref) => {
    if (ref && ref.isFocused() && ref.isErrored()) {
      delete errors[field];
      setErrors({ ...errors });
    }
  };

  const validate = (field, ref) => {
    if (ref && !ref.isErrored() && !ref.value()) {
      errors[field] = "Should not be empty";
      setErrors({ ...errors });
    }

    submitForm();
  };

  return (
    <View style={styles.container}>
      <CardHolder
        style={styles.mb}
        onFocus={() => {
          clearError("cardHolder", cardHolderRef);
        }}
        onBlur={() => {
          validate("cardHolder", cardHolderRef);
        }}
        forwardedRef={updateHolderRef}
        error={errors.cardHolder}
        onSubmitEditing={onCardHolderSubmit}
      />
      <CardNumber
        style={styles.mb}
        onFocus={() => {
          clearError("cardNumber", cardNumberRef);
        }}
        onBlur={() => {
          validate("cardNumber", cardNumberRef);
        }}
        forwardedRef={updateNumberRef}
        error={errors.cardNumber}
        onSubmitEditing={onCardNumberSubmit}
      />
      <View style={styles.row}>
        <CardExpiry
          onFocus={() => {
            clearError("cardExpiry", cardExpiryRef);
          }}
          onBlur={() => {
            validate("cardExpiry", cardExpiryRef);
          }}
          forwardedRef={updateExpiryRef}
          error={errors.cardExpiry}
          onSubmitEditing={onCardExpirySubmit}
        />
        <CardCVC
          onFocus={() => {
            clearError("cardCVC", cardCVCRef);
          }}
          onBlur={() => {
            validate("cardCVC", cardCVCRef);
          }}
          forwardedRef={updateCVCRef}
          error={errors.cardCVC}
          onSubmitEditing={onCardCVCSubmit}
        />
      </View>
    </View>
  );
};

export default CreditCardForm;

const getStyles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      borderRadius: radius.sm,
      paddingVertical: padding.xsm,
      paddingHorizontal: padding.xs,
      backgroundColor: theme.colors.secondaryBackgroundAccent,
    },
    row: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    mb: {
      marginBottom: margins.sm,
    },
  });
};
