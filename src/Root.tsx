import {NavigationContainer} from '@react-navigation/native';
import React, {FC} from 'react';
import {MainRoute} from './routes';

interface RootProps {
  //
}

const Root: FC<RootProps> = props => {
  return (
    <NavigationContainer>
      <MainRoute />
    </NavigationContainer>
  );
};

export default Root;
