import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { withTheme, padding, radius } from "@common";
import { AppText, ActivityLoader } from "..";
import { iconSize } from "../../common";

const SmallButton = (props) => {
  const { theme, title, style, onPress, isLoading } = props;
  const { colors } = theme;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.button,
        backgroundColor: colors.smButtonBg,
        ...style,
      }}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityLoader
          containerStyle={styles.loader}
          size={iconSize.md}
          fgColor={colors.stickyButtonPrimaryForeground}
        />
      ) : (
        <AppText
          preset="roomBody"
          style={styles.upperCase}
          color={colors.stickyButtonPrimaryForeground}
        >
          {title}
        </AppText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.def,
    paddingVertical: padding.xxs,
    paddingHorizontal: padding.xsm,
  },
  loader: {
    // paddingVertical: -6,
    paddingHorizontal: padding.md,
    // height: 17,
    // width: 69,
    // flex: 0,
  },
  upperCase: {
    textTransform: "uppercase",
  },
});

export default withTheme(SmallButton);
