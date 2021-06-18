import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const ToggleButton = (props) => {
  const {
    isOn,
    textOn,
    iconOn,
    textOff,
    iconOff,
    onPress,
    textStyle,
    cntrStyle,
    isIconOnLeft,
  } = props;

  const onBtnPress = () => {
    onPress(!isOn);
  };

  const renderChildren = (icon, text) => {
    return (
      <View style={styles.container}>
        {isIconOnLeft && icon && icon}
        <Text style={textStyle}>{text}</Text>
        {!isIconOnLeft && icon && icon}
      </View>
    );
  };

  return (
    <TouchableOpacity style={cntrStyle} onPress={onBtnPress}>
      <>
        {!isOn && renderChildren(iconOn, textOn)}
        {isOn && renderChildren(iconOff, textOff)}
      </>
    </TouchableOpacity>
  );
};

export default ToggleButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
