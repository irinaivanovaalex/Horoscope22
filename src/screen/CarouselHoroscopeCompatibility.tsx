import React, { useEffect, useRef, useState } from 'react'
import { StyleProp, ViewStyle, View, StyleSheet, Text, ActivityIndicator, Image, TextStyle, ImageStyle } from 'react-native'
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import { screenWidth } from './GoroskopScreen';

import { getZodiacEmoji, getZodiacSign, ZodiacName, ZodiacSign, ZodiacSigns } from './zodiac/ZodiacSign';

export type HoroscopeType = "woman" | "man"

interface CarouselHoroscopeCompatibilityProps {
  style?: StyleProp<ViewStyle>
  title: string
  type: HoroscopeType
  onSelected: (zodiac: ZodiacName) => void
}

export const CarouselHoroscopeCompatibility: React.FC<CarouselHoroscopeCompatibilityProps> = props => {
  const { style, type, onSelected } = props
  const carouselRef = useRef<Carousel<any>>(null);
  const [indexEntries, setIndex] = useState(1);

  const man = type === "man"

  const renderItem = ({ item, index }: any, parallaxProps: any) => {
    return (
      <View>
        <View style={styles.item}>
          <ParallaxImage
            source={Object.values(ZodiacSigns)[index]?.emoji}
            blurRadius={0.5}
            containerStyle={styles.imageContainer}
            style={zodiacStyleImage[type]}
            parallaxFactor={0}
            {...parallaxProps}
          />
          <Text style={zodiacStyleTextSing[type]}>{Object.values(ZodiacSigns)[index].title}</Text>
        </View>
      </View>

    )
  }

  useEffect(() => {
    onSelected(Object.values(ZodiacSigns)[indexEntries].name)
  }, [indexEntries])

  return (
    <>
      <Text style={zodiacStyleTitle[type]}>{props.title}</Text>
      <Carousel
      vertical={false}
        ref={carouselRef}
        sliderWidth={screenWidth}
        itemWidth={screenWidth - 330}
        renderItem={renderItem}
        data={Object.values(ZodiacSigns)}
        hasParallaxImages={true}
        firstItem={5}
        onSnapToItem={setIndex}
      />
    </>
  )
}
const zodiacStyleImage : {[key in HoroscopeType]: StyleProp<ViewStyle | ImageStyle>} ={
  man:{
    opacity: 0.1,
    resizeMode: 'contain',
  },
  woman: {
    opacity: 0.1,
    resizeMode: 'contain',
    tintColor: 'rgba(246, 125, 249, 0.86)'
  }
}
const zodiacStyleTextSing: {[key in HoroscopeType]: StyleProp<ViewStyle | TextStyle>} ={
  man:{
    fontSize: screenWidth/42,
    marginTop: 5,
    fontFamily: 'Montserrat-Light',
    color: '#e6e4e2',
    textAlign: 'center',
  },
  woman: {
    fontSize: screenWidth/35,
    marginTop: 5,
    fontFamily: 'Montserrat-Light',
    color: 'rgba(246, 125, 249, 0.86)',
    textAlign: 'center',
  }
}
const zodiacStyleTitle: {[key in HoroscopeType]: StyleProp<ViewStyle | TextStyle>} = {
  man: {
    fontSize: 13,
    fontFamily: 'Montserrat-Light',
    color: '#e6e4e2',
    paddingBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  woman: {
    fontSize: 13,
    fontFamily: 'Montserrat-Light',
    color: 'rgba(246, 125, 249, 0.86)',
    paddingBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
  }
}

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 340,
    height: screenWidth - 340,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 8,
  }
})

