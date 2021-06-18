import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import AppText from "../../shared/Text";
import Icon from "../../shared/Icon";
import { ActivityLoader } from "../../shared/loaderNew";
import { iconSize, withTheme, padding, isAndroid, radius } from "@common";
import localize from "@common/language/localizeController";
// import localize from "@common/language/localizeController";

const HOTEL = "hotel";

const BottomStickyBar = ({
  price,
  theme,
  message,
  isLoading,
  totalPrice,
  buttonTitle,
  onInfoPress,
  propertyType,
  onButtonPress,
}) => {
  const { colors } = theme;
  const styles = getStyle(theme);
  return (
    <View style={styles.container}>
      <View style={styles.col}>
        {propertyType === HOTEL ? (
          <View style={{ flex: 1 }} />
        ) : !price && !totalPrice ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <AppText color={colors.error}>{message}</AppText>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <AppText color={colors.darkGrey}>
              <AppText preset="bodyBold" color={colors.primaryForeground}>
                {price}
              </AppText>
              {localize.ITEM_PER_NIGHT}
            </AppText>
            <TouchableOpacity
              style={styles.totalPriceView}
              onPress={onInfoPress}
            >
              <AppText
                preset="smallProminent"
                style={{ color: colors.darkGrey }}
              >
                {totalPrice} {localize.ITEM_TOTAL}
              </AppText>
              <Icon
                name="Info"
                size={iconSize.sm}
                color={colors.darkGrey}
                style={{ marginStart: 5 }}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.col}>
        {isLoading ? (
          <ActivityLoader
            size={"small"}
            bgColor={theme.colors.brand}
            fgColor={theme.colors.colorblack}
            containerStyle={{ ...styles.loader }}
          />
        ) : (
          <TouchableOpacity
            onPress={onButtonPress}
            disabled={message ? true : false}
            style={{
              ...styles.button,
              backgroundColor: !message ? colors.brand : colors.darkHighLight,
            }}
          >
            {propertyType === HOTEL ? (
              <Icon
                name="ExitOutlined"
                size={iconSize.md}
                color={colors.colorblack}
                style={{ marginRight: 5 }}
              />
            ) : null}
            <AppText color={colors.colorblack} preset="stickyButton">
              {buttonTitle}
            </AppText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const getStyle = (theme) => {
  return StyleSheet.create({
    container: {
      left: 0,
      right: 0,
      bottom: 0,
      borderTopWidth: 1,
      flexDirection: "row",
      position: "absolute",
      alignItems: "center",
      paddingTop: padding.sm,
      paddingHorizontal: padding.md,
      justifyContent: "space-between",
      paddingBottom: isAndroid ? padding.sm : padding.lg,

      borderColor: theme.colors.darkHighLight,
      backgroundColor: theme.colors.background,
    },
    totalPriceView: {
      marginTop: 4,
      flexDirection: "row",
      alignItems: "center",
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: radius.mds,
      paddingHorizontal: padding.md,
      paddingVertical: padding.xsm,
    },
    loader: {
      borderRadius: 25,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: padding.xsm,
      paddingHorizontal: padding.lg,
    },
    col: {
      flex: 0.5,
    },
  });
};

export default withTheme(BottomStickyBar);
