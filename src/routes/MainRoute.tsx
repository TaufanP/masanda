import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React, { FC } from "react";
import { Home, Splash, Editing, Scanner } from "../screen";
import { routesName } from "../constants";

const Stack = createStackNavigator();

interface MainRouteProps {
  //
}

const MainRoute: FC<MainRouteProps> = (props) => {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        gestureEnabled: true,
        cardOverlayEnabled: true,
        headerStatusBarHeight:
          navigation.dangerouslyGetState().routes.indexOf(route) > 0
            ? 0
            : undefined,
        ...TransitionPresets.SlideFromRightIOS,
      })}
      mode="card"
      initialRouteName={routesName.SPLASH}
    >
      <Stack.Screen name={routesName.SPLASH} component={Splash} />
      <Stack.Screen name={routesName.HOME} component={Home} />
      <Stack.Screen name={routesName.EDITING} component={Editing} />
      <Stack.Screen name={routesName.SCANNER} component={Scanner} />
    </Stack.Navigator>
  );
};

export default MainRoute;
