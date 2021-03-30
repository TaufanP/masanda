import {CompositeNavigationProp} from '@react-navigation/core';
import React, {FC} from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {routesName as r} from '../constants';

interface SplashProps {
  navigation: CompositeNavigationProp<any, any>;
}

const Splash: FC<SplashProps> = ({navigation}) => {
  return (
    <View style={{backgroundColor: 'purple', flex: 1}}>
      <TouchableOpacity
        onPress={() => navigation.navigate(r.HOME)}
        style={{
          width: 256,
          height: 50,
          backgroundColor: 'red',
        }}></TouchableOpacity>
    </View>
  );
};

export default Splash;
