import React, { useState } from "react";
import { View, FlatList } from "react-native";
import PlaceHolder from "../../shared/placeHolder";
import SearchList from "./searchList";
import { withTheme, padding } from "@common";

const SearchResultsList = React.forwardRef((props, ref) => {
  const {
    data,
    days,
    theme,
    onPress,
    cntrStyle,
    listStyle,
    horizontal,
    contentCntrStyle,

    onNextPage = () => {},
    ...scrollViewProps
  } = props;

  const [onEndReached, setOnEndReached] = useState(false);

  return (
    <View style={cntrStyle}>
      <FlatList
        ref={ref}
        {...scrollViewProps}
        data={data}
        style={listStyle}
        horizontal={horizontal}
        contentContainerStyle={{ ...contentCntrStyle }}
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: horizontal ? padding.sm : 0,
              height: !horizontal ? padding.xxl : 0,
            }}
          />
        )}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <SearchList
            onPress={onPress}
            nrOfDays={days}
            theme={theme}
            index={index}
            item={item}
          />
        )}
        ListFooterComponent={<View style={{ height: 100 }} />}
        ListEmptyComponent={<PlaceHolder />}
        keyExtractor={(item, idx) => "" + idx}
        onEndReached={() => {
          console.log("on End Readed");
          setOnEndReached(true);
        }}
        onMomentumScrollEnd={() => {
          console.log("on Momentum Scroll End");
          if (onEndReached) {
            // onNextPage();
            setOnEndReached(false);
          }
        }}
      />
    </View>
  );
});

export default withTheme(SearchResultsList);
