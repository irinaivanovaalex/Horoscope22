import React, { useState, useRef, useEffect, DependencyList } from 'react'
import { StyleProp, ViewStyle, View, StyleSheet, Platform, Text, Image, TextInput, StatusBar, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import DatePicker from 'react-native-datepicker'
import { screenWidth, screenHeight } from './GoroskopScreen'
import { getZodiacSign, ZodiacName, ZodiacSigns } from './zodiac/ZodiacSign'
import moment from 'moment'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { CarouselHoroscope } from './CarouselHoroscope'
import { setUpdateIntervalForType, SensorTypes } from "react-native-sensors"
import { fetchHoroscope } from '../component/fetchHoroscope'
import { AnimatedView } from '../component/animatedComponent/AnimatedView'
import { getDataDate, getDataName, storeDataDate, storeDataName } from '../component/Store'
import { CarouselHoroscopeCompatibility } from './CarouselHoroscopeCompatibility'
import { FlatlistCompatibility } from '../component/compatibility/FlatlistCompatibility'
import { strings } from '../component/Strings'
import { storeHoroscope } from '../component/store/StoreHoroscope'
import { observer } from 'mobx-react'
import { entriesList } from '../component/store/StoreEntries'



export type EntriesType = {
  id: string;
  description: string | Promise<String>;
  date: string;
  subtitle?: string;
  illustration?: string;
}

interface ProfileScreenProps {
  style?: StyleProp<ViewStyle>

}

setUpdateIntervalForType(SensorTypes.accelerometer, 32)

// export function useAsync<T>(deferred: () => Promise<T>, deps: DependencyList) {
//   useEffect(() => {
//     async function go() {
//       deferred()
//     }
//     go()
//   }, deps)
// }

export const ProfileScreen: React.FC<ProfileScreenProps> = observer(props => {

  const [value, onChangText] = useState('Your Name')
  useEffect(() => {
    getDataName().then(onChangText)
    storeHoroscope.init()
  }, [])
  const scrollRef = useRef<KeyboardAwareScrollView>(null)

  return (
    <>

      <LinearGradient
        colors={['#303f52', '#333132']}
        style={styles.linearGradient}
      >
        <StatusBar
          translucent={true}
          backgroundColor={'rgba(0, 100, 0, 0)'}
        />
        <View style={styles.conteinerTopBar}>
          <Image
            source={require('../component/image/space3.jpg')}
            blurRadius={0.1}
            style={{
              alignSelf: 'center',
              alignContent: 'center',
              position: 'absolute',
              opacity: 0.3,
              transform: [{
                rotate: '90deg',

              },
              {
                translateX: -30,
              }]
            }}
          />
          {/* <AnimatedView /> */}

          <View style={styles.conteinerMain}>

            <View style={styles.textContainer}>
              <Text style={styles.description} numberOfLines={2}>{strings.horoscope}</Text>
            </View>

            <View style={styles.topBar} >
              <Image
                source={storeHoroscope.zodiacSing?.emoji}
                style={{
                  alignSelf: 'center',
                  alignContent: 'center',
                  width: 50,
                  height: 50,
                  borderRadius: 150,
                }}
                resizeMode="stretch"
                resizeMethod="scale"
              />
            </View>
          </View>

        </View>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          ref={scrollRef}
          bouncesZoom={true}
          style={{
            paddingBottom: 15,
          }}
        >
          <View style={styles.conteinerTopBar}>
            <View style={styles.conteiner}>
              <Text style={styles.symbol}>{strings.name}</Text>
              <TextInput
                style={styles.textInput}
                value={value}
                onChangeText={value => {
                  onChangText(value)
                  storeDataName(value)

                }}

              />
            </View>
            <View style={styles.conteiner}>
              <Text style={styles.symbol}>{strings.birhday}</Text>
              <DatePicker
                date={storeHoroscope.dateBirthday}
                mode="date"
                format="DD-MM-YYYY"
                minDate="01-05-1900"
                maxDate={new Date()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                androidMode="spinner"
                showIcon={false}
                allowFontScaling={true}

                style={{

                }}
                customStyles={{
                  dateText: {
                    fontFamily: 'Montserrat-Light',
                    fontSize: 18,
                    color: '#e6e4e2'
                  },
                  dateIcon: {
                    left: 0,
                    top: 0,
                    marginLeft: 0,
                  },
                  dateInput: {
                    borderWidth: 0,
                    marginEnd: 1,
                    alignItems: 'flex-end',

                  },

                }}
                onDateChange={async (dateStr, date) => {
                  storeHoroscope.changeDateBirthday(date)
                }}
              >
              </DatePicker>
            </View>
          </View>
          <View style={styles.carousel}>
            <CarouselHoroscope
              description={strings.finance}
              entriesCarousel={entriesList.entriesCareer}
              animationLoad={storeHoroscope.animationFinance}
            />
            <CarouselHoroscope
              description={strings.standart}
              entriesCarousel={entriesList.entries}
              animationLoad={storeHoroscope.animationStandart}
            />
            <CarouselHoroscope
              description={strings.romantic}
              entriesCarousel={entriesList.entriesLove}
              animationLoad={storeHoroscope.animationLove}
            />

          </View>
        </KeyboardAwareScrollView>
      </LinearGradient>
    </>

  )
})


const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  textTitle: {
    fontSize: 15,
    fontFamily: 'Montserrat-Light',
    color: '#e6e4e2',
    paddingBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  conteinerTopBar: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
  },
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
  symbol: {
    fontSize: 18,
    justifyContent: 'flex-start',
    color: '#e6e4e2',
    alignSelf: 'center',
    alignItems: 'flex-start',
    paddingTop: 4,
    fontFamily: 'Montserrat-Light',
  },
  item: {
    width: screenWidth - 100,
    height: screenWidth - 100,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }),
    backgroundColor: 'rgba(230, 228, 226, 0.25)',
    borderRadius: 8,
  },

  textInput: {
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 5,
    alignContent: 'flex-end',
    textAlign: 'right',
    flexGrow: 1,
    color: '#e6e4e2',
    fontSize: 18,
    fontFamily: 'Montserrat-Light',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
  },
  carousel: {
    marginTop: 20,
    flexDirection: 'column',

  },
  button: {
    width: screenWidth - 100,
    height: screenWidth / 7,
    backgroundColor: 'rgba(230, 228, 226, 0.25)',
    borderRadius: 10,
    marginHorizontal: 15,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',

  },
  textTitleButton: {
    fontSize: 15,
    fontFamily: 'Montserrat-Light',
    color: '#e6e4e2',
    //paddingBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',

  },
  textDescription: {
    fontSize: 14,
    fontFamily: 'Montserrat-Light',
    color: '#e6e4e2',
    padding: 20,
    textAlign: 'justify',
  },
  conteinerSovmestimost: {
    padding: 1,
    paddingBottom: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    backgroundColor: 'rgba(230, 228, 226, 0.2)',
    borderRadius: 10,
  },
})
