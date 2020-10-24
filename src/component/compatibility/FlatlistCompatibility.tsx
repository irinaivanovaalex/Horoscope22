import Axios from 'axios'
import cheerio from 'react-native-cheerio'
import React, { useEffect, useState } from 'react'
import { StyleProp, ViewStyle, View, StyleSheet, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { screenWidth } from '../../screen/GoroskopScreen'
import { storeCompatibility } from '../store/StoreCompatibility'
import { observer } from 'mobx-react'
import { storeCompatibilityParser } from '../store/StoreCompatibilityParser'
import Icon from 'react-native-vector-icons/FontAwesome'



interface FlatlistCompatibilityProps {
    style?: StyleProp<ViewStyle>
    zodiacMan: string
    zodiacWoman: string

}

export const FlatlistCompatibility: React.FC<FlatlistCompatibilityProps> = observer(props => {
    const { style, zodiacMan, zodiacWoman, } = props
    const renderItem = ({ item, index }) => {
        storeCompatibility.isScrollRef()
        return (
            <>
                <View style={styles.flatView}>
                    <TouchableOpacity
                        onPress={() => {
                            storeCompatibility.changeSelectedCompatibility(index)
                            storeCompatibility.setRotate(index)
                            storeCompatibility.isScrollRef()
                        }}
                    >
                        <View style={styles.flatViewTitle}>
                            {storeCompatibility.animatedCompatibility[index]
                                ? <ActivityIndicator
                                    color="#e6e4e2"
                                    style={styles.styleIndikator}
                                    animating={storeCompatibility.animatedCompatibility[index]}
                                    size='small'
                                />
                                :
                                <Text style={styles.flatTitle}>{item.title}</Text>}
                            <Icon name='caret-down' size={20} color='white' style={{ marginRight: 25, transform: [{ rotate: storeCompatibility.rotate[index] }] }} />
                        </View>
                    </TouchableOpacity>
                    {!!storeCompatibility.selectedCompatibility[index] && <Text style={styles.flatText}>{item.text}</Text>}
                </View>
            </>
        )
    }
    useEffect(() => {
        async function go() {
            storeCompatibilityParser.setDataParser(zodiacWoman, zodiacMan)
        }
        go()

    }, [])
    return (
        <FlatList
            extraData={[...storeCompatibility.selectedCompatibility, ...storeCompatibility.rotate, ...storeCompatibility.animatedCompatibility]}
            renderItem={renderItem}
            data={storeCompatibilityParser.dataParser}
        />)

})

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
        color: 'white',
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
        justifyContent: 'space-between',
        height: 40,
        flexDirection: 'row'
    },
    styleIndikator:{
        marginLeft: 25,
    },
    icon:{
        
    }
})