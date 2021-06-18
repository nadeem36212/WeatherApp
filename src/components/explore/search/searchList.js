import React, { useState } from "react";
import { propertyType } from "@envs/env.json";
import {
  View,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import Icon from "../../shared/Icon";
import AppText from "../../shared/Text";
import Amenities from "../../shared/Amenities";
import UserRating from "../../shared/UserRating";

import {
  stripHTMLEntities,
  lineHeight,
  withTheme,
  iconSize,
  padding,
  margins,
} from "@common";
import localize from "@common/language/localizeController";
import LinearGradient from "react-native-linear-gradient";

const { width } = Dimensions.get("window");

const SearchList = (props) => {
  const { item, theme, nrOfDays, onPress } = props;
  // eslint-disable-next-line no-unused-vars
  const [image, setImage] = useState(
    item.product_images
      ? item.product_images[0]
      : item.product_image
      ? item.product_image
      : null,
  );

  const renderStars = () => {
    if (
      item.property_type === propertyType.hotel &&
      item.star_rating &&
      item.star_rating !== ""
    )
      return Array(parseInt(item.star_rating, 10))
        .fill(1)
        .map((i, idx) => (
          <Icon
            name="Star"
            key={"" + idx}
            size={iconSize.ft}
            color={theme.colors.secondaryForegroundAccent}
          />
        ));
    else return <View />;
  };

  const renderDistanceAndBeds = () => {
    const distance =
      item.distance && item.distance_unit
        ? item.distance.toFixed(2) +
          item.distance_unit.toLowerCase() +
          " " +
          localize.FROM_CENTER
        : "";

    const bedrooms = item.bedrooms
      ? item.bedrooms === `Studio`
        ? item.bedrooms + " " + localize.ITEM_BEDROOM
        : Math.floor(item.bedrooms) +
          " " +
          (item.bedrooms > 1 ? localize.ITEM_BEDROOMS : localize.ITEM_BEDROOM)
      : "";

    const baths = item.noofbathrooms
      ? Math.floor(item.noofbathrooms) +
        " " +
        (item.noofbathrooms > 1
          ? localize.ITEM_BATHROOMS
          : localize.ITEM_BATHROOMS)
      : "";

    let str = "";
    if (distance !== "") str = distance;
    if (bedrooms !== "") str = str + (str !== "" ? " • " : "") + bedrooms;
    if (baths !== "") str = str + (str !== "" ? " • " : "") + baths;

    if (str === "") return null;

    return (
      <AppText
        preset="tinySemi"
        color={theme.colors.secondaryForegroundAccent}
        style={styles.details}
      >
        {str}
      </AppText>
    );
  };

  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      style={[styles.listContainer]}
    >
      <ImageBackground source={{ uri: image }} style={styles.listImage}>
        <LinearGradient
          style={{ ...StyleSheet.absoluteFill }}
          colors={["#00000000", "#00000059"]}
        />
        <View
          style={[
            styles.bookMarkView,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Icon
            name="BookMarkOutlined"
            size={iconSize.md}
            color={theme.colors.reverseText}
          />
        </View>

        {item.cancellation_policy === "Free Cancellation" ||
        (item.breakfast_included && item.breakfast_included === "1") ? (
          <View
            style={{
              ...styles.highlight,
              backgroundColor: theme.colors.itemHighlightBg,
            }}
          >
            <AppText
              preset="itemHighlight"
              color={theme.colors.reverseText}
              style={styles.highlightTxt}
            >
              {item.cancellation_policy || item.breakfast_included}
            </AppText>
          </View>
        ) : null}

        <UserRating
          reviews={item.grs_total_reviews}
          rating={item.grs}
          style={styles.userRating}
        />

        <Amenities amenities={item.tiles_icons} style={styles.amenities} />
      </ImageBackground>

      <View style={styles.starView}>
        <AppText
          preset="tinyBold"
          style={styles.starRating}
          color={theme.colors.secondaryForegroundAccent}
        >
          {item.property_type.toUpperCase()}
        </AppText>
        {renderStars()}
      </View>

      <AppText color={theme.colors.reverseText} style={styles.title}>
        {stripHTMLEntities(item.product_title)}
      </AppText>

      {renderDistanceAndBeds()}

      {item.price && item.price.amount ? (
        <View style={styles.pricing}>
          <View style={{ flexDirection: "row" }}>
            {item.price.original ? (
              <AppText
                color={theme.colors.darkGrey}
                style={styles.originalPrice}
              >
                {item.price.currency_symbol + item.price.original}
              </AppText>
            ) : null}

            <AppText preset="bodyBold">
              {item.price.currency_symbol}
              {parseInt(item.price.amount, 10)}
              <AppText>{localize.ITEM_PER_NIGHT}</AppText>
            </AppText>

            {item.price.discount ? (
              <View
                style={{
                  ...styles.discount,
                  backgroundColor: theme.colors.green,
                }}
              >
                <Icon
                  name="PriceTagFilled"
                  size={iconSize.sm}
                  style={{ marginRight: margins.xxs }}
                  color={theme.dark ? theme.colors.black : theme.colors.white}
                />
                <AppText
                  preset="discount"
                  style={{ marginTop: 4 }}
                  color={theme.dark ? theme.colors.black : theme.colors.white}
                >
                  {item.price.discount}% OFF
                </AppText>
              </View>
            ) : null}
          </View>

          <AppText
            preset="tinySemiAlt"
            color={theme.colors.darkGrey}
            style={styles.total}
          >
            {item.price.currency_symbol}
            {parseInt(item.price.amount, 10) * nrOfDays} {localize.ITEM_TOTAL}
          </AppText>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default withTheme(SearchList);

const styles = StyleSheet.create({
  listContainer: {
    width: width - 48,
  },
  listImage: {
    height: 220,
    // width: width - 40,
    resizeMode: "contain",
    overflow: "hidden",
    borderRadius: 15,
  },
  bookMarkView: {
    height: 36,
    width: 36,
    margin: 15,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  starView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: margins.xsm,
  },
  starRating: {
    marginRight: margins.xxs,
  },
  title: {
    marginTop: margins.xxs,
  },
  details: {
    marginTop: 6,
  },
  pricing: {
    marginTop: margins.xsm,
    justifyContent: "center",
  },
  originalPrice: {
    textDecorationLine: "line-through",
    marginRight: margins.xs,
  },
  discount: {
    height: lineHeight.default,
    borderRadius: lineHeight.default / 2,
    paddingHorizontal: padding.xs,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: margins.sm,
  },
  total: {
    marginTop: margins.xxs,
  },
  amenities: {
    position: "absolute",
    bottom: margins.sm,
    right: margins.sm,
  },
  highlight: {
    height: 23,
    borderRadius: 23 / 2,
    position: "absolute",
    right: margins.sm,
    top: margins.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: margins.xsm,
    paddingTop: 2,
  },
  highlightTxt: {
    textTransform: "uppercase",
  },
  userRating: {
    position: "absolute",
    bottom: margins.sm,
    left: margins.sm,
  },
});
