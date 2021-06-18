import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import AppText from "../../shared/Text";
import { withTheme, margins, spacing } from "@common";
import PrevSearchList from "./prevSearchList";
import localize from "@common/language/localizeController";

const PrevSearches = (props) => {
  const { theme, prevSearches, onPress } = props;
  return (
    <>
      {prevSearches.length !== 0 ? (
        <View style={styles.container}>
          <AppText
            preset="header"
            color={theme.colors.primaryForeground}
            style={{ marginLeft: margins.md }}
          >
            {localize.PREV_SEARCHES}
          </AppText>
          <FlatList
            data={prevSearches}
            contentContainerStyle={styles.list}
            horizontal={true}
            ListHeaderComponent={() => <View style={{ width: margins.md }} />}
            ItemSeparatorComponent={() => (
              <View style={{ width: spacing.xsm }} />
            )}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, idx) => "" + idx}
            renderItem={({ item, index }) => (
              <PrevSearchList
                index={index}
                length={prevSearches.length}
                item={item}
                theme={theme}
                onPress={onPress}
              />
            )}
          />
        </View>
      ) : null}
    </>
  );
};

export default withTheme(PrevSearches);

const styles = StyleSheet.create({
  container: {
    marginTop: margins.md,
    marginBottom: margins.md,
  },
  list: { marginTop: margins.sm },
});
