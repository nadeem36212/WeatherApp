import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityLoader } from "./loaderNew";
import { withTheme, radius } from "@common";

const OverlayActivityIndicator = (props) => {
  const { visible, theme } = props;
  const styles = getStyles(theme);
  if (!visible) return null;
  return (
    <View style={styles.overlay}>
      <ActivityLoader
        containerStyle={styles.container}
        fgColor={theme.colors.brand}
      />
    </View>
  );
};

export default withTheme(OverlayActivityIndicator);

const getStyles = (theme) => {
  return StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFill,
      backgroundColor: theme.colors.loaderOverlay,
      zIndex: 100,
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      height: 80,
      width: 80,
      flex: undefined,
      borderRadius: radius.xs,
      backgroundColor: theme.colors.secondaryBackground,
    },
  });
};
