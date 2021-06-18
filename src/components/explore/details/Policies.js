import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import localize from "@common/language/localizeController";
import { AppText, PolicyItem } from "../..";
import { withTheme, margins } from "@common";

const Policies = (props) => {
  const { theme, data, style } = props;
  const { colors } = theme;

  const renderPolicy = (policy) => {
    return (
      <View style={styles.policyView}>
        <AppText preset="bodyBold" color={colors.primaryForeground}>
          {policy.title}
        </AppText>
        <PolicyItem policies={policy.description} />
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <AppText preset="smallHeader" color={colors.primaryForeground}>
        {localize.ACCOMODATION_POLICIES}
      </AppText>
      <FlatList
        data={data}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => renderPolicy(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  policyView: {
    marginTop: margins.sm,
  },
});

export default withTheme(Policies);
