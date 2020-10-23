import React from 'react'
import { StyleProp, ViewStyle, View, Image } from 'react-native'

interface ImageBackgroundProps {
    style?: StyleProp<ViewStyle>
}

export const ImageBackground: React.FC<ImageBackgroundProps> = props => {
    const { style } = props
    return <Image
        source={require('./space3.jpg')}
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
}
