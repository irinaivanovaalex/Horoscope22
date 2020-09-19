import React, { useRef, useState } from 'react'
import { StyleProp, ViewStyle, View, StyleSheet, Text, ActivityIndicator, Image } from 'react-native'
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import { screenWidth } from './GoroskopScreen';
import { getZodiacEmoji, getZodiacSign, ZodiacSign, ZodiacSigns } from './zodiac/ZodiacSign';

interface CarouselHoroscopeCompatibilityProps {
  style?: StyleProp<ViewStyle>
}

export const CarouselHoroscopeCompatibility: React.FC<CarouselHoroscopeCompatibilityProps> = props => {
  const { style } = props
  const carouselRef = useRef<Carousel<any>>(null);
  const [indexEntries, setIndex] = useState(1);

  const renderItem = ({ item, index }: any, parallaxProps: any) => {
    return (
      <View>
        <View style={styles.item}>
          <ParallaxImage
            source={Object.values(ZodiacSigns)[index]?.emoji}
            blurRadius={0.5}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0}
            {...parallaxProps}
          />
          <Text style={styles.carouselText}>{Object.values(ZodiacSigns)[index].title}</Text>
        </View>
      </View>

    ) }

  return (
      <>
      {/* <Text style={styles.textTitle}>{props.description}</Text> */}
            <Carousel
              ref={carouselRef}
              sliderWidth={screenWidth}
              sliderHeight={screenWidth}
              itemWidth={screenWidth - 330}
              renderItem={renderItem}
              data={Object.values(ZodiacSigns)}
              hasParallaxImages={true}
              firstItem={5}
              onSnapToItem={(index: any) => {
                setIndex(index)
                return 0
              }}
            />
      </>
  )
}
const styles = StyleSheet.create({
    carousel: {
        marginTop: 20,
        flexDirection: 'column',
      },
      carouselText: {
        fontSize: 13,
        marginTop: 5,
        fontFamily: 'Montserrat-Light',
        color: '#e6e4e2',
        textAlign: 'center',
      },
      carouselTextTitle: {
        fontSize: 14,
        fontFamily: 'Montserrat-Light',
        color: '#e6e4e2',
        position: 'absolute',
        paddingLeft: 20,
        paddingTop: 20,
        paddingRight: 20,
        textAlign: 'justify',
      },
      textTitle: {
        fontSize: 15,
        fontFamily: 'Montserrat-Light',
        color: '#e6e4e2',
        paddingBottom: 10,
        textAlign: 'center',
        textTransform: 'uppercase',
      },
      item: {
        width: screenWidth - 340,
        height: screenWidth - 340,
      },
      imageContainer: {
        flex: 1,
        //backgroundColor: 'rgba(230, 228, 226, 0.25)',
        borderRadius: 8,
      },
      animatingLoad: {
        position: 'absolute',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: (screenWidth - 70) / 3,
      },
      image: {
        opacity: 0.1,
        resizeMode: 'contain',
      },
      
})

