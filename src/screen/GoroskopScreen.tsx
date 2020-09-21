import React, { useState, useRef, useEffect } from 'react'
import { StyleProp, ViewStyle, View, TextInput, StyleSheet, Text, Image, Platform, Dimensions, TouchableOpacity } from 'react-native'
import MaskedView from '@react-native-community/masked-view';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';

interface GoroskopScreenProps {
    style?: StyleProp<ViewStyle>
}

export const { width: screenWidth } = Dimensions.get('window')
export const {height: screenHeight} = Dimensions.get('window')

export const GoroskopScreen: React.FC<GoroskopScreenProps> = props => {
    const { style } = props
    return (<></>)
}