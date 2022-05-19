import { Platform } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import colors from './colors';

export default {
  colors,
  text: {
    marginHorizontal: 8,
    color: colors.black,
    fontSize: RFValue(16),
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
  },
};
