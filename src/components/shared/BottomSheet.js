import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { AppText, Icon } from "@components";
import { withTheme, iconSize, radius, padding, margins } from "@common";
import { useNavigation } from "@react-navigation/core";

const BottomSheet = (props) => {
  const {
    theme,
    title,
    content,
    isVisible = false,
    hideSheet = () => {},
  } = props;
  const { colors } = theme;
  const styles = getStyles(theme);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  useEffect(() => {
    const unsub = navigation.addListener("blur", () => {
      closeSheet();
    });
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  const closeSheet = () => {
    // TODO: on android the the swipe down gesture does not work
    setVisible(false);
    hideSheet();
  };

  return (
    <Modal
      isVisible={visible}
      swipeDirection="down"
      backdropOpacity={0.4}
      style={styles.container}
      onSwipeComplete={closeSheet}
      backdropColor={colors.overlayColor}
    >
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <View style={{ width: iconSize.md }} />
          {title && (
            <AppText preset="bodyBold" color={colors.primaryForeground}>
              {title}
            </AppText>
          )}
          <TouchableOpacity
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            onPress={closeSheet}
            style={styles.closeIcon}
          >
            <Icon
              name="CloseButton"
              color={colors.primaryForeground}
              type="local"
              size={iconSize.md}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>{content}</View>
      </View>
    </Modal>
  );
};

export default withTheme(BottomSheet);

const getStyles = (theme) => {
  return StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFill,
      margin: 0,
      padding: 0,
    },
    contentContainer: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderTopLeftRadius: radius.md,
      borderTopRightRadius: radius.md,
      backgroundColor: theme.colors.primaryBackground,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: padding.md,
      paddingHorizontal: padding.md,
    },
    closeIcon: {
      zIndex: 1000,
    },
    content: {
      zIndex: 1000,
      paddingBottom: padding.lg,
      paddingHorizontal: padding.md,
    },
    btn: {
      position: "absolute",
      bottom: margins.lg,
      right: margins.md,
      borderRadius: radius.md,
      paddingHorizontal: padding.md,
      paddingVertical: padding.xsm,
    },
  });
};
