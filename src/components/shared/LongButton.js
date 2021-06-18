import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { withTheme, padding } from "@common";
import { Contact, BookmarkButton, DescriptionOutlined, Door } from "@ImagesNew";
import { AppText } from "..";

const LongButton = (props) => {
  const { theme, title, icon, style, onPress } = props;
  const { colors } = theme;

  // Switch to handle multiple icons //
  const renderIcon = () => {
    switch (icon) {
      case "contact":
        return <Contact style={{ color: colors.plusWhite, marginRight: 10 }} />;
      case "bookmark":
        return (
          <BookmarkButton
            style={{ color: colors.plusWhite, marginRight: 10 }}
          />
        );
      case "reviews":
        return (
          <DescriptionOutlined
            style={{ color: colors.plusWhite, marginRight: 10 }}
          />
        );
      case "door":
        return <Door style={{ color: colors.plusWhite, marginRight: 10 }} />;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { backgroundColor: colors.shadeGrey }, style]}
    >
      {renderIcon()}
      <AppText medium size={13.5}>
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: padding.xsm,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
});

LongButton.propTypes = {
  icon: PropTypes.oneOf(["contact", "bookmark", "reviews", "door"]),
  title: PropTypes.string.isRequired,
};

export default withTheme(LongButton);
