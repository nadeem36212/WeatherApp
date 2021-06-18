import React, { useState } from "react";
import { StyleSheet, View, Modal } from "react-native";
import { WebView as RNWebView } from "react-native-webview";
import { ActivityLoader } from "./loaderNew";
import { margins, radius } from "@common";

const WebView = (props) => {
  let { url, onRedirect, theme, visible } = props;
  const [isLoading, setIsLoading] = useState(true);

  const handleNavigationChange = (state) => {
    const { url: _url } = state;
    console.log(state);
    // redirect catch
    if (_url.includes("cuddlynest.com")) {
      onRedirect();
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View
        style={{
          ...styles.overlay,
          backgroundColor: theme.colors.overlayColor,
        }}
      />
      <View
        style={{
          ...styles.container,
          backgroundColor: theme.colors.white,
        }}
      >
        {isLoading && (
          <ActivityLoader
            containerStyle={styles.loader}
            size={"large"}
            bgColor={theme.colors.white}
            fgColor={theme.colors.blackColor}
          />
        )}
        <RNWebView
          source={{ uri: url }}
          onNavigationStateChange={handleNavigationChange}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
        />
      </View>
    </Modal>
  );
};

export default WebView;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    opacity: 0.4,
  },
  container: {
    flex: 1,
    overflow: "hidden",
    margin: margins.xl,
    borderRadius: radius.sm,
    marginTop: margins.header,
  },
  loader: {
    height: 200,
    width: "100%",
    alignItems: "center",
    // borderRadius: radius.sm,
    justifyContent: "center",
  },
});
