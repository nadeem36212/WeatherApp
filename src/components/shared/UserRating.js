import React from "react";
import AppText from "./Text";
import { StyleSheet, View } from "react-native";
import { padding, radius, withTheme } from "@common";

const UserRating = (props) => {
  const {
    theme,
    rating,
    reviews,
    style: styleOverride,
    preset = "bodyBold",
    textStyle,
  } = props;
  if (!rating || parseFloat(rating) <= 0) return null;

  return (
    <View style={{ ...styles.mainContainer, ...styleOverride }}>
      <View
        style={{
          ...styles.container,
          backgroundColor: theme.colors.ratingBackground,
        }}
      >
        <AppText
          preset={preset}
          color={theme.colors.primaryForeground}
          style={textStyle}
        >
          {parseFloat(rating, 10).toFixed(1)}
        </AppText>
      </View>
      {reviews && (
        <View style={{ paddingLeft: padding.xs }}>
          <AppText preset="bodyProminent">Great</AppText>
          <AppText preset="smallTextRatings" color={theme.colors.ratings}>
            {reviews} ratings
          </AppText>
        </View>
      )}
    </View>
  );
};

export default withTheme(UserRating);

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
  },
  container: {
    height: 38,
    width: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.smx,
  },
});
