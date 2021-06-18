import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { withTheme, margins, iconSize, radius, padding } from "@common";
import SmallButton from "./SmallButton";
import { AppText, Icon, PriceBreakdownSheet } from "..";
import localize from "@common/language/localizeController";

const RoomOption = (props) => {
  const { theme, style, showHelp } = props;
  const { colors } = theme;
  const { item, nr, isLoading: inProgress, onButtonPress } = props;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!inProgress && isLoading) setIsLoading(false);
  }, [inProgress, isLoading]);

  const onBook = () => {
    if (typeof onButtonPress === "function") {
      setIsLoading(true);
      onButtonPress(item);
    }
  };

  const showPolicyHelp = () => {
    let _title = item.cancellation_policy.type;
    let content = (
      <AppText color={colors.primaryForeground}>
        {item.cancellation_policy.text}
      </AppText>
    );

    showHelp(_title, content);
  };

  const openPriceBreakDown = (params) => {
    let priceObj = {
      details: params.price_breakdown.prices,
      price_per_night: params.price_per_night,
      total: params.price_breakdown.total,
    };
    let content = (
      <PriceBreakdownSheet
        buttonOnPress={onBook}
        pricingInfo={{ ...priceObj }}
        buttonLabel={localize.BOOK_NOW}
      />
    );
    showHelp(localize.PRICE_DETAILS, content);
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: colors.secondaryBackground,
        ...style,
      }}
    >
      <AppText preset="bodyProminent" numberOfLines={1}>
        Option {nr || 1}
      </AppText>
      <View style={styles.detailsContainer}>
        <View style={{ ...styles.detailsView }}>
          <TouchableOpacity style={styles.detailRow} onPress={showPolicyHelp}>
            <Icon
              name="CancellationFilled"
              type="local"
              size={iconSize.def}
              color={colors.primaryForeground}
            />

            <AppText preset="rule" style={styles.detailText}>
              {item.cancellation_policy.type}
            </AppText>
            {item.cancellation_policy.text !== "" && (
              <Icon
                name="Info"
                type="local"
                size={iconSize.sm}
                color={colors.secondaryForeground}
                style={{
                  alignSelf:
                    item.cancellation_policy.text.length > 12
                      ? "flex-end"
                      : "flex-start",
                  marginLeft: margins.xs,
                  marginTop: margins.xxs / 2,
                }}
              />
            )}
          </TouchableOpacity>
          {item.bed_info && item.bed_info.bed && (
            <View style={[styles.detailRow, { marginTop: margins.sm }]}>
              <Icon
                name="BedFilled"
                type="local"
                size={iconSize.def}
                color={colors.primaryForeground}
              />
              <AppText
                preset="rule"
                style={{
                  marginStart: margins.xsm,
                  marginTop: margins.xxs / 2,
                }}
              >
                {item.bed_info.bed}
              </AppText>
            </View>
          )}
        </View>
        <View
          style={{
            ...styles.detailsView,
            alignItems: "flex-end",
            ...styles.mb1,
          }}
        >
          {/* <DiscountTag style={{ marginBottom: margins.xs }} /> */}

          <AppText preset="boldText" style={{ ...styles.mb1 }}>
            {item.price_per_night}
          </AppText>
          <AppText
            preset="small"
            color={colors.secondaryForeground}
            style={styles.mb1}
          >
            {localize.PER_NIGHT.toLowerCase()}
          </AppText>
          <TouchableOpacity
            onPress={() => openPriceBreakDown(item)}
            style={{ flexDirection: "row", justifyContent: "center" }}
          >
            <AppText preset="roomBody" color={colors.secondaryForeground}>
              {item.price_breakdown.total.amount} {localize.TOTAL.toLowerCase()}
            </AppText>
            <Icon
              name="Info"
              type="local"
              size={iconSize.sm}
              color={colors.secondaryForeground}
              style={{
                alignSelf: "center",
                marginLeft: margins.xs,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonView}>
        <SmallButton
          title={localize.BOOK_NOW}
          isLoading={isLoading}
          onPress={onBook}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: margins.xs,
    marginHorizontal: margins.sm,
    padding: padding.sm,
    borderRadius: radius.mdx,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 4,
  },
  detailsContainer: {
    flexDirection: "row",
    marginTop: margins.md,
    marginBottom: margins.xs,
  },
  detailsView: {
    flex: 0.5,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  detailText: {
    marginStart: margins.xs,
    marginTop: margins.xxs / 2,
  },
  buttonView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: margins.xss,
  },
  mb1: {
    marginBottom: margins.xxs,
  },
  mr1: {
    marginRight: margins.xs,
  },
});

export default withTheme(RoomOption);
