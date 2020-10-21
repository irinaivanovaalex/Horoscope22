import * as React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import {
  useNavigationBuilder,
  DefaultNavigatorOptions,
  TabRouter,
  TabRouterOptions,
  TabNavigationState,
  createNavigatorFactory,
} from '@react-navigation/native';
import { TabBar } from './TabBar';


type TabNavigationConfig = {
  tabBarStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  colorActive?: string,
  colorInactive?: string,
  animationbutton?: 'top' | 'bottom'
  speed: 100 | 150| 200 | 250 | 300 | number 
};
type TabNavigationOptions = {
  title?: string;
};
type TabNavigationEventMap = {
  tabPress: {
    data: { isAlreadyFocused: boolean }
    canPreventDefault: true
  };
};

type Props = DefaultNavigatorOptions<TabNavigationOptions> &
  TabRouterOptions &
  TabNavigationConfig;


function TabNavigator({
  initialRouteName,
  children,
  screenOptions,
  colorActive,
  colorInactive,
  animationbutton,
  speed
}: Props) {
  const { state, navigation, descriptors } = useNavigationBuilder<
    TabNavigationState,
    TabRouterOptions,
    TabNavigationOptions,
    TabNavigationEventMap
  >(TabRouter, {
    children,
    screenOptions,
    initialRouteName,
  });
  return (
    <React.Fragment>
      <View style={[{ flex: 1 }]}>
        {descriptors[state.routes[state.index].key].render()}
      </View>
      <View style={[StyleSheet.absoluteFill, { justifyContent: 'flex-end' }]}>
        <TabBar 
        state={state} 
        navigation={navigation} 
        colorActive={colorActive} 
        colorInactive={colorInactive} 
        animationbutton={animationbutton} 
        speed={speed}
        />
      </View>
    </React.Fragment>
  );
}

export default createNavigatorFactory<
  TabNavigationState,
  TabNavigationOptions,
  TabNavigationEventMap,
  typeof TabNavigator
>(TabNavigator);

export const createMyNavigator = createNavigatorFactory(TabNavigator);
