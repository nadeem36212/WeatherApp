import React from "react";
import { margins, radius, typography } from "@common";
import { StyleSheet, View } from "react-native";
import AppText from "./Text";

const AlertView = (props) => {
  let { bgColor, fgColor, containerStyle, type, textStyle, msg } = props;

  let ctnStyle = { ...styles.container, ...containerStyle };

  if (bgColor) {
    ctnStyle.backgroundColor = bgColor;
  } else if (type === "error") {
    ctnStyle.backgroundColor = "red";
  } else if (type === "success") {
    ctnStyle.backgroundColor = "green";
  }

  return (
    <View style={ctnStyle}>
      <AppText style={{ ...styles.text, color: fgColor, ...textStyle }}>
        {msg}
      </AppText>
    </View>
  );
};

export default AlertView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: margins.md,
    borderRadius: radius.md,
  },
  text: {
    ...typography.body,
    alignSelf: "center",
    marginVertical: margins.xs,
  },
});
