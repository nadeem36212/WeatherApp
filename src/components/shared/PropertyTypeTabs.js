import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { withTheme, margins, radius, letterSpacing } from "@common";
import localize from "@common/language/localizeController";
import AppText from "./Text";

const TabToggleButton = (props) => {
  const { theme, isSelected, onPress, label } = props;
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        {
          backgroundColor:
            theme.dark && isSelected
              ? theme.colors.reverseDarkGrey
              : !theme.dark && isSelected
              ? theme.colors.white
              : "transparent",
        },
      ]}
      onPress={onPress}
    >
      <AppText
        preset={isSelected ? "smallTextSemi" : "smallTextPlain"}
        color={theme.colors.reverseText}
        style={styles.btnText}
      >
        {label}
      </AppText>
    </TouchableOpacity>
  );
};

const PropertyTypeTabs = (props) => {
  const { theme, onPress, isHotelSelected, containerStyle } = props;

  const onToggle = (type) => {
    if (typeof onPress === "function") onPress(type);
  };

  return (
    <View
      style={{
        ...styles.btnView,
        backgroundColor: theme.colors.shadeGrey,
        zIndex: 1,
        ...containerStyle,
      }}
    >
      <TabToggleButton
        theme={theme}
        label={localize.HOTELS}
        isSelected={isHotelSelected}
        onPress={() => {
          onToggle(localize.HOTELS);
        }}
      />

      <TabToggleButton
        theme={theme}
        label={localize.HOMES}
        isSelected={!isHotelSelected}
        onPress={() => {
          onToggle(localize.HOMES);
        }}
      />
    </View>
  );
};

export default withTheme(PropertyTypeTabs);

const styles = StyleSheet.create({
  btnView: {
    flexDirection: "row",
    marginTop: margins.xsm,
    borderRadius: radius.xs,
    alignSelf: "stretch",
    // marginHorizontal: margins.horizontal
  },
  btn: {
    flex: 1,
    margin: 2,
    alignItems: "center",
    borderRadius: radius.xs,
    justifyContent: "center",
  },
  btnText: {
    marginVertical: 6,
    letterSpacing: letterSpacing.normal,
  },
});
