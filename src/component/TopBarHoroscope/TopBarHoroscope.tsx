import { observer } from 'mobx-react'
import React from 'react'
import { StyleProp, ViewStyle, View, Platform, StyleSheet, Image, Text } from 'react-native'
import { screenWidth } from '../../screen/GoroskopScreen'
import { storeHoroscope } from '../store/StoreHoroscope'
import { strings } from '../Strings'

interface TopBarHoroscopeProps {
  style?: StyleProp<ViewStyle>
}

export const TopBarHoroscope: React.FC<TopBarHoroscopeProps> = observer(props => {

  return  <View style={styles.conteinerMain}>
  <View style={styles.textContainer}>
    <Text style={styles.description} numberOfLines={2}>{strings.horoscope}</Text>
  </View>
  <View style={styles.topBar} >
    <Image
      source={storeHoroscope.zodiacSing?.emoji}
      style={styles.image}
      resizeMode="stretch"
      resizeMethod="scale"
    />
  </View>
</View>

})
const styles = StyleSheet.create({
    
    topBar: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      height: 75,
    },
    conteinerMain: {
      padding: 1,
      marginTop: 25,
      marginBottom: -5,
      margin: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'space-between',
  
    },
    conteiner: {
      padding: 1,
      margin: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'space-between'
    },
    textContainer: {
      flex: 1,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    description: {
      textAlign: 'center',
      fontSize: 30,
      color: '#e6e4e2',
      fontFamily: 'Montserrat-SemiBold',
  
    },
    image: {
      alignSelf: 'center',
      alignContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 150,
    }
  })
  