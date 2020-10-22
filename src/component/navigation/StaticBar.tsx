import { CommonActions, TabActions, TabNavigationState } from '@react-navigation/native';
import React, { forwardRef, useMemo, useState } from 'react'
import { StyleProp, ViewStyle, View, Dimensions, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import { observer } from 'mobx-react';
import { Animated } from 'react-native';


interface StaticBarProps {
    style?: StyleProp<ViewStyle>
    value: Animated.Value;
    state: TabNavigationState
    navigation: any
    colorActive?: string,
    colorInactive?: string,
    animationbutton?: 'top' | 'bottom'
    speed: number
}
const { width: rem } = Dimensions.get("window");
export const StaticBar: React.FC<StaticBarProps> = observer(props => {
    const { style, value, state, navigation, colorActive, colorInactive, animationbutton, speed } = props
    const [indexValue, setIndexValue] = useState(0)
    const values: Animated.Value[] = useMemo(() => state.routeNames.map(
        (key, index) => {
            return new Animated.Value(index === indexValue ? 1 : 0)
        }), [])
    const translateYCustom = (animationbutton === 'top') ? -30 : 30

    const onPress = (index: number) => {
        const tabWidth = rem / (state?.routeNames.length || 3)

        return (
            Animated.sequence([
                Animated.parallel(
                    values.map(v => Animated.timing(v, {
                        toValue: 0,
                        duration: speed,
                        useNativeDriver: true,
                    }))
                ),
                Animated.parallel([
                    Animated.spring(value, {
                        toValue: tabWidth * index,
                        useNativeDriver: true,
                    }),
                    Animated.spring(values[index], {
                        toValue: 1,
                        useNativeDriver: true,
                    })
                ])
            ]).start())
    }

    console.log("render")
    onPress(state.index)
    return <View style={styles.container}>
        {
            state?.routes.map((route, key) => {
                console.log('index', key)
                console.log('tabStore', state.routeNames)
                console.log('values', values)

                const tabWidth = useMemo(() => rem / state?.routeNames.length, [])
                const cursor = useMemo(() => tabWidth * key, [key])

                const opacity = useMemo(() => value.interpolate({
                    inputRange: [cursor - tabWidth, cursor, cursor + tabWidth],
                    outputRange: [1, 0, 1],
                    extrapolate: 'clamp',
                }), [])
                const translateY = useMemo(() => values[key].interpolate({
                    inputRange: [0, 1],
                    outputRange: [translateYCustom, 0],
                    extrapolate: 'clamp',
                }), [])

                const opacity1 = useMemo(() => values[key].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                    extrapolate: 'clamp'
                }), [])
                return (
                    <React.Fragment {...{ key }}>
                            <TouchableWithoutFeedback
                                key={route.key}
                                onPress={() => {
                                    //onPress(key)

                                    const event = navigation.emit({
                                        type: 'tabPress',
                                        target: route.key,
                                        data: {
                                            isAlreadyFocused: route.key === state.routes[state.index].key,
                                        },
                                    });
                                    if (!event.defaultPrevented) {
                                        setIndexValue(key)

                                        navigation.dispatch({
                                            ...CommonActions.navigate(route.name),
                                            //...TabActions.jumpTo(route.name),
                                            target: state.key,
                                        });
                                    }
                                    console.log("render2")

                                }}
                                style={{ flex: 1 }}
                            >
                                <Animated.View style={[
                                    styles.tab,
                                    { opacity },
                                ]}>
                                    <Icon
                                        name={route.name}
                                        color={colorInactive ? colorInactive : 'gray'}
                                        size={25} />
                                </Animated.View>
                            </TouchableWithoutFeedback>
                            <Animated.View style={{
                                position: "absolute",
                                top: -8,
                                left: tabWidth * key,
                                width: tabWidth,
                                height: 64,
                                justifyContent: "center",
                                alignItems: "center",
                                opacity: opacity1,
                                transform: [{ translateY }],
                            }}>
                                <View style={styles.activeIcon}>
                                    <Icon
                                        name={route.name}
                                        color={colorActive ? colorActive : 'black'}
                                        size={25} />
                                </View>
                            </Animated.View>
                        
                    </React.Fragment>
                )
            })}
    </View>
})
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",

    },
    tab: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 64,

    },
    activeIcon: {
        backgroundColor: "rgba(230, 228, 226, 0.9)",
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    main: {
        flex: 3,
        position: 'absolute',
    }
});