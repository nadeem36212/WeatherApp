import React from "react";
import { withTheme, iconSize, margins, typography, getViewport } from "@common";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Highlighter from "react-native-highlight-words";
import AppText from "../../shared/Text";
import Icon from "../../shared/Icon";

const ICONS = {
  City: "LocationFilled",
  POI: "PoiFilled",
  Airport: "AirportFilled",
  Hotel: "BedFilled",
};

const COUNTRY = "Country";

const AutoSuggestList = (props) => {
  const { theme, item, index, searchParams, onItemPress, setIsLoading } = props;
  const { _source } = item;

  const iconName = () => {
    if (ICONS.hasOwnProperty(_source.type)) {
      return ICONS[_source.type];
    } else {
      return "LocationFilled";
    }
  };

  const _onItemPress = async () => {
    setIsLoading(true);

    let ss = _source.name;
    if (_source.type !== COUNTRY) {
      if (_source.state !== _source.name && _source.state !== "") {
        ss = ss + ", " + _source.state;
      }
      if (_source.country !== "") {
        ss = ss + ", " + _source.country;
      }
    }

    const viewport = await getViewport(ss);

    const params = {
      ...searchParams,
      searchString: ss,
      viewport,
      item: item,
    };
    setIsLoading(false);

    if (typeof onItemPress === "function") onItemPress(params);
  };

  const renderSubTitle = () => {
    if (_source.type === COUNTRY) return null;

    return (
      <AppText
        preset="subhead"
        style={styles.address}
        color={theme.colors.darkGrey}
      >
        {_source.state !== "" ? _source.state : ""}
        {_source.state !== "" && _source.country ? ", " : ""}
        {_source.country !== "" ? _source.country : ""}
      </AppText>
    );
  };

  return (
    <TouchableOpacity
      key={index}
      onPress={() => _onItemPress()}
      style={{
        marginTop: index === 0 ? margins.lg : 0,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Icon
        type="local"
        name={iconName()}
        size={iconSize.md}
        color={theme.colors.subtleGrey}
        style={{ marginRight: margins.xsm }}
      />
      <View style={styles.addressView}>
        <Highlighter
          style={[styles.country, { color: theme.colors.reverseText }]}
          highlightStyle={{ fontWeight: "600" }}
          searchWords={[searchParams?.searchString]}
          textToHighlight={_source.name}
        />
        {renderSubTitle()}
      </View>
      <Icon
        type="local"
        name="ForwardArrow"
        color={theme.colors.subtleGrey}
        // size={iconSize}
      />
    </TouchableOpacity>
  );
};
export default withTheme(AutoSuggestList);

const styles = StyleSheet.create({
  addressView: {
    flex: 1,
  },
  iconView: {
    justifyContent: "center",
  },
  country: {
    flexWrap: "wrap",
    ...typography.body,
  },
  address: {
    marginTop: 2,
  },
});
