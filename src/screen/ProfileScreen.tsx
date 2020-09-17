import React, { useState, useRef, useEffect, SetStateAction, useMemo } from 'react'
import { StyleProp, ViewStyle, View, StyleSheet, Platform, Text, Image, DatePickerAndroid, TextInput, StatusBar, FlatList, TextPropTypes, Button, Alert, ScrollView, AsyncStorage, ActivityIndicator, DeviceEventEmitter, Dimensions, Animated, PermissionsAndroid } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import DatePicker from 'react-native-datepicker'
import { screenWidth, GoroskopScreen, screenHeight } from './GoroskopScreen'
import { getZodiac } from '../component/getZodiac'
import { getZodiacSign } from './zodiac/ZodiacSign'
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel'
import moment from 'moment'
import Axios from 'axios'
import cheerio from 'react-native-cheerio'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { CarouselHoroscope } from './CarouselHoroscope'
import { accelerometer, setUpdateIntervalForType, SensorTypes } from "react-native-sensors"


export type EntriesType = {
  id: string;
  description: string | Promise<String>;
  date: string;
  subtitle: string;
  illustration: string;
}

interface ProfileScreenProps {
  style?: StyleProp<ViewStyle>

}

const storeDataZodiac = async (value: string) => {
  await AsyncStorage.setItem('@MyApp_Zodiac', value)
  console.warn('Data successfully saved zodiac: ', value)
}

const storeDataName = async (value: string) => {
  await AsyncStorage.setItem('@MyApp_Name', value)
  console.warn('Data successfully saved name: ', value)
}

const storeDataDate = async (value: Date) => {
  await AsyncStorage.setItem('@MyApp_Date', value.toString())
  console.warn('Data successfully saved date', value)
}

const getDataName = async () => {
  const value = await AsyncStorage.getItem('@MyApp_Name') || "Your Name"
  console.warn('getDateName:', value)
  return value
}
const getDataDate = async () => {
  const value = await AsyncStorage.getItem('@MyApp_Date') || new Date().toLocaleDateString()
  console.warn('getDataDate: ', value)
  return new Date(value)
}
const getDataZodiac = async () => {
  const value = await AsyncStorage.getItem('@MyApp_Zodiac') || "cancer"
  console.warn('getDateZodiac:', value)
  return value
}

export const fetchItem = async (zodiac: string, day: string) => {
  const result: string = await parseGoroscope(zodiac, day)
  console.warn('hj', result)
  return result
}

export const fetchItemErotic = async (zodiac: string, day: string) => {
  const resultErotic: string = await parseGoroscopeErotic(zodiac, day)
  console.warn('hj', resultErotic)
  return resultErotic
}

setUpdateIntervalForType(SensorTypes.accelerometer, 32)

