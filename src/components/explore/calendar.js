import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import AppText from "../shared/Text";
import moment from "moment";
const { height, width } = Dimensions.get("window");

import { CalendarList } from "react-native-calendars";
import { withTheme, fontFamily, fontSize, margins } from "@common";
import { typography } from "../../common";

const daysName = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

const DaysList = (days) => {
  const { item, theme } = days;
  return (
    <AppText
      preset="smallMenu"
      color={theme.colors.grey}
      style={styles.weekDay}
    >
      {item}
    </AppText>
  );
};

const RNCalendar = (props) => {
  const { theme, onDatePress, datePeriod, date, disabledDates } = props;

  return (
    <View style={{ width: width, justifyContent: "center" }}>
      <View style={styles.daysName}>
        {daysName.map((day, idx) => (
          <DaysList key={"weekDays" + idx} item={day} theme={theme} />
        ))}
      </View>

      <CalendarList
        onScroll={(e) => props.onScroll(e.nativeEvent.contentOffset.y)} // pass props for calendar sticky header
        style={styles.calendar}
        current={
          date.startDate ? moment(date.startDate).format("YYYY-MM-DD") : null
        }
        pastScrollRange={0}
        minDate={new Date()}
        markingType={"period"}
        markedDates={{ ...datePeriod.period, ...disabledDates }}
        onDayPress={(_date) => {
          onDatePress(_date);
        }}
        horizontal={false}
        theme={{
          todayTextColor: theme.colors.brand,
          selectedDayBackgroundColor: theme.colors.brand,
          dateRangeBackground: theme.colors.darkHighLight,
          selectedDayTextColor: theme.colors.reverseText,
          calendarBackground: theme.colors.background,
          textDisabledColor: theme.colors.subtleGrey,
          dayTextColor: theme.colors.reverseText,
          textDayFontFamily: fontFamily.regular,
          textDayFontSize: fontSize.normal,
          textDayFontWeight: "500",
          "stylesheet.calendar.header": {
            header: {
              marginHorizontal: margins.xsm,
              marginTop: margins.md,
            },
            week: {
              height: 0,
            },
            monthText: {
              ...typography.bodyBold,
              color: theme.colors.reverseText,
            },
          },
          "stylesheet.calendar.day": {
            dayText: {
              fontWeight: "bold",
            },
          },
        }}
        hideArrows={true}
      />
    </View>
  );
};

export default withTheme(RNCalendar);

const styles = StyleSheet.create({
  calendar: {
    height: height / 1.4,
  },
  daysName: {
    margin: margins.md,
    marginBottom: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  weekDay: {
    width: 44,
    marginHorizontal: 6,
  },
});
