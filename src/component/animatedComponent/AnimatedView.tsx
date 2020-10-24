import React, { useEffect, useMemo } from 'react'
import { StyleProp, ViewStyle, View, Animated, Image } from 'react-native'
import { accelerometer } from 'react-native-sensors'


interface AnimatedViewProps {
    style?: StyleProp<ViewStyle>
}

export const AnimatedView: React.FC<AnimatedViewProps> = props => {
    const { style } = props
    const animatedX = useMemo(() => new Animated.Value(0), [])
    const animatedY = useMemo(() => new Animated.Value(0), [])
    
    function decayX(xPar: number) {
        Animated.decay(
            animatedX,
            {
                velocity: 0.4,
                deceleration: 0.6,
                useNativeDriver: true,
            }
        ).start()
    }
    function decayY(yPar: number) {
        Animated.decay(
            animatedY,
            {
                velocity: 0.4,
                deceleration: 0.6,
                useNativeDriver: true,
            }
        ).start()
    }
    
    useEffect(() => {
        accelerometer.subscribe(({ x, y, z, }) => {
            animatedX.setValue(x)
            animatedY.setValue(y)
            decayX(x)
            decayY(y)
            console.log(JSON.stringify({ x, y, z, }, null, '  '))
        })
    }, [])
    return (
        <Animated.View style={{
            transform: [{
                translateX: animatedX.interpolate({
                    inputRange: [-10, 0, 10],
                    outputRange: [-50, 0, 50],
                })
            }, {
                translateY: animatedY.interpolate({
                    inputRange: [-10, 0, 10],
                    outputRange: [-100 - (-50), -100, -100 - (50)],
                })
            },],


        }}>
            <Image
                source={require('../image/space3.jpg')}
                blurRadius={0.2}
                style={{
                    alignSelf: 'center',
                    alignContent: 'center',
                    position: 'absolute',
                    opacity: 0.3,
                }}
            />
        </Animated.View>
    )
}
