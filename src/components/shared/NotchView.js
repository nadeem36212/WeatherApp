import React from "react";
import { StyleSheet, Animated } from "react-native";
import { hasNotch } from "react-native-device-info";
import { isIOS } from "../../common/constants";
import { withTheme } from "@common";

const NotchView = (props) => {
  const { colors } = props.theme;
  const { color = colors.background, opacity } = props;

  return isIOS ? (
    <Animated.View
      style={[styles.notchView, { backgroundColor: color, opacity: opacity }]}
    />
  ) : null;
};

const styles = StyleSheet.create({
  notchView: {
    width: "100%",
    height: hasNotch() ? 33 : 20,
  },
});

export default withTheme(NotchView);
