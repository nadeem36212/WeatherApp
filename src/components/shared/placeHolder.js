import React from "react";
import { fontFamily, fontSize, withTheme } from "@common";
import { Dimensions, View, Text } from "react-native";
import localize from "@common/language/localizeController";

const { height } = Dimensions.get("window");
const PlaceHolder = (props) => {
  const { theme } = props;
  return (
    <View
      style={{
        height: height / 1.5,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: fontSize.small,
          marginTop: 15,
          fontFamily: fontFamily.heavy,
          color: theme.colors.reverseText,
        }}
      >
        {localize.NO_ACCOMODATION_TITLE}
      </Text>
      <Text
        style={{
          fontSize: fontSize.small,
          marginTop: 10,
          fontFamily: fontFamily.regular,
          textAlign: "center",
          color: theme.colors.reverseText,
          paddingHorizontal: 20,
        }}
      >
        {localize.NO_ACCOMODATION_MSG}
      </Text>
    </View>
  );
};

export default withTheme(PlaceHolder);
