import React, { useState } from 'react'
import { StyleProp, ViewStyle, View, StatusBar, StyleSheet, } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { CardCompatibility } from '../component/compatibility/CardCompatibility'
import { ImageBackground } from '../component/image/ImageBackground'
import { ZodiacName, } from './zodiac/ZodiacSign'

interface CompatibilityScreenProps {
    style?: StyleProp<ViewStyle>
}

export const CompatibilityScreen: React.FC<CompatibilityScreenProps> = props => {

    return <LinearGradient
        colors={['#303f52', '#333132']}
        style={styles.linearGradient}
    >
        <StatusBar
            translucent={true}
            backgroundColor={'rgba(0, 100, 0, 0)'}
        />
        <View style={styles.conteinerTopBar}>
            <ImageBackground />
            {/* <AnimatedView /> */}
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