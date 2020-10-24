
import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { StyleProp, ViewStyle, View, StatusBar, StyleSheet, } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { CardCompatibility } from '../component/compatibility/CardCompatibility'
import { ImageBackground } from '../component/image/ImageBackground'
import { TopBarHoroscope } from '../component/TopBarHoroscope/TopBarHoroscope'
import { ZodiacName, } from './zodiac/ZodiacSign'

interface CompatibilityScreenProps {
    style?: StyleProp<ViewStyle>
}

export const CompatibilityScreen: React.FC<CompatibilityScreenProps> = observer(props => {

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
            <TopBarHoroscope />
            {/* <AnimatedView /> */}

        </View>
        <ScrollView
            showsVerticalScrollIndicator={false}>
            <CardCompatibility />
            <View style={styles.scroll} >

            </View>
        </ScrollView>

    </LinearGradient>
})
const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    conteinerTopBar: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 5,
    },
    scroll: {
        paddingBottom: 80,
    }
})