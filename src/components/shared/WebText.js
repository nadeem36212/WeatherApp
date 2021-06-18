import React from "react";
import { WebView as RNWebView } from "react-native-webview";

const WebText = (props) => {
  return (
    <RNWebView originWhitelist={["*"]} source={{ html: props.children }} />
  );
};

export default WebText;
