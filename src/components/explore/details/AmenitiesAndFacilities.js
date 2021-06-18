import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { margins, spacing, withTheme } from "@common";
import AppText from "../../shared/Text";
import { ForwardArrow } from "@ImagesNew";
import localize from "@common/language/localizeController";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";

const FACILITY = "facility";
const AMENITY = "amenity";

const AmenitiesAndFacilities = (props) => {
  const { theme, ctnStyle, services, serviceType, showTitle = true } = props;
  const { colors } = theme;
  const navigation = useNavigation();

  const navigateToAmenities = () => {
    navigation.navigate("AmenitiesList", {
      services,
      serviceTitle:
        serviceType === AMENITY ? localize.AMENITIES : localize.FACILITIES,
    });
  };

  const renderAmenity = (item) => (
    <View style={styles.amenityView}>
      <AppText color={theme.colors.primaryForeground}>{item.name}</AppText>
    </View>
  );

  const renderAmenitiesFooter = () => {
    if (services.length <= 3) return null;
    return (
      <TouchableOpacity onPress={navigateToAmenities} style={styles.footerView}>
        <AppText preset="bodyProminent" color={colors.darkGrey}>
          {localize.SHOW_ALL} {services.length}{" "}
          {serviceType === FACILITY
            ? localize.SERVICE_AND_FACILITY.toLowerCase()
            : localize.AMENITIES.toLowerCase()}
        </AppText>
        <ForwardArrow style={{ color: colors.darkGrey }} />
      </TouchableOpacity>
    );
  };

  if (services.length === 0) return null;

  return (
    <View style={ctnStyle}>
      {showTitle && (
        <View style={{ marginBottom: margins.sm }}>
          {serviceType === FACILITY ? (
            <AppText preset="bodyBold">{localize.SERVICE_AND_FACILITY}</AppText>
          ) : (
            <AppText preset="bodyBold">{localize.AMENITIES}</AppText>
          )}
        </View>
      )}
      <FlatList
        data={services.slice(0, 3)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderAmenity(item)}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        ListFooterComponent={renderAmenitiesFooter}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <AppText
            color={theme.colors.primaryForeground}
            style={{
              marginTop: margins.sm,
            }}
          >
            {serviceType === FACILITY
              ? localize.NO_FACILITIES
              : localize.NO_AMENITIES}
          </AppText>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  amenityView: {},
  footerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: margins.sm,
  },
});

AmenitiesAndFacilities.propTypes = {
  serviceType: PropTypes.oneOf([FACILITY, AMENITY]),
};

export default withTheme(AmenitiesAndFacilities);
