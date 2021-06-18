import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  View,
  Modal,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import TextInput from "./TextInput";
import AppText from "../shared/Text";
import { padding, radius, typography, margins } from "@common";

const OptionItem = ({
  color,
  title,
  onPress,
  itemContainerStyle,
  itemTextStyle,
}) => (
  <TouchableOpacity
    style={{ ...styles.optionItem, ...itemContainerStyle }}
    onPress={onPress}
  >
    <AppText style={itemTextStyle}>{title}</AppText>
  </TouchableOpacity>
);

const ModalListSelect = (props) => {
  const {
    options,
    defaultValue,
    placeholder,
    placeholderColor,
    searchPlaceholder,
    cancelText,
    emptyListText,
    forwardedRef,

    theme,
    labelTextStyle,
    labelContainerStyle,
    overlayStyle,
    listContainerStyle,
    searchBarStyle,
    searchInputStyle,
    searchInputCtrStyle,
    cancelTextStyle,
    optionListStyle,
    optionItemTextStyle,
    optionItemContainerStyle,

    onSubmitEditing,
  } = props;

  const {
    borderColor: bdColor,
    overlayColor: olyColor,
    primaryBackground: pbg,
    secondaryBackgroundAccent: sbga,
    primaryForeground: pfg,
    secondaryForeground: sfg,
  } = theme.colors;

  const ref = useRef(null);

  const [selected, setSelected] = useState(defaultValue);
  const [visible, setVisible] = useState(false);
  const [opts, setOpts] = useState(options);

  useEffect(() => {
    forwardedRef(ref.current);
  }, [ref, forwardedRef]);

  const onListOpen = () => {
    setVisible(true);
    setOpts(options);
  };

  const onSearch = (text) => {
    if (text.length > 0) {
      let filtered = options.filter((v) => v.name.includes(text));

      setOpts(filtered);
    } else {
      setOpts(options);
    }
  };

  const onItemSelect = (item, idx) => {
    setSelected(item.id);
    setVisible(false);
    ref.current.setValue(item.id);
    if (typeof onSubmitEditing === "function") onSubmitEditing(item.id);
  };

  const renderItem = ({ item, index }) => (
    <OptionItem
      title={item.name}
      itemTextStyle={optionItemTextStyle}
      itemContainerStyle={optionItemContainerStyle}
      onPress={() => onItemSelect(item, index)}
    />
  );

  const renderSelectedOrPlaceholder = useCallback(() => {
    if (selected) {
      let slt = options.find((v) => v.id === "" + selected);
      return slt ? slt.name : placeholder;
    } else {
      return placeholder;
    }
  }, [selected, options, placeholder]);

  return (
    <View>
      <TextInput
        forwardedRef={ref}
        placeholder="country"
        containerStyle={{ height: 0, width: 0 }}
        value={"" + selected}
        disabled
      />
      {!visible && (
        <TouchableOpacity
          onPress={onListOpen}
          style={{ ...styles.labelContainer, ...labelContainerStyle }}
        >
          <AppText
            style={{
              ...labelTextStyle,
              color: placeholderColor,
            }}
          >
            {renderSelectedOrPlaceholder()}
          </AppText>
        </TouchableOpacity>
      )}
      {visible && (
        <Modal animationType="slide" transparent={true} visible={visible}>
          <View
            style={{
              ...styles.overlay,
              backgroundColor: olyColor,
              ...overlayStyle,
            }}
          />
          <View
            style={{
              ...styles.listContainer,
              backgroundColor: pbg,
              ...listContainerStyle,
            }}
          >
            <View
              style={{
                ...styles.searchBar,
                borderColor: bdColor,
                ...searchBarStyle,
              }}
            >
              <TextInput
                placeholder={searchPlaceholder}
                placeholderColor={placeholderColor || sfg}
                selectionColor={theme.colors.brand}
                onChangeText={onSearch}
                containerStyle={{
                  ...styles.searchInputCtr,
                  backgroundColor: sbga,
                  ...searchInputCtrStyle,
                }}
                style={{
                  ...styles.searchInput,
                  color: sfg,
                  ...searchInputStyle,
                }}
              />
              <TouchableOpacity onPress={() => setVisible(false)}>
                <AppText
                  style={{
                    ...styles.cancelBtn,
                    color: pfg,
                    ...cancelTextStyle,
                  }}
                >
                  {cancelText}
                </AppText>
              </TouchableOpacity>
            </View>
            <FlatList
              data={opts}
              style={{ ...styles.optionList, ...optionListStyle }}
              renderItem={renderItem}
              scroll
              ListEmptyComponent={
                <AppText
                  style={{
                    ...styles.optionItem,
                    color: pfg,
                  }}
                >
                  {emptyListText}
                </AppText>
              }
              keyExtractor={(opt) => "" + opt.id}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

export default ModalListSelect;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    opacity: 0.4,
  },
  listContainer: {
    marginTop: margins.header,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    flex: 1,
  },
  labelContainer: {
    paddingVertical: padding.xs,
  },
  labelText: {
    ...typography.inputText,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    paddingTop: padding.lg,
    paddingBottom: padding.xsm,
    paddingHorizontal: padding.md,
  },
  searchInputCtr: {
    flex: 2,
    paddingVertical: padding.xs,
    paddingHorizontal: padding.md,
    borderRadius: radius.sm,
    marginRight: margins.xs,
  },
  searchInput: {
    ...typography.body,
  },
  optionList: {
    paddingTop: 0,
    padding: padding.md,
  },
  optionItem: {
    marginTop: margins.xsm,
    marginBottom: margins.xsm,
  },
});
