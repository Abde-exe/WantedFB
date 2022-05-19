import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../config/colors';

const DetailsText = ({ text, subText, other = '' }) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        width: '50%',
      }}
    >
      <Text style={styles.subText}>{subText}</Text>
      <Text style={styles.text}>{`${text}${other}`}</Text>
    </View>
  );
};

export default DetailsText;

const styles = StyleSheet.create({
  text: {
    flexWrap: 'wrap',
    width: '90%',
    fontSize: 16,
    color: colors.black,
    fontWeight: '400',
  },
  subText: {
    marginTop: 8,
    fontSize: 20,
    color: colors.accent,
  },
});
