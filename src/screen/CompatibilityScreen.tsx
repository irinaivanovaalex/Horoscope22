import React, { useState } from 'react'
import { StyleProp, ViewStyle, View, StatusBar, Image, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { CardCompatibility } from '../component/compatibility/CardCompatibility'
import { FlatlistCompatibility } from '../component/compatibility/FlatlistCompatibility'
import { ZodiacName, ZodiacSigns } from './zodiac/ZodiacSign'

interface CompatibilityScreenProps {
    style?: StyleProp<ViewStyle>
}

export const CompatibilityScreen: React.FC<CompatibilityScreenProps> = props => {
    const { style } = props
    const [selectedMan, setManZodiac] = useState<ZodiacName>()
    const [selectedWoman, setWomanZodiac] = useState<ZodiacName>()
    return <LinearGradient
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
            <CardCompatibility />
        </View>
    </LinearGradient>
}
const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    conteinerTopBar: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 5,
    },
})