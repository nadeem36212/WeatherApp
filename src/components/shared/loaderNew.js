import React from "react";

import { View, ActivityIndicator } from "react-native";

export const ActivityLoader = (props) => {
  const { bgColor, fgColor, size, containerStyle } = props;
  return (
    <View
      style={{
        backgroundColor: bgColor,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        ...containerStyle,
      }}
    >
      <ActivityIndicator size={size || "small"} color={fgColor} />
    </View>
  );
};
