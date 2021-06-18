import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import AppText from "../shared/Text";

const { width } = Dimensions.get("window");
import { margins, padding } from "@common";

const SingleSelectItem = (props) => {
  const { theme, item, section, isSelected } = props;

  const styles = getStyles(theme);

  const onPress = () => {
    props.onPress(true, item.index, section);
  };

  const renderCircle = () => {
    let circleStyle = [styles.circleCtn];
    if (isSelected) circleStyle.push(styles.circleSelected);
    return <View style={circleStyle} />;
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.itemView}>
      <AppText color={theme.colors.reverseText}>{item.name}</AppText>
      <View style={{ alignItems: "flex-end" }}>{renderCircle()}</View>
    </TouchableOpacity>
  );
};

export default SingleSelectItem;

const getStyles = (theme) => {
  return StyleSheet.create({
    itemView: {
      width: width,
      marginBottom: margins.lg,
      paddingHorizontal: padding.md,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    circleCtn: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 2,
      alignItems: "center",
      justifyContent: "center",
      borderColor: theme.colors.secondaryForegroundAccent,
    },
    circleSelected: {
      borderWidth: 6,
      borderColor: theme.colors.primaryForeground,
    },
  });
};
