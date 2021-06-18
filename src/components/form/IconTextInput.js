import React from "react";
import { StyleSheet, View } from "react-native";
import { margins } from "@common";
import Icon from "../shared/Icon";
import TextInput from "./TextInput";

const IconTextInput = (props) => {
  const { containerStyle, icon, input } = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <Icon {...icon} style={[styles.icon, icon?.style]} />
      <TextInput
        {...input}
        containerStyle={styles.inputContainer}
        style={[styles.input, input?.style]}
      />
    </View>
  );
};

export default IconTextInput;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: margins.xs,
    flex: 1,
  },
  input: {},
  inputContainer: {
    flex: 1,
  },
});
