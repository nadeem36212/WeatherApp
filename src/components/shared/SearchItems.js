import React from "react";
import { StyleSheet, View } from "react-native";
import IconText from "./IconText";
import { margins, withTheme, radius } from "@common";
import { padding } from "../../common";

const SearchItem = (props) => {
  const { icon, text, color, theme, onPress, isPlaceholder, ctrStyle } = props;
  return (
    <IconText
      icon={icon}
      iconColor={color}
      textColor={
        isPlaceholder
          ? theme.colors.secondaryForeground
          : theme.colors.primaryForeground
      }
      iconStyle={{ marginRight: margins.xs }}
      text={text}
      textPreset="body"
      onPress={onPress}
      containerStyle={ctrStyle}
      withoutFeedback
    />
  );
};

const SearchItems = (props) => {
  const {
    theme,
    dates,
    guests,
    location,
    iconColor,
    onDatesPress,
    onGuestsPress,
    onLocationPress,
    isDatePlaceholder = false,
    isGuestsPlaceholder = false,
    isLocationPlaceholder = false,
    containerStyle,
    separateLines = false,
  } = props;
  return (
    <View
      style={{
        ...styles.container,
        ...containerStyle,
        backgroundColor: theme.colors.searchItemsBg,
      }}
    >
      {location && (
        <SearchItem
          theme={theme}
          text={location}
          icon="LocationOutlined"
          onPress={onLocationPress}
          isPlaceholder={isLocationPlaceholder}
          color={iconColor || theme.colors.secondaryForeground}
          ctrStyle={{ marginBottom: margins.md }}
        />
      )}
      <View style={separateLines ? styles.column : styles.row}>
        {dates && (
          <SearchItem
            icon="Dates"
            text={dates}
            theme={theme}
            onPress={onDatesPress}
            isPlaceholder={isDatePlaceholder}
            ctrStyle={separateLines ? null : styles.cell}
            color={iconColor || theme.colors.secondaryForeground}
          />
        )}
        {guests && (
          <SearchItem
            theme={theme}
            text={guests}
            icon="Person"
            onPress={onGuestsPress}
            isPlaceholder={isGuestsPlaceholder}
            color={iconColor || theme.colors.secondaryForeground}
            ctrStyle={separateLines ? styles.cellFull : styles.cell}
          />
        )}
      </View>
    </View>
  );
};

export default withTheme(SearchItems);

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.sm,
    paddingHorizontal: padding.xs,
    paddingVertical: padding.xsm,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  cellFull: {
    paddingTop: margins.md,
  },
  cell: {
    flex: 0.5,
  },
});
