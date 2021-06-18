import React from "react";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import { withTheme } from "@common";
import { Icon, AppText, LongButton } from "@components";
import localize from "@common/language/localizeController";
import { margins, padding, radius } from "@common";

const ReviewsList = (props) => {
  const { item, theme, onPress } = props;
  const { colors } = theme;

  return (
    <View style={[styles.listingsView, { backgroundColor: colors.reviewBg }]}>
      <AppText preset="bodyProminent">{item.name}</AppText>
      <AppText
        style={{
          marginTop: margins.xss / 2,
          marginLeft: -margins.xxs,
          color: colors.subtleGrey,
        }}
      >
        {item.review_date}
      </AppText>
      <View>
        <AppText
          numberOfLines={4}
          style={{ height: 88, marginTop: margins.sm }}
        >
          {item.text}
        </AppText>
      </View>

      <TouchableOpacity
        onPress={() => onPress(item)}
        style={styles.readMoreView}
      >
        <AppText
          preset="bodyProminent"
          style={{
            marginHorizontal: margins.xssm,
            color: colors.darkGrey,
          }}
        >
          {localize.READ_MORE}
        </AppText>
        <Icon size={14} color={colors.darkGrey} name="ForwardArrow" />
      </TouchableOpacity>
    </View>
  );
};

const ListingReviews = (superProps) => {
  const {
    theme,
    listToRender,
    style,
    onButtonPress,
    onReadMorePress,
    contentCntrStyle,
  } = superProps;
  const { colors } = theme;

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.headingView, { marginHorizontal: margins.md }]}>
        <View
          style={[
            styles.ratingsView,
            { backgroundColor: colors.reversePrimaryBg },
          ]}
        >
          <AppText preset="bodyBold" color={colors.reversePrimaryFg}>
            {listToRender.avg_primary_rating}
          </AppText>
        </View>
        <AppText
          preset="bodyBold"
          style={{
            paddingLeft: padding.xs,
            paddingRight: padding.xxs,
          }}
        >
          Great
        </AppText>
        <AppText preset="bodyBold" color={colors.subtleGrey}>
          (90 ratings)
        </AppText>
      </View>
      <FlatList
        data={listToRender.reviews}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        // ItemSeparatorComponent={() => <View style={{ width: margins.sm }} />}
        contentContainerStyle={[
          styles.reviewsListContainer,
          { ...contentCntrStyle },
        ]}
        ListHeaderComponent={() => <View style={{ width: margins.sm }} />}
        renderItem={({ item, index }) => (
          <ReviewsList
            index={index}
            item={item}
            theme={theme}
            onPress={onReadMorePress}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={{ marginHorizontal: margins.md }}>
        <LongButton
          style={{
            marginTop: margins.xs,
          }}
          title={localize.SHOW_ALL_REVIEWS}
          icon="reviews"
          onPress={onButtonPress}
        />
      </View>
    </View>
  );
};

export default withTheme(ListingReviews);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingView: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingsView: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius.smx,
    height: 38,
    width: 38,
  },
  reviewsListContainer: {
    // marginTop: margins.sm,
  },
  listingsView: {
    // height: 224,
    borderRadius: radius.mdx,
    padding: padding.sm,
    marginVertical: margins.sm,
    marginHorizontal: margins.xs,
    width: 296,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    elevation: 4,
  },
  readMoreView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: margins.sm,
  },
});
