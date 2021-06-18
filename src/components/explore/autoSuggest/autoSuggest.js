import React from "react";
import { View, FlatList } from "react-native";
import AutoSuggestList from "./autoSuggestList";
import { withTheme } from "@common";

const AutoSuggest = (propss) => {
  const {
    theme,
    listToRender,
    searchParams,
    onItemPress,
    setIsLoading,
  } = propss;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={listToRender}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        // bounces={false}
        ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
        renderItem={({ item, index }) => (
          <AutoSuggestList
            index={index}
            item={item}
            theme={theme}
            setIsLoading={setIsLoading}
            searchParams={searchParams}
            onItemPress={onItemPress}
          />
        )}
        keyExtractor={(item, idx) => "" + idx}
      />
    </View>
  );
};

export default withTheme(AutoSuggest);
