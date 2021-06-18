import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { iconSize, margins } from "@common";
import AppText from "./Text";
import Icon from "./Icon";

const IconText = (props) => {
  const {
    icon,
    text,
    onPress,
    iconSize: sizeIcon,
    iconColor,
    textColor,
    textStyle,
    iconStyle,
    textPreset,
    containerStyle,
    withoutFeedback = false,
  } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.container, ...containerStyle }}
      activeOpacity={withoutFeedback ? 1 : 0.2}
    >
      <Icon
        name={icon}
        type="local"
        color={iconColor}
        size={sizeIcon || iconSize.md}
        style={{ ...styles.iconStyle, ...iconStyle }}
      />
      <AppText color={textColor} style={textStyle} preset={textPreset}>
        {text}
      </AppText>
    </TouchableOpacity>
  );
};

export default IconText;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconStyle: {
    marginRight: margins.xs,
  },
});
