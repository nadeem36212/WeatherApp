import React from "react";
import localize from "@common/language/localizeController";
import { View, FlatList } from "react-native";
import RecentHistoryList from "./recentHistoryList";
import { withTheme, margins } from "@common";

const RecentHistory = (propss) => {
  const {
    theme,
    onItemPress,
    listToRender,
    usersLocation,
    defaultSearchParams,
  } = propss;
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        // bounces={false}
        data={listToRender}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, idx) => "" + idx}
        ItemSeparatorComponent={() => <View style={{ height: margins.lg }} />}
        ListHeaderComponent={() =>
          usersLocation.data &&
          (usersLocation.data.city ||
            usersLocation.data.country ||
            usersLocation.data.state) ? (
            <RecentHistoryList
              index={0}
              theme={theme}
              iconName="LocationFilled"
              onItemPress={onItemPress}
              defaultSearchParams={defaultSearchParams}
              item={{ searchString: localize.SEARCH_NEAR_BY }}
            />
          ) : null
        }
        renderItem={({ item, index }) => (
          <RecentHistoryList
            item={item}
            index={index}
            theme={theme}
            onItemPress={onItemPress}
            iconName="ClockFilled"
          />
        )}
      />
    </View>
  );
};

export default withTheme(RecentHistory);
