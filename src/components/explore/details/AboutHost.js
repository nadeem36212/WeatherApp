import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { margins, withTheme, stripHTML } from "@common";
import { ForwardArrow } from "@ImagesNew";
import AppText from "../../shared/Text";
import localize from "@common/language/localizeController";
import { useNavigation } from "@react-navigation/native";

const AboutHost = (props) => {
  const { theme, style, about_host } = props;
  const { colors } = theme;

  const navigation = useNavigation();

  return (
    <View style={style}>
      <AppText preset="smallHeader">{localize.ABOUT_HOST}</AppText>
      <View style={styles.nameAndImageView}>
        <View>
          <AppText>{about_host.name}</AppText>
          <AppText style={{ marginTop: margins.xs }} color={colors.subtleGrey}>
            Joined in {about_host.join_in}
          </AppText>
        </View>
        <Image style={styles.image} source={{ uri: about_host.img }} />
      </View>
      <AppText numberOfLines={5}>
        {about_host.desc ? stripHTML(about_host.desc) : ""}
      </AppText>
      {about_host.desc.length > 100 && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Description", { desc: about_host.desc })
          }
          style={styles.readMoreView}
        >
          <AppText preset="bodyProminent" color={colors.darkGrey}>
            {localize.READ_MORE}
          </AppText>
          <ForwardArrow style={{ color: colors.darkGrey }} />
        </TouchableOpacity>
      )}
      {/* <LongButton
        style={{ marginTop: normalizeY(25) }}
        title="Contact host"
        icon="contact"
        onPress={() => navigation.navigate("ContactHost")}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  nameAndImageView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: margins.sm,
  },
  image: {
    height: 64,
    width: 64,
    borderRadius: 16,
  },
  readMoreView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 9,
  },
});

export default withTheme(AboutHost);
