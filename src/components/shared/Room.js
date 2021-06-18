import React, { useState, useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText, Icon } from "..";
import { iconSize, withTheme } from "@common";
import SmallButton from "./SmallButton";
import PriceBreakdownSheet from "../explore/listingsDetail/PriceBreakdownSheet";
import { margins, radius, padding } from "@common";
import { noRoomDark, noRoomLight } from "@ImagesNew";
import localize from "@common/language/localizeController";

const Room = (props) => {
  const {
    theme,
    style,
    item,
    onPress,
    showHelp,
    isLoading: inProgress,
  } = props;

  const { colors } = theme;
  const { room_info, details } = item;

  const [isLoading, setIsLoading] = useState(false);

  const roomTypeInfo = room_info[0];
  const roomInfo = details.rooms[0];

  useEffect(() => {
    if (!inProgress && isLoading) {
      setIsLoading(false);
    }
  }, [inProgress, isLoading]);

  const roomImage =
    roomTypeInfo.images && roomTypeInfo.images.length > 0
      ? { uri: roomTypeInfo.images[0] }
      : theme.dark
      ? noRoomDark
      : noRoomLight;

  // const onBookNow = () => {
  //   if (typeof onButtonPress === "function") {
  //     setIsLoading(true);
  //     onButtonPress(
  //       details.product_id,
  //       roomTypeInfo.renter_id,
  //       roomInfo.id,
  //       roomInfo.redis_key || null,
  //       roomTypeInfo.lps || null,
  //     );
  //   }
  // };

  const showPolicyHelp = () => {
    let _title = roomInfo.cancellation_policy.type;
    let content = (
      <View>
        <AppText color={colors.primaryForeground}>
          {roomInfo.cancellation_policy.text}
        </AppText>
      </View>
    );

    showHelp(_title, content);
  };

  const openPriceBreakDown = () => {
    const priceObj = {
      ...roomInfo.price_breakdown,
      details: roomInfo.price_breakdown.prices,
    };
    let content = (
      <PriceBreakdownSheet
        pricingInfo={priceObj}
        buttonOnPress={onPress}
        buttonLabel={localize.SELECT_ROOM}
      />
    );
    showHelp(localize.PRICE_DETAILS, content);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.container,
        backgroundColor: colors.secondaryBackground,
        ...style,
      }}
    >
      <View style={styles.imageView}>
        <Image style={styles.image} source={roomImage} />
      </View>
      <View style={{ flex: 0.55, padding: padding.sm }}>
        <AppText preset="bodyProminent" numberOfLines={1}>
          {roomTypeInfo.unit_name}
        </AppText>

        <View style={styles.detailsContainer}>
          <View style={{ ...styles.detailsView, justifyContent: "flex-start" }}>
            <TouchableOpacity
              style={styles.detailRow}
              onPress={showPolicyHelp}
              hitSlop={{ top: 2, bottom: 15, left: 5, right: 15 }}
            >
              <Icon
                name="CancellationFilled"
                type="local"
                size={iconSize.def}
                color={colors.primaryForeground}
              />
              <AppText preset="rule" style={styles.detailText}>
                {roomInfo.cancellation_policy.type}
              </AppText>
              {roomInfo.cancellation_policy.text !== "" && (
                <Icon
                  name="Info"
                  type="local"
                  size={iconSize.sm}
                  color={colors.secondaryForeground}
                  style={{
                    alignSelf:
                      roomInfo.cancellation_policy.text.length > 12
                        ? "flex-end"
                        : "flex-start",
                    marginLeft: margins.xss,
                    marginTop: margins.xxs / 2,
                  }}
                />
              )}
            </TouchableOpacity>
            {roomTypeInfo.bed_info?.bed ? (
              <View style={styles.detailRow}>
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
                  {roomTypeInfo.bed_info.bed}
                </AppText>
              </View>
            ) : null}
            {roomTypeInfo.unit_size ? (
              <View style={styles.detailRow}>
                <Icon
                  name="Area"
                  type="local"
                  size={iconSize.def}
                  color={colors.primaryForeground}
                />
                <AppText
                  preset="rule"
                  style={{
                    marginStart: margins.xs,
                    marginTop: margins.xxs / 2,
                  }}
                >
                  {roomTypeInfo.unit_size} sq m
                </AppText>
              </View>
            ) : null}
          </View>
          <View style={{ ...styles.detailsView, alignItems: "flex-end" }}>
            {/* <DiscountTag style={{ marginBottom: margins.xs }} /> */}
            <AppText preset="boldText" style={{ ...styles.mb1 }}>
              {roomInfo.price_per_night}
            </AppText>
            <AppText
              preset="small"
              color={colors.secondaryForeground}
              style={styles.mb1}
            >
              {localize.PER_NIGHT.toLowerCase()}
            </AppText>
            <TouchableOpacity
              onPress={() => openPriceBreakDown(roomInfo)}
              style={styles.total}
            >
              <AppText preset="roomBody" color={colors.secondaryForeground}>
                {roomInfo.price_breakdown.total.amount}{" "}
                {localize.TOTAL.toLowerCase()}
              </AppText>
              <Icon
                name="Info"
                type="local"
                size={iconSize.sm}
                color={colors.secondaryForeground}
                style={{
                  alignSelf: "center",
                  marginLeft: margins.xss,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ ...styles.buttonView }}>
          <SmallButton
            onPress={onPress}
            title={localize.SELECT_ROOM}
            isLoading={isLoading}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: margins.sm,
    marginHorizontal: margins.xs,
    borderRadius: radius.mdx,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 4,
  },
  imageView: {
    height: 210,
    width: "100%",
  },
  image: {
    flex: 1,
    width: "100%",
    borderTopLeftRadius: radius.mdx,
    borderTopRightRadius: radius.mdx,
  },
  detailsContainer: {
    // flex: 1,
    flexDirection: "row",
    marginTop: margins.sm,
    marginBottom: margins.xs,
  },
  detailsView: {
    flex: 0.5,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: margins.sm,
  },
  detailText: {
    marginStart: margins.xs,
    marginTop: margins.xxs / 2,
  },
  total: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: margins.sm,
    // height: 40,
  },
  mb1: {
    marginBottom: margins.xxs,
  },
  mr1: {
    marginRight: margins.xs,
  },
});

export default withTheme(Room);
