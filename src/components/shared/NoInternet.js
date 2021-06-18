import React from "react";
import { StyleSheet, View } from "react-native";
import { withTheme, normalizeX, normalizeY, SCREEN_WIDTH } from "@common";
import { AppText, Icon } from "@components";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";

const NoInternet = (props) => {
  const { isInternetConnected } = useSelector((state) => state.config);
  const { colors } = props.theme;

  return isInternetConnected ? null : (
    <View style={styles.container}>
      <View style={[styles.dialog, { backgroundColor: colors.colorblack }]}>
        <MaterialIcon size={35} name={"wifi-off"} color={colors.plusWhite} />
        <AppText center light style={{ marginTop: 10 }}>
          Seems like you are travelling into space because you are not connected
          to the internet
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(120, 120, 120, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    width: SCREEN_WIDTH / 1.25,
    height: normalizeY(150),
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: normalizeX(20),
  },
});

export default withTheme(NoInternet);
