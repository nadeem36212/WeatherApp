import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import {
  withTheme,
  changeFormat,
  renderGuests,
  // renderRooms,
  normalizeX,
  normalizeY,
} from "@common";
import { Dates, Person } from "@ImagesNew";
import AppText from "../shared/Text";

const DatesAndGuests = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { theme, type, searchQuery, onDatePress, onGuestPress } = props;
  const { colors } = theme;
  const selectedDates =
    changeFormat(searchQuery.startDate) +
    " - " +
    changeFormat(searchQuery.endDate);
  const selectedGuests = renderGuests(searchQuery.guests);
  // const rooms = renderRooms(searchQuery.rooms);

  return (
    <View
      style={{
        ...styles.dateAndPersonsView,
        backgroundColor: colors.shadeGrey,
      }}
    >
      <TouchableOpacity onPress={onDatePress} style={styles.dateView}>
        <Dates style={{ color: colors.reverseDarkGrey }} />
        <AppText style={{ marginStart: 5 }}>{selectedDates}</AppText>
      </TouchableOpacity>
      <TouchableOpacity onPress={onGuestPress} style={styles.dateView}>
        <Person style={{ color: colors.reverseDarkGrey }} />
        <AppText style={{ marginStart: 5 }}>
          {selectedGuests}
          {/* {rooms} */}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dateAndPersonsView: {
    flexDirection: "row",
    alignItems: "center",
    height: normalizeY(37),
    paddingHorizontal: normalizeX(10),
    borderRadius: 16,
    marginTop: normalizeY(20),
  },
  dateView: {
    flexDirection: "row",
    flex: 0.5,
    alignItems: "center",
  },
});

export default withTheme(DatesAndGuests);
