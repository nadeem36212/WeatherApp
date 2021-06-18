import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { margins } from "@common";
import Icon from "../shared/Icon";

const CheckboxInput = (props) => {
  const {
    theme,
    label,
    iconSize,
    iconColor,
    iconStyle,
    iconOnRight,
    labelTextStyle,
    containerStyle,
    forwardedRef,
    isChecked,
    onChange,
  } = props;

  const [checked, setChecked] = useState(isChecked || false);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const onPress = () => {
    if (typeof forwardedRef === "function") {
      forwardedRef({ isChecked: !checked });
    }
    setChecked(!checked);
    onChange(!checked);
  };

  const renderIcon = (iStyles) => {
    return (
      <Icon
        type="local"
        name={
          checked
            ? theme.dark
              ? "CheckmarkDark"
              : "CheckmarkLight"
            : "UnSelCheckBox"
        }
        color={iconColor}
        size={iconSize}
        style={{ ...iStyles, ...iconStyle }}
      />
    );
  };

  const renderLabel = () => {
    return <Text style={labelTextStyle}>{label}</Text>;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.container, ...containerStyle }}
    >
      {!iconOnRight && renderIcon(styles.mr)}
      {renderLabel()}
      {iconOnRight && renderIcon(styles.ml)}
    </TouchableOpacity>
  );
};

export default CheckboxInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  mr: {
    marginRight: margins.sm,
  },
  ml: {
    marginLeft: margins.sm,
  },
});
