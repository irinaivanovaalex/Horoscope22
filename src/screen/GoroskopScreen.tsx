import React, { useState, useRef, useEffect } from 'react'
import { StyleProp, ViewStyle, View, TextInput, StyleSheet, Text, Image, Platform, Dimensions, TouchableOpacity } from 'react-native'
import MaskedView from '@react-native-community/masked-view';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';

interface GoroskopScreenProps {
    style?: StyleProp<ViewStyle>
}
const ENTRIES1 = [
    {
        title: 'Beautiful and dramatic Antelope Canyon',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://5sfer.com/wp-content/uploads/2015/08/8ipwnn.jpg',
    },
    {
        title: 'Earlier this morning, NYC',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.ytimg.com/vi/dX8kSHknlyU/maxresdefault.jpg',
    },
    {
        title: 'White Pocket Sunset',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
        illustration: 'https://cdni.rt.com/russian/images/2019.08/article/5d63aa84370f2c6e1d8b4589.jpg',
    },
    {
        title: 'White Pocket Sunset',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
        illustration: 'https://cdni.rt.com/russian/images/2019.08/article/5d63aa84370f2c6e1d8b4589.jpg',
    },
];

export const { width: screenWidth } = Dimensions.get('window')
export const {height: screenHeight} = Dimensions.get('window')

export const GoroskopScreen: React.FC<GoroskopScreenProps> = props => {
    const { style } = props
    const [entries, setEntries] = useState(ENTRIES1);
    const [indexEntries, setIndex] = useState(0);
    const carouselRef = useRef<Carousel<any>>(null);
    const goForward = () => {
        carouselRef?.current?.snapToNext();
    }


    const renderItem = ({ item, index }, parallaxProps: any) => {
        return (
            <View>
                <View style={styles.item}>
                    <ParallaxImage
                        source={{ uri: item.illustration }}
                        containerStyle={styles.imageContainer}
                        style={styles.image}
                        parallaxFactor={0.4}
                        {...parallaxProps}
                    />
                    <Text numberOfLines={2}>
                        {item.title}
                    </Text>
                </View>
            </View>

        )

    }

    return (
        <LinearGradient 
        colors={['#000', '#59355D']} 
        style={styles.linearGradient}
        end={{x: 0.5, y: 1}} 
        start={{x: 0, y: 0.25}}
        >
            <View style={styles.conteiner}>
                <View style={styles.symbolConteiner}>

                    <Text style={styles.symbol}>    </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title} numberOfLines={2}>
                        Irina, your personal horoscope </Text>
                </View>

                <View style={styles.topBar} >
                    <Image
                        source={require('../component/profile.jpg')}
                        style={{
                            alignSelf: 'center',
                            width: 60,
                            height: 60,
                            marginBottom: 35,
                            borderRadius: 150,
                        }}
                        resizeMode="stretch"
                        resizeMethod="scale"
                    />
                </View>

            </View>
            <View>
                <TouchableOpacity onPress={goForward}>
                </TouchableOpacity>
                <Carousel
                    ref={carouselRef}
                    sliderWidth={screenWidth}
                    sliderHeight={screenWidth}
                    itemWidth={screenWidth - 100}
                    data={entries}
                    renderItem={renderItem}
                    hasParallaxImages={true}
                    onSnapToItem={(index: any) => {
                        setIndex(index)
                        return 0
                    }}
                />
                <Pagination
                    dotsLength={entries.length}
                    activeDotIndex={indexEntries}
                    //containerStyle={{ backgroundColor: 'rgba(0, 100, 0, 0.75)' }}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 8,
                        backgroundColor: 'rgba(0, 0, 0, 0.95)'
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
            </View>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,

        //borderRadius: 5
    },
    topBar: {
        //backgroundColor: '#654086',
        borderRadius: 51,
        width: 75,
        height: 75,
        margin: 15,
        //borderColor: '#000',
        // borderWidth: 2,
    },
    conteiner: {
        // borderColor: '#000',
        //borderWidth: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-between'
    },
    textContainer: {
        //borderColor: '#000',
        // borderWidth: 2,
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    title: {
        textAlign: 'center',
        fontSize: 25,
        color: '#fbb'
        //fontWeight: "bold",
        //fontFamily: 'bahnschrift'

    },
    symbolConteiner: {
        //borderColor: '#000',
        // borderWidth: 2,
        alignSelf: 'center',
        justifyContent: 'center',
        paddingStart: 15,

    },
    symbol: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: "bold",
        color: '#fff'
    },
    item: {
        width: screenWidth - 100,
        height: screenWidth - 100,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
})


