import React, { useState, useRef, useEffect, SetStateAction, useMemo, DependencyList } from 'react'
import { StyleProp, ViewStyle, View, StyleSheet, Platform, Text, Image, DatePickerAndroid, TextInput, StatusBar, FlatList, TextPropTypes, Button, Alert, ScrollView, AsyncStorage, ActivityIndicator, DeviceEventEmitter, Dimensions, Animated, PermissionsAndroid, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import DatePicker from 'react-native-datepicker'
import { screenWidth, GoroskopScreen, screenHeight } from './GoroskopScreen'
import { getZodiac } from '../component/getZodiac'
import { getZodiacSign, ZodiacName, ZodiacSigns } from './zodiac/ZodiacSign'
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel'
import moment from 'moment'
import Axios from 'axios'
import cheerio from 'react-native-cheerio'
import { KeyboardAwareScrollView, KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view'
import { CarouselHoroscope } from './CarouselHoroscope'
import { accelerometer, setUpdateIntervalForType, SensorTypes } from "react-native-sensors"
import { CarouselHoroscopeCompatibility } from './CarouselHoroscopeCompatibility'
import { FlatlistCompatibility } from '../component/FlatlistCompatibility'
import { fetchHoroscope } from '../component/fetchHoroscope'
import { AnimatedView } from '../component/AnimatedView'
import { getDataDate, getDataName, storeDataDate, storeDataName } from '../component/Store'


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

export function useAsync<T>(deferred: () => Promise<T>, deps: DependencyList) {
  useEffect(() => {
    async function go() {
      deferred()
    }
    go()
  }, deps)
}

export const ProfileScreen: React.FC<ProfileScreenProps> = props => {
  const { style } = props
  const [value, onChangText] = useState('Your Name')
  useEffect(() => {
    getDataName().then(onChangText)
  }, [])


  const [animationLoad, setAnimation] = useState(false);
  const [animationLoadLove, setAnimationLove] = useState(false);
  const [animationLoadCareer, setAnimationCareer] = useState(false);
  const [dateBirth, setDateBirth] = useState<Date>()
  const [selectedWoman, setWomanZodiac] = useState<ZodiacName>()
  const [selectedMan, setManZodiac] = useState<ZodiacName>()
  const [isVisible, setVisible] = useState(false)
  const [isPress, setPress] = useState(false)
  const scrollRef = useRef<KeyboardAwareScrollView>(null)

  const [entriesCareer, setEntriesCareer] = useState<EntriesType[]>([
    {
      id: '7',
      description: '',
      date: moment().add(0, 'day').format('LL').toString()
    },
    {
      id: '8',
      description: '',
      date: moment().add(0, 'day').format('LL').toString()
    },
    {
      id: '9',
      description: '',
      date: moment().add(0, 'day').format('LL').toString()
    }
  ]);
  const [entries, setEntries] = useState<EntriesType[]>([
    {
      id: '1',
      description: '',
      date: moment().add(-1, 'day').format('LL').toString(),
      subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
      illustration: 'https://5sfer.com/wp-content/uploads/2015/08/8ipwnn.jpg',
    },
    {
      id: '2',
      description: '',
      date: moment().add(0, 'day').format('LL').toString(),
      subtitle: 'Lorem ipsum dolor sit amet',
      illustration: 'https://i.ytimg.com/vi/dX8kSHknlyU/maxresdefault.jpg',
    },
    {
      id: '3',
      description: '',
      date: moment().add(1, 'day').format('LL').toString(),
      subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
      illustration: 'https://cdni.rt.com/russian/images/2019.08/article/5d63aa84370f2c6e1d8b4589.jpg',
    }]);
  const [entriesLove, setEntriesLove] = useState<EntriesType[]>([
    {
      id: '4',
      description: '',
      date: moment().add(-1, 'day').format('LL').toString(),
      subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
      illustration: 'https://5sfer.com/wp-content/uploads/2015/08/8ipwnn.jpg',
    },
    {
      id: '5',
      description: '',
      date: moment().add(0, 'day').format('LL').toString(),
      subtitle: 'Lorem ipsum dolor sit amet',
      illustration: 'https://i.ytimg.com/vi/dX8kSHknlyU/maxresdefault.jpg',
    },
    {
      id: '6',
      description: '',
      date: moment().add(1, 'day').format('LL').toString(),
      subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
      illustration: 'https://cdni.rt.com/russian/images/2019.08/article/5d63aa84370f2c6e1d8b4589.jpg',
    },

  ]);

  useEffect(() => {

    if (dateBirth) {

      storeDataDate(dateBirth)
      setAnimation(true)
      setAnimationLove(true)
      const storedZodiac = getZodiacSign(dateBirth.getDate(), dateBirth.getMonth() + 1)?.name

      async function go() {
        const zodiacParametr = storedZodiac
        fetchHoroscope(zodiacParametr!, '/', setAnimation, entries, setEntries)
        fetchHoroscope(zodiacParametr!, '/erotic/', setAnimationLove, entriesLove, setEntriesLove)
        fetchHoroscope(zodiacParametr!, '/career/', setAnimationCareer, entriesCareer, setEntriesCareer)
      }
      go()

    } else {
      async function go() {
        const storedDate = await getDataDate()
        setDateBirth(storedDate)
      }
      go()
    }
  }, [dateBirth])



  useEffect(() => {
    setManZodiac('gemini')
    setWomanZodiac('gemini')
  }, [])

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
              <Text style={styles.description} numberOfLines={2}>ГОРОСКОП</Text>
            </View>

            <View style={styles.topBar} >
              <Image
                source={dateBirth ? getZodiacSign(dateBirth.getDate(), dateBirth.getMonth() + 1)?.emoji : undefined}
                style={{
                  alignSelf: 'center',
                  alignContent: 'center',
                  width: 50,
                  height: 50,
                  //marginBottom: 35,
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
              <Text style={styles.symbol}>ИМЯ</Text>
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
              <Text style={styles.symbol}>ДЕНЬ РОЖДЕНИЯ</Text>
              <DatePicker
                date={dateBirth}
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
                  setDateBirth(date)
                  setAnimation(true)
                  setAnimationLove(true)
                }}
              >
              </DatePicker>
            </View>
          </View>
          <View style={styles.carousel}>
            <CarouselHoroscope
              description={'Ваш гороскоп на 3 дня'}
              entriesCarousel={entries}
              animationLoad={animationLoad}
            />
            <CarouselHoroscope
              description={'Романтичный гороскоп на 3 дня'}
              entriesCarousel={entriesLove}
              animationLoad={animationLoad}
            />
            <CarouselHoroscope
              description={'Финансовый гороскоп на 3 дня'}
              entriesCarousel={entriesCareer}
              animationLoad={animationLoadCareer}
            />

          </View>
          <Text style={styles.textTitle}>Совместимость</Text>
          <View style={styles.carousel}>
            <CarouselHoroscopeCompatibility onSelected={setManZodiac} title="Мужчина" type="man" />
          </View>
          <View style={styles.carousel}>
            <CarouselHoroscopeCompatibility onSelected={setWomanZodiac} title="Женщина" type="woman" />
          </View>
          <TouchableOpacity style={{
            marginVertical: 20,
            alignContent: 'center',
            alignSelf: 'center',
          }}
            onPress={async () => {

              console.warn('selectedMan:', selectedMan)
              console.warn('selectedWoman:', selectedWoman)
              isVisible ? setVisible(false) : setVisible(true)

            }}>
  
              {isVisible ?
                <View style={styles.buttonPress}>
                  <Text style={styles.textTitleButton}>Очистить совместимость</Text>
                </View>
                : <View style={styles.button}>
                  <Text style={styles.textTitleButton}>Узнать совместимость</Text>
                </View>}

          </TouchableOpacity>
          {isVisible ?
            (<>
              <View style={{
                alignSelf: 'center',
                alignContent: 'center',
                justifyContent: 'center',
              }}>
                <FlatlistCompatibility scrollRef={scrollRef} zodiacMan={Object.values(ZodiacSigns).find(it => it.name === selectedMan)?.titleru!} zodiacWoman={Object.values(ZodiacSigns).find(it => it.name === selectedWoman)?.titleru!} />
              </View>

            </>) : <></>}

        </KeyboardAwareScrollView>
      </LinearGradient>
    </>

  )
}


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
  buttonPress: {

      width: screenWidth - 100,
      height: screenWidth / 7,
      backgroundColor: 'rgba(255, 81, 72, 0.25)',
      borderRadius: 10,
      marginHorizontal: 15,
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',

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
