import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "../../shared/Icon";
import AppText from "../../shared/Text";
import {
  withTheme,
  renderGuests,
  changeFormat,
  radius,
  padding,
  margins,
  iconSize,
  HOME_TILE_WIDTH,
} from "@common";

const PrevSearchList = (props) => {
  const { item, theme, onPress } = props;
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      style={[
        styles.recentContainer,
        {
          backgroundColor: theme.colors.shadeGrey,
        },
      ]}
    >
      <Icon
        name="ClockDark"
        type="local"
        size={iconSize.md}
        style={{ marginBottom: margins.x3l }}
        color={theme.colors.clockGrey}
      />

      <AppText preset="largeBodyBold" color={theme.colors.reverseText}>
        {item.searchString.split(" ")[0] + " "}
        <AppText preset="largeBodyRegular" color={theme.colors.reverseText}>
          {item.searchString.split(" ")[1]}
        </AppText>
      </AppText>

      <AppText
        preset="subhead"
        color={theme.colors.darkGrey}
        style={styles.descText}
      >
        {changeFormat(item.startDate) +
          " – " +
          changeFormat(item.endDate) +
          " • " +
          renderGuests(item.guests)}
      </AppText>
    </TouchableOpacity>
  );
};
export default withTheme(PrevSearchList);

const styles = StyleSheet.create({
  recentContainer: {
    width: HOME_TILE_WIDTH,
    justifyContent: "space-between",
    borderRadius: radius.sm,
    padding: padding.sm,
  },
  descText: {
    marginTop: margins.xxs,
  },
});
