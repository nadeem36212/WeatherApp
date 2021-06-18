import React from "react";
import { TouchableOpacity, StyleSheet, Animated } from "react-native";
import { View } from "react-native";

import { withTheme, hasNotch } from "@common";

import Icon from "../../shared/Icon";
import NotchView from "../../shared/NotchView";
import { useNavigation } from "@react-navigation/native";
import { iconSize, padding } from "../../../common";

const Button = withTheme(({ children, onPress, style = null, theme }) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor: theme.colors.colorblack }, style]}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
));

const Header = (props) => {
  const navigation = useNavigation();

  const { colors } = props.theme;
  const { onSharePress, color = colors.colorblack, opacity } = props;

  return (
    <View style={styles.container}>
      <NotchView opacity={opacity} color={color} />
      <Animated.View
        style={{
          ...styles.header,
          backgroundColor: color,
          opacity: opacity,
        }}
      >
        <View style={styles.leftSection}>
          {/* <Button style={{ marginEnd: margins.sm }}>
            <Icon
              name="BookmarkButton"
              color={colors.plusWhite}
              size={iconSize.md}
            />
          </Button> */}
          <Button onPress={onSharePress}>
            <Icon
              name="ShareButton"
              color={colors.plusWhite}
              size={iconSize.md}
            />
          </Button>
        </View>
        <View>
          <Button onPress={() => navigation.pop()}>
            <Icon
              name="CloseButton"
              color={colors.plusWhite}
              size={iconSize.md}
            />
          </Button>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  header: {
    height: 94 - (hasNotch ? 33 : 20),
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
    paddingTop: padding.md,
    paddingHorizontal: padding.md,
    justifyContent: "space-between",
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  leftSection: {
    flexDirection: "row",
  },
});

export default withTheme(Header);
