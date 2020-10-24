
import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { StyleProp, ViewStyle, View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native'
import { CarouselHoroscopeCompatibility } from '../../screen/CarouselHoroscopeCompatibility'
import { ZodiacName, ZodiacSigns } from '../../screen/zodiac/ZodiacSign'
import { strings } from '../Strings'
import { FlatlistCompatibility } from './FlatlistCompatibility'
import { storeCompatibility } from '../store/StoreCompatibility'

interface CardCompatibilityProps {
    style?: StyleProp<ViewStyle>
}
const { width: screenWidth } = Dimensions.get('window')
export const CardCompatibility: React.FC<CardCompatibilityProps> = observer(props => {
    const { style } = props
    const [selectedWoman, setWomanZodiac] = useState<ZodiacName>()
    const [selectedMan, setManZodiac] = useState<ZodiacName>()
   // const [isVisible, setVisible] = useState(false)

    return <View>
        <Text style={styles.textTitle}>{strings.compability}</Text>
        <View style={styles.carousel}>
            <CarouselHoroscopeCompatibility onSelected={setManZodiac} title={strings.man} type="man" />
        </View>
        <View style={styles.carousel}>
            <CarouselHoroscopeCompatibility onSelected={setWomanZodiac} title={strings.woman} type="woman" />
        </View>
        <TouchableOpacity style={{
            marginVertical: 20,
            alignContent: 'center',
            alignSelf: 'center',
        }}
            onPress={async () => {
                storeCompatibility.setVisible()

            }}>

            {storeCompatibility.isVisible ?
                <View style={styles.buttonPress}>
                    <Text style={styles.textTitleButton}>{strings.removeCompability}</Text>
                </View>
                : <View style={styles.button}>
                    <Text style={styles.textTitleButton}>{strings.successCompability}</Text>
                </View>}

        </TouchableOpacity>
        {storeCompatibility.isVisible ?
            (<>
                <View style={{
                    alignSelf: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                }}>
                    <FlatlistCompatibility
                        
                        zodiacMan={Object.values(ZodiacSigns).find(it => it.name === selectedMan)?.titleru!}
                        zodiacWoman={Object.values(ZodiacSigns).find(it => it.name === selectedWoman)?.titleru!} />
                </View>

            </>) : <></>}
    </View>
})
const styles = StyleSheet.create({
   
    textTitle: {
        textTransform: 'uppercase',
        paddingTop: 10,
        textAlign: 'center',
        fontSize: 20,
        color: '#e6e4e2',
        fontFamily: 'Montserrat-SemiBold',
    },
    carousel: {
        marginTop: 20,
        flexDirection: 'column',

    },
    button: {
        width: 300,
        height: 40,
        backgroundColor: 'rgba(230, 228, 226, 0.25)',
        borderRadius: 30,
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

        width: 300,
        height: 40,
        backgroundColor: 'rgba(246, 125, 249, 0.3)',
        borderRadius: 30,
        marginHorizontal: 15,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',

    },
})
