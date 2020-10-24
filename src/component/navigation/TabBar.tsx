import React, { useMemo, useReducer } from 'react'
import { StyleProp, ViewStyle, View, Animated, StyleSheet, SafeAreaView, Dimensions, Image } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import * as shape from "d3-shape";
import { StaticBar } from './StaticBar';
import { observer } from 'mobx-react';
import { TabNavigationState } from '@react-navigation/native';


interface TabBarProps {
    style?: StyleProp<ViewStyle>
    state: TabNavigationState
    navigation: any
    colorActive?: string,
    colorInactive?: string,
    animationbutton?: 'top' | 'bottom'
    speed: number
}
const { width: rem } = Dimensions.get("window");
const screenWidth = rem
const width = rem
const AnimatedSvg = Animated.createAnimatedComponent(Svg)
const height = 64

const backgroundColor = "rgba(41, 53, 69, 0.8)"

const AnimatedPath = Animated.createAnimatedComponent(Path)

export const TabBar: React.FC<TabBarProps> = observer(props => {
    const { style, state, navigation, colorActive, colorInactive, animationbutton, speed } = props

    const tabWidth = useMemo(() => screenWidth / state.routeNames.length, [])
    const koeficient = useMemo(() => state.routeNames.length, [])

    const getPath = () => {
        const left = shape.line().x(d => d[0]).y(d => d[1])([
            [0, 0],
            [width, 0],
        ])

        const tab = shape.line().x(d => d[0]).y(d => d[1]).curve(shape.curveBasis)([
            [width, 0],
            [width + 25 - 5 * (koeficient - 1), 0],
            [koeficient === 2 ? width + 65 : width + 140 / (5 * koeficient - 11), 5],
            [koeficient === 2 ? width + 80 : width + 200 / (koeficient * 3 - 4), height - 8],//left 
            [koeficient === 2 ? width + tabWidth - 80 : width + tabWidth - 200 / (koeficient * 3 - 4), height - 8],
            [koeficient === 2 ? width + tabWidth - 65 : width + tabWidth - 140 / (5 * koeficient - 11), 5],
            [width + tabWidth - (25 - 5 * (koeficient - 1)), 0],
            [width + tabWidth, 0],
        ]);
        const right = shape.line().x(d => d[0]).y(d => d[1])([
            [width + tabWidth, 0],
            [width * 2, 0],
            [width * 2, height],
            [0, height],
            [0, 0],
        ]);
        // console.warn('rerenderget')
        return `${left} ${tab} ${right}`
    }

    const d = useMemo(() => getPath(), [])
    const value = useMemo(() => new Animated.Value(0), [])
    const translateX = useMemo(() => value.interpolate({
        inputRange: [0, rem],
        outputRange: [-rem, 0],
    }), [])

    return (
        <View>
            <View {...{ height, rem }}>
                <AnimatedSvg width={rem * 2} {...{ height }} style={{ transform: [{ translateX }] }}>
                    <AnimatedPath  {...{ d }} fill={backgroundColor} />
                </AnimatedSvg>

                <View style={StyleSheet.absoluteFill}>
                    <StaticBar
                        value={value}
                        state={state}
                        navigation={navigation}
                        colorActive={colorActive}
                        colorInactive={colorInactive}
                        animationbutton={animationbutton}
                        speed={speed} />
                </View>

            </View>
            <SafeAreaView style={styles.container} />
        </View>
    )

})
const styles = StyleSheet.create({
    container: {
        ///flex: 1,
        // opacity: 0,
        backgroundColor,
    },
    tabBar: {
        bottom: rem / 3 + 180,
    }
});