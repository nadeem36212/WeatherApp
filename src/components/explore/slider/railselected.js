import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

const RailSelected = ({ theme }) => {
  return (
    <View
      style={[styles.root, { backgroundColor: theme.colors.reverseText }]}
    />
  );
};

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 4,
    borderRadius: 2,
  },
});
