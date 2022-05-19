import React from 'react';
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import colors from '../../config/colors';
import AppButton from './AppButton';
import AppText from './AppText';

export default function ProfileComponent({
  title,
  subTitle,
  image,
  onPress,
  renderRightActions,
  buttonTitle,
  buttonAction,
  style2,
}) {
  return (
    <View>
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableHighlight onPress={onPress}>
          <View style={[styles.container, style2]}>
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <View style={{ marginLeft: 10, alignItems: 'flex-start', flex: 1 }}>
              <AppText style2={styles.title}>{title}</AppText>
              {subTitle && (
                <AppText style2={styles.subTitle}>{subTitle}</AppText>
              )}
            </View>
            {buttonTitle && (
              <View style={{ alignSelf: 'flex-end' }}>
                <AppButton title={buttonTitle} onPress={buttonAction} />
              </View>
            )}
          </View>
        </TouchableHighlight>
      </Swipeable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  title: {
    fontWeight: '700',
    color: colors.black,
  },
  subTitle: {
    color: colors.black,
    fontSize: 15,
  },
});
