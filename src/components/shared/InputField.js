import React from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  View,
} from 'react-native';
import { withTheme, fontFamily } from '@common';
import { normalizeY, normalizeX, normalizeFont } from '../../common/utils';
import Icon from './Icon';

const InputField = (props) => {

  const { colors } = props.theme;
  const {
    autoCapitalize = 'none',
    autoCorrect = false,
    inputStyle,
    containerStyle,
    placeholderColor = colors.subtleGrey,
    returnKeyType = 'next'
  } = props;

  return (
    <View style={{ ...styles.container, backgroundColor: colors.shadeGrey, ...containerStyle }}>
      <Icon type="local" name="Contact" color={colors.reverseDarkGrey} />
      <RNTextInput
        {...props}
        autoCorrect={autoCorrect}
        placeholderTextColor={placeholderColor}
        autoCapitalize={autoCapitalize}
        returnKeyType={returnKeyType}
        style={{ ...styles.textInput, ...inputStyle }}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: normalizeY(45),
    borderRadius: 16,
    paddingHorizontal: normalizeX(15)
  },
  textInput: {
    flex: 1,
    fontSize: normalizeFont(13),
    paddingStart: normalizeX(15),
    height: '100%',
    fontFamily: fontFamily.regular
  },
});

export default withTheme(InputField);
