import React from "react";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import UserRating from "../../shared/UserRating";
import AppText from "../../shared/Text";

import { withTheme, margins, padding, radius } from "@common";
const { width } = Dimensions.get("window");

const HorizontalListUI = (props) => {
  const { theme, item, navigateToDetails } = props;
  const styles = getStyles(theme);
  return (
    <View style={styles.hItemContainer}>
      <TouchableOpacity onPress={() => navigateToDetails(item)}>
        <View style={styles.mvSwiperItemContainer}>
          <Image
            source={{ uri: item.product_images[0] }}
            style={styles.mvSwiperImage}
          />
          <View style={styles.mvSwiperTextContainer}>
            <AppText preset={"mapItem"} style={styles.mvSwiperTitle}>
              {item.product_title}
            </AppText>
            <AppText preset={"mapItem"} style={styles.mvSwiperDistance}>
              {item.distance
                ? `${item.distance.toFixed(
                    2,
                  )}${item.distance_unit.toLowerCase()} from center`
                : ""}
            </AppText>
          </View>
          <UserRating rating={item.grs} style={styles.userRating} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default withTheme(HorizontalListUI);

const getStyles = (theme) => {
  return StyleSheet.create({
    mvSwiperItemContainer: {
      height: 120,
      borderRadius: radius.sm,
      width: width - margins.sm * 2,
      overflow: "hidden",
      flexDirection: "row",
      backgroundColor: theme.colors.background,

      // shadowColor: "#000",
      // shadowOffset: {
      //   width: 0,
      //   height: 2,
      // },
      // shadowOpacity: 0.25,
      // shadowRadius: 3.84,

      // elevation: 5,
    },
    mvSwiperImage: {
      height: 120,
      width: 113,
      resizeMode: "stretch",
    },
    ratingsView: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    mvSwiperTextContainer: {
      flex: 1,
      paddingTop: padding.xs,
      paddingLeft: padding.xs,
      paddingRight: padding.sm,
      paddingBottom: padding.xs,
      justifyContent: "space-between",
    },
    mvSwiperTitle: {
      width: 180,
      color: theme.colors.reverseText,
    },
    mvSwiperDistance: {
      color: theme.colors.darkGrey,
    },
    hItemContainer: {
      width: width,
      paddingBottom: margins.lg,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    userRating: { left: 8, bottom: 8, position: "absolute" },
  });
};
