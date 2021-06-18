import React from "react";
import { StyleSheet, Text as RNText } from "react-native";
import { withTheme, typography } from "@common";

const presets = {
  ...typography,
};

const Text = (props) => {
  const { colors } = props.theme;
  const {
    center,
    right,
    style: styleOverride,
    color = colors.text,
    children,
    preset = "body",
    ...rest
  } = props;

  const txtStyle = {
    ...presets[preset],
    color,
    ...styleOverride,
  };

  const settings = [center && styles.center, right && styles.right];

  return (
    <RNText {...rest} allowFontScaling={false} style={[txtStyle, ...settings]}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  center: {
    textAlign: "center",
  },
  right: {
    textAlign: "right",
  },
});

export default withTheme(Text);
