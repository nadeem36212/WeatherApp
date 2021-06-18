import React from "react";
import {
  withTheme,
  renderGuests,
  changeFormat,
  iconSize,
  margins,
} from "@common";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from "../../shared/Icon";
import AppText from "../../shared/Text";

const RecentHistoryList = (props) => {
  const { theme, item, index, onItemPress, iconName } = props;

  return (
    <TouchableOpacity
      key={index}
      onPress={() => onItemPress(item)}
      style={{
        marginTop: index === 0 ? margins.lg : 0,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Icon
        type="local"
        name={iconName}
        size={iconSize.md}
        color={theme.colors.subtleGrey}
        style={{ marginRight: margins.xsm }}
      />

      <View style={styles.addressView}>
        <AppText
          preset="body"
          color={theme.colors.reverseText}
          style={styles.country}
        >
          {item.searchString}
        </AppText>
        {item.startDate && (
          <AppText
            preset="subhead"
            color={theme.colors.darkGrey}
            style={styles.address}
          >
            {changeFormat(item.startDate) +
              " – " +
              changeFormat(item.endDate) +
              ", " +
              renderGuests(item.guests)}
          </AppText>
        )}
      </View>

      <Icon type="local" name="ForwardArrow" color={theme.colors.subtleGrey} />
    </TouchableOpacity>
  );
};
export default withTheme(RecentHistoryList);

const styles = StyleSheet.create({
  addressView: {
    flex: 1,
  },
  country: {
    flexWrap: "wrap",
  },
  address: {
    marginTop: 2,
  },
});
