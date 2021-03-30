import {CompositeNavigationProp} from '@react-navigation/core';
import React, {FC} from 'react';
import {View} from 'react-native';

interface HomeProps {
  navigation: CompositeNavigationProp<any, any>;
}

const Home: FC<HomeProps> = () => {
  return <View style={{backgroundColor: 'green', flex: 1}}></View>;
};

export default Home;
