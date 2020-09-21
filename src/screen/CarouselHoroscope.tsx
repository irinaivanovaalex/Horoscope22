import React, { useRef, useState } from 'react'
import { StyleProp, ViewStyle, View, Text, StyleSheet, Platform, ActivityIndicator } from 'react-native'
import { Carousel, Pagination, ParallaxImage } from 'react-native-snap-carousel'
import { screenWidth } from './GoroskopScreen'
import { EntriesType } from './ProfileScreen';

interface CarouselHoroscopeProps {
  style?: StyleProp<ViewStyle>
  description: string
  animationLoad?: boolean
  entriesCarousel: EntriesType[]
}


export const CarouselHoroscope: React.FC<CarouselHoroscopeProps> = props => {
  const carouselRef = useRef<Carousel<any>>(null);
  const [indexEntries, setIndex] = useState(1);

  const renderItem = ({ item, index }: any, parallaxProps: any) => {
    return (
      <View>
        <View style={styles.item}>

          <ParallaxImage
            source={require('../component/image/fon.png')}
            blurRadius={0.1}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0.4}
            {...parallaxProps}
          />
          {props.animationLoad
            ? <ActivityIndicator
              style={styles.animatingLoad}
              color="#e6e4e2"
              animating={props.animationLoad}
              size='large'
            />
            : <Text style={styles.carouselTextTitle} numberOfLines={15}>{item.description}</Text>
          }
          <Text style={styles.carouselText}>{item.date}</Text>

        </View>
      </View>

    )

  }

  return (
    <>
      <Text style={styles.textTitle}>{props.description}</Text>
      <Carousel
        vertical={false}
        ref={carouselRef}
        sliderWidth={screenWidth}
        itemWidth={screenWidth - 100}
        data={props.entriesCarousel}
        renderItem={renderItem}
        hasParallaxImages={true}
        firstItem={1}
        onSnapToItem={(index: any) => {
          setIndex(index)
          return 0
        }}
      />

      <Pagination
        dotsLength={3}
        activeDotIndex={indexEntries}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 5,
          backgroundColor: 'rgba(230, 228, 226, 0.95)'
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
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
    width: screenWidth - 100,
    height: screenWidth - 100,
  },
  imageContainer: {
    flex: 1,
    //marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'rgba(230, 228, 226, 0.25)',
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
  },
})