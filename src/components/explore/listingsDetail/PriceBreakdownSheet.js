import React, { useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "../../shared/Text";
import Icon from "../../shared/Icon";
import {
  withTheme,
  stripHTML,
  iconSize,
  margins,
  padding,
  radius,
} from "@common";
import localize from "@common/language/localizeController";

const ToolTipIconLabel = ({
  children,
  colors,
  tooltip,
  textProps,
  onPress,
  preset,
}) => {
  return (
    <TouchableOpacity disabled={!tooltip} onPress={onPress}>
      <AppText preset={preset} {...textProps}>
        {children}{" "}
        {tooltip && tooltip !== "" ? (
          <Icon
            name="Info"
            type="local"
            size={iconSize.sm}
            color={colors.secondaryForeground}
            style={{
              marginTop: -1,
            }}
          />
        ) : (
          ""
        )}
      </AppText>
    </TouchableOpacity>
  );
};

const PriceBreakdownSheet = (props) => {
  const { colors } = props.theme;
  const { pricingInfo, buttonLabel, buttonOnPress = () => {} } = props;
  const [toastMessage, setToastMessage] = useState(null);
  const [showToast, setShowToast] = useState(null);
  let toast = useRef(null);

  const onPress = (tooltip) => {
    if (!tooltip) return null;
    setToastMessage(stripHTML(tooltip));
    setShowToast(true);

    if (toast.current) {
      clearTimeout(toast.current);
    }

    toast.current = setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  if (pricingInfo.text) {
    return (
      <AppText color={colors.primaryForeground}>{pricingInfo.text}</AppText>
    );
  }
  return (
    <View style={{ marginTop: margins.xs }}>
      {pricingInfo.nights ? (
        <View style={styles.priceRow}>
          <ToolTipIconLabel
            tooltip={pricingInfo.tooltip}
            colors={colors}
            onPress={() => onPress(pricingInfo.tooltip)}
          >
            {pricingInfo.nights}{" "}
            {pricingInfo.nights > 1 ? localize.NIGHTS : localize.NIGHT} ×{" "}
            {pricingInfo.price_per_night}
          </ToolTipIconLabel>
          <AppText color={colors.primaryForeground}>
            {pricingInfo.total_nights_price}
          </AppText>
        </View>
      ) : null}
      {pricingInfo.discount && (
        <View style={styles.priceRow}>
          <AppText color={colors.primaryForeground}>
            {localize.DISCOUNT}
          </AppText>
          <AppText color={colors.primaryForeground}>
            {pricingInfo.discount}
          </AppText>
        </View>
      )}
      {pricingInfo.details.map((item, i) => (
        <View key={i} style={styles.priceRow}>
          <ToolTipIconLabel
            tooltip={item.tooltip ? item.tooltip : ""}
            colors={colors}
            onPress={() => onPress(item.tooltip)}
          >
            {item.name}
          </ToolTipIconLabel>
          <AppText color={colors.primaryForeground}>{item.amount}</AppText>
        </View>
      ))}
      <View
        style={{
          height: 1,
          left: -40,
          width: "200%",
          marginBottom: margins.md,
          backgroundColor: colors.headerBorder,
        }}
      />
      <View style={styles.priceRow}>
        <ToolTipIconLabel
          tooltip={pricingInfo.total.tooltip ? pricingInfo.total.tooltip : ""}
          preset="bodyBold"
          colors={colors}
          onPress={() => onPress(pricingInfo.total.tooltip)}
        >
          {localize.TOTAL}
        </ToolTipIconLabel>
        <AppText preset="bodyBold" color={colors.primaryForeground}>
          {pricingInfo.total.amount}
        </AppText>
      </View>

      {showToast ? (
        <AppText color={colors.secondaryForeground}>{toastMessage}</AppText>
      ) : (
        <View style={styles.placeholder} />
      )}

      <TouchableOpacity
        style={{ ...styles.btn, backgroundColor: colors.brand }}
        onPress={buttonOnPress}
      >
        <AppText preset="stickyButton" color={colors.background}>
          {buttonLabel}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: margins.md,
    justifyContent: "space-between",
  },
  btn: {
    borderRadius: radius.mds,
    paddingHorizontal: padding.md,
    paddingVertical: padding.xsm,
    marginTop: margins.xl,
    alignSelf: "flex-end",
  },
  placeholder: {
    height: 44,
  },
});

export default withTheme(PriceBreakdownSheet);
