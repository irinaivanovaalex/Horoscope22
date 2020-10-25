import React from 'react'
import { StyleProp, ViewStyle, View, Image } from 'react-native'


interface SplashScreenAnimatedProps {
    style?: StyleProp<ViewStyle>
}

export const SplashScreenAnimated: React.FC<SplashScreenAnimatedProps> = props => {
    const { style } = props
    return <>
        <View style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            flex: 1,

        }}>
            <Image
            source={require('../image/h.png')}
            style={{
                position: 'absolute',
                transform: [{
                    translateX: 5,
                },
                {
                    translateY: -18
                }]
            }}
            resizeMethod={"scale"}
            resizeMode={"center"}
        />
            <Image
            source={require('../image/scope.png')}
            style={{
                position: 'absolute',
                transform: [{
                    translateX: 0,
                },
                {
                    translateY: 48
                }]
            }}
            resizeMethod={"scale"}
            resizeMode={"center"}
        />
        </View>
    </>
}
