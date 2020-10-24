/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { GoroskopScreen } from './screen/GoroskopScreen';
import { ProfileScreen } from './screen/ProfileScreen';
import { createMyNavigator } from './component/navigation/CustomBar';
import { observer } from 'mobx-react';
import { CompatibilityScreen } from './screen/CompatibilityScreen';
import { storeHoroscope } from './component/store/StoreHoroscope';

const My = createMyNavigator()

const App = observer(() => {
  useEffect(() => {
    storeHoroscope.init()
  }, [])
  return (
    <>
      <NavigationContainer>
        <My.Navigator colorActive="white" colorInactive='white' animationbutton='top' speed={100}>
          <My.Screen name='eye' component={ProfileScreen} />
          <My.Screen name='heart' component={CompatibilityScreen} />
        </My.Navigator>
      </NavigationContainer>
    </>
  );
})


export default App;