export const ProfileScreen: React.FC<ProfileScreenProps> = props => {
  const { style } = props
  const [value, onChangText] = useState('Your Name')
  useEffect(() => {
    getDataName().then(onChangText)
  }, [])

  const [animationLoad, setAnimation] = useState(false);
  const [animationLoadLove, setAnimationLove] = useState(false);
  const [dateBirth, setDateBirth] = useState<Date>()
  const [position, setposition] = useState({});
  // const [orientation, setOrientation] = useState([0, 0, 0])

  const [zodiac, setZodiac] = useState(getZodiacSign(new Date().getDate(), new Date().getMonth() + 1)?.name)

  useEffect(() => {
    async function go() {
      const storedZodiac = getZodiacSign(dateBirth.getDate(), dateBirth.getMonth() + 1)?.name
      setZodiac(storedZodiac ? storedZodiac : 'leo')
      console.log('zodiac: ', zodiac)
      console.log('weig', screenWidth, screenHeight)
      storeDataZodiac(storedZodiac ? storedZodiac : 'leo')
    }
    go()
  }, [zodiac, dateBirth])
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
      const zodiacParametr = getDataZodiac()

      async function fetchHoroscopeIndex() {
        const horoscopes = [
          await fetchItem(await zodiacParametr, 'yesterday'),
          await fetchItem(await zodiacParametr, ''),
          await fetchItem(await zodiacParametr, 'tomorrow')
        ]
        setAnimation(false)
        const dateHoroscope = entries.map((item, index) => {
          return {
            ...item,
            description: horoscopes[index],

          }

        })

        setEntries(dateHoroscope)

      }
      fetchHoroscopeIndex()
      async function fetchHoroscopeIndexLove() {
        const horoscopesErotic = [
          await fetchItemErotic(await zodiacParametr, 'yesterday'),
          await fetchItemErotic(await zodiacParametr, ''),
          await fetchItemErotic(await zodiacParametr, 'tomorrow')
        ]
        setAnimationLove(false)
        const dateHoroscopeLove = entriesLove.map((item, index) => {
          return {
            ...item,
            description: horoscopesErotic[index],

          }
        })

        setEntriesLove(dateHoroscopeLove)
      }
      fetchHoroscopeIndexLove()

    } else {
      async function go() {
        const storedDate = await getDataDate()
        setDateBirth(storedDate)

      }
      go()
    }
  }, [dateBirth])

  const animatedX = useMemo(() => new Animated.Value(0), [])
  const animatedY = useMemo(() => new Animated.Value(0), [])
  const animatedZ = useMemo(() => new Animated.Value(0), [])

  function decayX(xPar: number) {
    Animated.decay(
      animatedX,
      {
        velocity: 0.4,
        deceleration: 0.6,
        useNativeDriver: true,
      }
    ).start()
  }
  function decayY(yPar: number) {
    Animated.decay(
      animatedY,
      {
        velocity: 0.4,
        deceleration: 0.6,
        useNativeDriver: true,
      }
    ).start()
  }

  useEffect(() => {
    const subscription = accelerometer.subscribe(({ x, y, z, }) => {
      animatedX.setValue(x)
      animatedY.setValue(y)
      animatedZ.setValue(z)
      decayX(x)
      decayY(y)
      console.log(JSON.stringify({ x, y, z, }, null, '  '))
    })
  }, [])


  return (
    <>

      <LinearGradient
        colors={['#303f52', '#333132']}
        style={styles.linearGradient}
      //end={{ x: 2, y: 2 }}
      // start={{ x: 0, y: 0.25 }}
      >
        <StatusBar
          translucent={true}
          backgroundColor={'rgba(0, 100, 0, 0)'}
        />
        <View style={styles.conteinerTopBar}>
          <Image
            source={require('../component/space2.jpg')}
            blurRadius={0.1}
            style={{
              alignSelf: 'center',
              alignContent: 'center',
              position: 'absolute',
              opacity: 0.4,
            }}
          />
          <Animated.View style={{
            transform: [{
              translateX: animatedX.interpolate({
                inputRange: [-10, 0, 10],
                outputRange: [-50, 0, 50],
              })
            }, {
              translateY: animatedY.interpolate({
                inputRange: [-10, 0, 10],
                outputRange: [-100 - (-50), -100, -100 - (50)],
              })
            },],

            // translateX: orientation[0] * 10,
            // translateY: -100 - (orientation[1] * 10),
          }}>
            <Image
              source={require('../component/space3.jpg')}
              blurRadius={0.3}
              style={{
                alignSelf: 'center',
                alignContent: 'center',
                position: 'absolute',
                opacity: 0.2,
              }}
            />
          </Animated.View>
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
          style={{}}
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
          </View>

        </KeyboardAwareScrollView>
      </LinearGradient>
    </>

  )
}
export async function parseGoroscope(zodiac: string, day: string) {
  const url = "https://horoscopes.rambler.ru/" + zodiac + '/' + day
  const response = await Axios.get(url)
  const $ = cheerio.load(response.data)
  const classItems = $(
    '#app > main > div.content._3Hki > div > div > section > div._2eGr > div > div > span',
  ).toArray()

  return classItems[0].children[0].data
}
export async function parseGoroscopeErotic(zodiac: string, day: string) {
  const url = "https://horoscopes.rambler.ru/" + zodiac + '/erotic/' + day
  const response = await Axios.get(url)
  const $ = cheerio.load(response.data)
  const classItems = $(
    '#app > main > div.content._3Hki > div > div > section > div._2eGr > div > div > span',
  ).toArray()

  return classItems[0].children[0].data
}


const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    //paddingLeft: 15,
    //paddingRight: 15,
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
    alignContent: 'space-between'
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
})



