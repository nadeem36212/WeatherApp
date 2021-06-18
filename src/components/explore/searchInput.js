import React from "react";
import {
  View,
  Platform,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  radius,
  margins,
  padding,
  iconSize,
  withTheme,
  typography,
} from "@common";
import Icon from "../shared/Icon";

const SearchInput = (props) => {
  const {
    value,
    theme,
    onBlur,
    onFocus,
    autoFocus,
    onClear,
    placeholder,
    onChangeText,
    inputViewStyle,
    iconColor,
    placeholderTextColor,
  } = props;

  const onLocalFocus = () => {
    if (typeof onFocus === "function") onFocus();
  };

  const onLocalBlur = () => {
    if (typeof onBlur === "function") onBlur();
  };

  return (
    <View
      style={{
        ...styles.searchInputView,
        ...inputViewStyle,
        backgroundColor: theme.colors.shadeGrey,
      }}
    >
      <Icon
        name="SearchWhite"
        type="local"
        size={iconSize.md}
        color={iconColor ? iconColor : theme.colors.primaryForeground}
      />

      <TextInput
        style={{
          ...styles.searchTextInput,
          color: theme.colors.primaryForeground,
        }}
        selectionColor={theme.colors.brand}
        placeholderTextColor={
          placeholderTextColor ? placeholderTextColor : theme.colors.subtleGrey
        }
        placeholder={placeholder}
        underlineColorAndroid={"transparent"}
        onFocus={onLocalFocus}
        onBlur={onLocalBlur}
        autoFocus={autoFocus}
        value={value}
        onChangeText={onChangeText}
      />
      {!!value && (
        <TouchableOpacity onPress={onClear}>
          <Icon
            name="Cancel"
            type="local"
            size={iconSize.md}
            color={theme.colors.cancelGrey}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default withTheme(SearchInput);

const styles = StyleSheet.create({
  searchInputView: {
    flexDirection: "row",
    borderRadius: radius.sm,
    alignItems: "center",
    paddingHorizontal: padding.xs,
    paddingVertical: padding.xsm,
    flex: 1,
    ...Platform.select({
      android: {
        paddingVertical: 0,
      },
    }),
  },
  searchTextInput: {
    ...typography.body,
    marginHorizontal: margins.xxs,
    flex: 1,
    ...Platform.select({
      android: {
        // paddingTop: 0,
      },
    }),
  },
});
