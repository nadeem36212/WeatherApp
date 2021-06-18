import React from "react";

import { View, StyleSheet, TouchableOpacity } from "react-native";
import { margins, radius, iconSize as IconSize } from "@common";
import AppText from "../shared/Text";
import Icon from "../shared/Icon";

export const HeaderTitle = (props) => {
  const { title, titleColor, titleCntr, titleStyle } = props;
  return (
    <View style={titleCntr}>
      <AppText
        preset="bodyBold"
        style={{ ...styles.headerTitle, color: titleColor, ...titleStyle }}
      >
        {title}
      </AppText>
    </View>
  );
};

export const HeaderItem = (props) => {
  const {
    pos,
    icon,
    bgColor,
    onPress,
    iconColor,
    containerStyle,
    iconSize = IconSize.sm,
  } = props;
  const ctnStyle = pos === "left" ? styles.headerLeft : styles.headerRight;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...ctnStyle, backgroundColor: bgColor, ...containerStyle }}
      hitSlop={{ top: 20, bottom: 20, left: 50, right: 20 }}
    >
      <Icon name={icon} type="local" size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

export const HeaderLeft = (props) => {
  return <HeaderItem pos={"left"} {...props} />;
};

export const HeaderRight = (props) => {
  return <HeaderItem pos={"right"} {...props} />;
};

const styles = StyleSheet.create({
  headerTitle: {},
  headerLeft: {
    marginLeft: margins.md,
    borderRadius: radius.xsm,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  headerRight: {
    marginRight: margins.md,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.xsm,
    zIndex: 1000,
  },
});
