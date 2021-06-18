import React from "react";
import { View, Dimensions, StyleSheet, TouchableOpacity } from "react-native";

import Icon from "../shared/Icon";
import AppText from "../shared/Text";

import { radius, padding, margins, iconSize, withTheme } from "@common";

const { width } = Dimensions.get("window");

const FiltersList = (props) => {
  const { theme, filterItem, onPress, onRemove, selected } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.filtersItemView}
      disabled={!filterItem.enabled}
    >
      <View style={styles.iconView}>
        <Icon
          name={filterItem.icon}
          size={iconSize.md}
          color={theme.colors.secondaryForeground}
        />
      </View>
      <View style={styles.titleView}>
        <AppText
          preset={selected ? "bodyBold" : "body"}
          color={theme.colors.primaryForeground}
        >
          {filterItem.title}
        </AppText>
        {!!selected && (
          <TouchableOpacity
            onPress={onRemove}
            style={[styles.badge, { backgroundColor: theme.colors.shadeGrey }]}
          >
            <AppText
              preset="bodyBold"
              color={theme.colors.reverseText}
              style={styles.badgeText}
            >
              {selected}
            </AppText>
            <Icon
              name="CancelSmall"
              size={iconSize.xs}
              color={theme.colors.subtleGrey}
            />
          </TouchableOpacity>
        )}
      </View>

      <Icon
        name="ForwardArrow"
        size={iconSize.sm}
        color={theme.colors.subtleGrey}
        style={{ alignItems: "flex-end" }}
      />
    </TouchableOpacity>
  );
};

export default withTheme(FiltersList);

const styles = StyleSheet.create({
  filtersItemView: {
    height: 30,
    width: width,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: padding.md,
  },
  iconView: {
    flex: 1,
    justifyContent: "center",
    marginRight: margins.xs,
  },
  titleView: {
    flex: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  badge: {
    marginLeft: margins.xs,
    borderRadius: radius.xs,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  badgeText: {
    marginRight: 5,
  },
  badgeIcon: {},
});
