import React from "react";
import { StyleSheet, View } from "react-native";
import { iconSize, getAmenityIcon, withTheme } from "@common";
import Icon from "./Icon";
import { margins } from "../../common";

const Amenity = (props) => {
  const { item, style: styleOverride, color } = props;
  const icon = getAmenityIcon(item.icon_name);
  return icon ? (
    <Icon
      name={icon}
      color={color}
      size={iconSize.md}
      style={{ ...styles.item, ...styleOverride }}
    />
  ) : null;
};

const Amenities = (props) => {
  const { theme, amenities, style: styleOverride, itemStyle } = props;

  if (!amenities) return null;

  let sortedAmenities = amenities.sort(function (a, b) {
    return a.priority - b.priority;
  });
  sortedAmenities = sortedAmenities.filter(
    (v, i, a) => a.findIndex((t) => t.icon_name === v.icon_name) === i,
  );

  return (
    <View style={{ ...styles.container, ...styleOverride }}>
      {sortedAmenities.map((a, idx) => (
        <Amenity
          key={"" + idx}
          item={a}
          style={itemStyle}
          color={theme.colors.white}
        />
      ))}
    </View>
  );
};

export default withTheme(Amenities);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    marginLeft: margins.xs,
  },
});
