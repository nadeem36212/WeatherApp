import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from "../shared/Icon";
import AppText from "../shared/Text";
import { margins, iconSize, withTheme } from "@common";

const IconButton = (props) => {
  const { onPress, icon, size, bgColor, iconColor } = props;
  return (
    <View style={styles.btnView}>
      <TouchableOpacity
        onPress={onPress}
        style={{ ...styles.btn, backgroundColor: bgColor }}
      >
        <Icon name={icon} type="local" size={size} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
};

const DatesAndGuestsList = (props) => {
  const {
    desc,
    theme,
    title,
    value,
    onPlusClick,
    onMinusClick,
    plusEnabled = true,
    minusEnabled = true,
    containerStyle,
  } = props;

  return (
    <View
      style={{
        ...styles.datesGuestView,
        ...containerStyle,
      }}
    >
      <View style={styles.keyView}>
        <AppText
          preset="bodyProminent"
          color={theme.colors.reverseText}
          style={styles.keyText}
        >
          {title}
        </AppText>
        {desc ? (
          <AppText
            preset="subhead"
            color={theme.colors.darkGrey}
            style={styles.descText}
          >
            {desc}
          </AppText>
        ) : null}
      </View>
      <View style={styles.actionView}>
        <IconButton
          icon={minusEnabled ? "MinusEnabled" : "MinusDisabled"}
          size={iconSize.sm}
          onPress={onMinusClick}
          iconColor={
            minusEnabled ? theme.colors.plusWhite : theme.colors.reverseDarkGrey
          }
          bgColor={theme.colors.darkHighLight}
        />

        <AppText
          style={styles.value}
          preset="bodyProminent"
          color={theme.colors.reverseText}
        >
          {value}
        </AppText>

        <IconButton
          icon="Plus"
          size={iconSize.sm}
          onPress={onPlusClick}
          iconColor={
            plusEnabled ? theme.colors.plusWhite : theme.colors.reverseDarkGrey
          }
          bgColor={theme.colors.darkHighLight}
        />
      </View>
    </View>
  );
};

export default withTheme(DatesAndGuestsList);

const styles = StyleSheet.create({
  datesGuestView: {
    width: "100%",
    height: iconSize.xl,
    marginTop: margins.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  keyView: {},
  descText: {
    marginTop: 2,
  },
  actionView: {
    flexDirection: "row",
    alignItems: "center",
  },
  btn: {
    width: iconSize.xl,
    height: iconSize.xl,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: iconSize.xl / 2,
  },
  value: {
    textAlign: "center",
    width: margins.md * 2,
  },
});
