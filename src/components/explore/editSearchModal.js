import React from "react";
import { View, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import {
  radius,
  padding,
  margins,
  iconSize,
  isAndroid,
  renderGuests,
  changeFormat,
} from "@common";
import Modal from "react-native-modal";
import { AppText, Icon, IconText } from "..";
import localize from "@common/language/localizeController";
import { useRoute, useNavigation } from "@react-navigation/core";

const { width } = Dimensions.get("window");

const EditSearchModal = (props) => {
  const { theme, searchList, onPressCloseModal, visible } = props;

  const searchString = searchList.searchString;
  const guest = renderGuests(searchList.guests);
  const date =
    searchList.startDate && searchList.endDate
      ? changeFormat(searchList.startDate) +
        " - " +
        changeFormat(searchList.endDate)
      : localize.ADD_DATES;

  const navigation = useNavigation();
  const route = useRoute();

  const styles = getStyles(theme);

  const dateonPress = () => {
    onPressCloseModal();
    navigation.navigate("CalendarModal", {
      searchParams: searchList,
      referer: route.name,
    });
  };
  const guestonPress = () => {
    onPressCloseModal();
    navigation.navigate("GuestsModal", {
      searchParams: searchList,
      referer: route.name,
    });
  };
  const searchOnPress = () => {
    onPressCloseModal();
    navigation.navigate("AutoSuggestModal", {
      searchParams: searchList,
      referer: route.name,
    });
  };

  return (
    <Modal
      onSwipeComplete={onPressCloseModal}
      onBackdropPress={onPressCloseModal}
      isVisible={visible}
      swipeDirection="up"
      style={styles.container}
      animationIn="slideInDown"
      animationOut="slideOutUp"
      backdropOpacity={0}
    >
      <TouchableOpacity style={styles.header} onPress={onPressCloseModal}>
        <AppText preset="bodyBold" color={theme.colors.primaryForeground}>
          {localize.EDIT_SEARCH}
        </AppText>
        <Icon
          name="Cancel"
          type="local"
          size={iconSize.md}
          style={styles.closeIcon}
          color={theme.colors.primaryForeground}
        />
      </TouchableOpacity>

      <View style={styles.body}>
        <IconText
          icon="LocationOutlined"
          text={searchString}
          onPress={searchOnPress}
          iconColor={theme.colors.secondaryForegroundAccent}
        />

        <View style={styles.rowSection}>
          <IconText
            icon="Dates"
            text={date}
            onPress={dateonPress}
            containerStyle={{ flex: 1 }}
            iconColor={theme.colors.secondaryForegroundAccent}
          />

          <IconText
            icon="Person"
            text={guest}
            onPress={guestonPress}
            containerStyle={{ flex: 1 }}
            iconColor={theme.colors.secondaryForegroundAccent}
          />
        </View>
      </View>
    </Modal>
  );
};

export default EditSearchModal;

const getStyles = (theme) => {
  const isDark = theme.dark;
  const { primaryBackground: bg, secondaryBackground: sBg } = theme.colors;

  return StyleSheet.create({
    container: {
      position: "absolute",
      top: isAndroid ? 0 : margins.sm,
      left: -margins.lg + 5,
      width: width + 15,
      paddingTop: isAndroid ? padding.xsm : padding.lg,
      paddingHorizontal: padding.lg,
      paddingBottom: padding.xsm,
      backgroundColor: isDark ? bg : sBg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.headerBorder,
    },
    header: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    closeIcon: {
      position: "absolute",
      right: 0,
    },
    body: {
      marginTop: margins.lg,
      padding: padding.sm,
      borderRadius: radius.sm,
      overflow: "hidden",
      backgroundColor: theme.colors.searchItemsBg,
    },
    rowSection: {
      flexDirection: "row",
      marginTop: margins.md,
      justifyContent: "space-between",
    },
  });
};
