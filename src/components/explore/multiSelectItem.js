import React, { useState, useEffect } from "react";
import { filterTypes } from "@envs/env.json";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { padding } from "@common";
import AppText from "../shared/Text";
import Icon from "../shared/Icon";
import { margins } from "../../common";

const { width } = Dimensions.get("window");

const MultiSelectItem = (props) => {
  const { theme, type, item, index, isChecked, isLast } = props;
  const [checked, setChecked] = useState(isChecked);
  const styles = getStyles(theme);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const onPress = () => {
    setChecked(!checked);
    props.onPress(!checked);
  };

  const renderLabel = () => {
    if (type === filterTypes.star_multi_select) {
      let starNr = parseInt(item.id, 10);
      let stars = Array(starNr).fill(1);
      return starNr === 0 ? (
        <AppText style={styles.label}>{item.name || item.title}</AppText>
      ) : (
        <View style={{ flexDirection: "row" }}>
          {stars.map((s, i) => (
            <Icon
              name="Star"
              key={index + " " + i}
              size={15}
              style={{ marginRight: 4 }}
              color={theme.colors.reverseText}
            />
          ))}
        </View>
      );
    } else {
      return <AppText style={styles.label}>{item.name || item.title}</AppText>;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.itemView,
        marginBottom: isLast ? margins.xxl : margins.lg,
      }}
    >
      {renderLabel()}
      <View style={[styles.iconView, { alignItems: "flex-end" }]}>
        <Icon
          name={
            checked
              ? theme.dark
                ? "CheckmarkDark"
                : "CheckmarkLight"
              : "UnSelCheckBox"
          }
          size={20}
          color={
            checked
              ? theme.colors.primaryForeground
              : theme.colors.secondaryForegroundAccent
          }
        />
      </View>
    </TouchableOpacity>
  );
};

export default MultiSelectItem;

const getStyles = (theme) => {
  return StyleSheet.create({
    itemView: {
      width: width,
      paddingHorizontal: padding.md,
      marginBottom: 32,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    label: {
      color: theme.colors.reverseText,
    },
  });
};
