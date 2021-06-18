import React, { memo } from "react";
import { View, StyleSheet } from "react-native";

const Rail = ({ theme }) => {
  return (
    <View style={[styles.root, { backgroundColor: theme.colors.sliderRail }]} />
  );
};

export default memo(Rail);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
});
