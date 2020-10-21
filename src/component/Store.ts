import React from 'react'
import { StyleProp, ViewStyle, View, AsyncStorage } from 'react-native'

export const storeDataName = async (value: string) => {
  await AsyncStorage.setItem('@MyApp_Name', value)
  // console.warn('Data successfully saved name: ', value)
}

export const storeDataDate = async (value: Date) => {
  await AsyncStorage.setItem('@MyApp_Date', value.toString())
  // console.warn('Data successfully saved date', value)
}

export const getDataName = async () => {
  const value = await AsyncStorage.getItem('@MyApp_Name') || "Your Name"
  // console.warn('getDateName:', value)
  return value
}
export const getDataDate = async () => {
  const value = await AsyncStorage.getItem('@MyApp_Date') || new Date().toLocaleDateString()
  // console.warn('getDataDate: ', value)
  return new Date(value)
}
