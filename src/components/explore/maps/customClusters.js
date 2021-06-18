import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "../../shared/Text";

import { withTheme, fontFamily, fontSize, letterSpacing } from "@common";
const CustomClusters = (props) => {
  const { theme, count } = props;
  const styles = getStyles(theme);
  return (
    <View style={styles.clusterView}>
      <AppText style={styles.number}>{count.pointCount}</AppText>
    </View>
  );
};

export default withTheme(CustomClusters);

const getStyles = (theme) => {
  return StyleSheet.create({
    number: {
      fontWeight: "500",
      fontSize: fontSize.tiny,
      color: theme.colors.white,
      fontFamily: fontFamily.regular,
      letterSpacing: letterSpacing.extra,
    },
    clusterView: {
      width: 30,
      height: 30,
      borderWidth: 2,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      borderColor: theme.colors.white,
      backgroundColor: theme.colors.black,
    },
  });
};
