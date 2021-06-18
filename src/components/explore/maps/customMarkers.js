import React from "react";
import { StyleSheet, View } from "react-native";
import { withTheme, fontFamily, fontSize, letterSpacing } from "@common";
import AppText from "../../shared/Text";
const CustomMarkers = (props) => {
  const { theme, item, focusIndex, index } = props;
  const styles = getStyles(theme, focusIndex, index);

  let priceStyle = styles.price;
  if (focusIndex === index)
    priceStyle = { ...styles.price, ...styles.focusPrice };
  else priceStyle = { ...styles.price, ...styles.unFocusPrice };

  return (
    <View
      style={{
        ...styles.markerView,
      }}
    >
      <AppText style={priceStyle}>
        {item.price.currency_symbol}
        {Math.floor(item.price.amount * 100) / 100}
      </AppText>
    </View>
  );
};

export default withTheme(CustomMarkers);

const getStyles = (theme, fidx, idx) => {
  return StyleSheet.create({
    markerView: {
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      borderColor: theme.colors.white,
      borderWidth: 2,
      zIndex: fidx === idx ? 1 : 0,
      backgroundColor: fidx === idx ? theme.colors.brand : theme.colors.purple,
    },
    price: {
      fontFamily: fontFamily.regular,
      fontWeight: "500",
      lineHeight: 18,
      letterSpacing: letterSpacing.extra,
      alignSelf: "center",
      textAlign: "center",
      color: theme.colors.white,
    },
    focusPrice: {
      paddingVertical: 4,
      paddingHorizontal: 11,
      fontSize: fontSize.xsmall,
    },
    unFocusPrice: {
      paddingVertical: 4,
      paddingHorizontal: 8,
      fontSize: fontSize.tiny,
    },
  });
};
