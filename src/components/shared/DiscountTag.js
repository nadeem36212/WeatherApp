import React from "react";
import { StyleSheet, View } from "react-native";
import { PriceTag } from "@ImagesNew";
import { AppText } from "..";
import {
  withTheme,
  normalizeFont,
  padding,
  normalizeX,
  normalizeY,
} from "@common";
import { margins, radius } from "../../common";

const DiscountTag = (props) => {
  const { style } = props;
  const { colors } = props.theme;

  return (
    <View
      style={{ ...styles.container, backgroundColor: colors.green, ...style }}
    >
      <PriceTag style={{ color: colors.colorblack }} />
      <AppText style={styles.text} color={colors.colorblack}>
        23 % OFF
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: padding.xs,
    paddingVertical: padding.xxs / 2,
    borderRadius: radius.mdx,
    marginBottom: margins.xxs,
  },
  text: {
    fontSize: normalizeFont(10),
    marginStart: 4,
  },
});

export default withTheme(DiscountTag);
