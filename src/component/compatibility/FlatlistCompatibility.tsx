import Axios from 'axios'
import cheerio from 'react-native-cheerio'
import React, { RefObject, useEffect, useState } from 'react'
import { StyleProp, ViewStyle, View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native'
import { screenWidth } from '../../screen/GoroskopScreen'
import { ZodiacName } from '../../screen/zodiac/ZodiacSign'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

interface FlatlistCompatibilityProps {
    style?: StyleProp<ViewStyle>
    zodiacMan: string
    zodiacWoman: string
    //scrollRef: RefObject<KeyboardAwareScrollView>
}
type ParserComp = {
    title: string,
    text: string,
}
export async function parseH(zodiacWomen: string, zodiacMan: string) {
    const url = "https://horoscopes.rambler.ru/" + 'sovmestimost-znakov-zodiaka/zhenshhina-' + zodiacWomen + '-muzhchina-' + zodiacMan
    const response = await Axios.get(url)
    const $ = cheerio.load(response.data)
    const classItems = $(
        '#app > main > div.content._3Hki > div > div > section > div._3AUe',
    ).toArray()

    const textParse = [
        {
            title: classItems[0].children[0].children[1].children[0].data || '',
            text: classItems[0].children[0].children[2].children[0].data || '',
        },
        {
            title: classItems[0].children[2].children[1].children[0].data || '',
            text: classItems[0].children[2].children[2].children[0].data || '',
        },
        {
            title: classItems[0].children[3].children[3].children[0].data || '',
            text: classItems[0].children[3].children[4].children[0].data || '',
        },
        {
            title: classItems[0].children[4].children[1].children[0].data || '',
            text: classItems[0].children[4].children[2].children[0].data || '',
        }
    ]
    console.log('parseH', textParse)
    return textParse
}

export const FlatlistCompatibility: React.FC<FlatlistCompatibilityProps> = props => {
    const { style, zodiacMan, zodiacWoman,  } = props
    const [isPress, setPress] = useState(Boolean)

    const [dataParser, setDataParser] = useState([{
        title: '',
        text: '',
    },
    {
        title: '',
        text: '',
    },
    {
        title: '',
        text: '',
    },
    {
        title: '',
        text: '',
    }])
    useEffect(() => {
        async function go() {
            setDataParser(await parseH(zodiacWoman, zodiacMan))
            setPress(false)
        }
        go()
        
    }, [])

    const renderItem = ({ item }: any) => {
        // scrollRef.current?.scrollToEnd(true)
        return (
            <>
                <View style={styles.flatView}>
                    <TouchableOpacity
                        onPress={async () => {
                            isPress? setPress(false) : setPress(true)
                        }}
                    >
                                <View style={styles.flatViewTitle}>
                                    <Text style={styles.flatTitle}>{item.title}</Text>
                                </View>
                    </TouchableOpacity>
                    {isPress? 
                    <Text style={styles.flatText}>{item.text}</Text> 
                    : <></>
                }
                </View>
            </>
        )
    }
    return (
        <FlatList
            renderItem={renderItem}
            data={dataParser}
        />)

}
const styles = StyleSheet.create({
    flatView: {
        width: screenWidth - (screenWidth / 10),
        //height: screenWidth / 7,
        backgroundColor: 'rgba(230, 228, 226, 0.25)',
        borderRadius: 10,
        marginHorizontal: 15,
        margin: 5,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    flatText: {
        fontSize: 14,
        fontFamily: 'Montserrat-Light',
        color: '#e6e4e2',
        marginVertical: 10,
        paddingHorizontal: 20,
        textAlign: 'justify',
    },
    flatTitle: {
        fontSize: 16,
        fontFamily: 'Montserrat-Light',
        color: '#e6e4e2',
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingVertical: 5,
        textAlign: 'justify',
    },
    flatViewTitle: {
        width: screenWidth - (screenWidth / 10),
        backgroundColor: 'rgba(230, 228, 226, 0.5)',
        borderRadius: 10,
        marginHorizontal: 15,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
})