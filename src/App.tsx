/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { GoroskopScreen } from './screen/GoroskopScreen';
import { ProfileScreen } from './screen/ProfileScreen';
import { createMyNavigator } from './component/navigation/CustomBar';
import { observer } from 'mobx-react';
import { CompatibilityScreen } from './screen/CompatibilityScreen';

const My = createMyNavigator()

const App = observer(() => {
  return (
    <>
      <NavigationContainer>
        <My.Navigator colorActive="#000" colorInactive='grey' animationbutton='bottom' speed={100}>
          <My.Screen name='grid' component={ProfileScreen} />
          <My.Screen name='heart' component={CompatibilityScreen} />
        </My.Navigator>
      </NavigationContainer>
    </>
  );
})


export default App;
