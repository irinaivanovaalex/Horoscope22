import Axios from "axios"
import { EntriesType } from "../screen/ProfileScreen"
import cheerio from 'react-native-cheerio'
import { ZodiacSigns, ZodiacName } from "../screen/zodiac/ZodiacSign"
import { useColorScheme } from "react-native"
import { entriesList } from "./store/StoreEntries"
import { storeHoroscope } from "./store/StoreHoroscope"

export async function parseHoroscope(zodiac: string, title: string, day: string) {
  const url = "https://horoscopes.rambler.ru/" + zodiac + title + day
  const response = await Axios.get(url)
  const $ = cheerio.load(response.data)
  const classItems = $(
    '#app > main > div._3Hki > div > div > section > div._2eGr > div > div > span ',
  ).toArray()
  console.log('?', classItems[0].children[0].data)
  return classItems[0].children[0].data
}

export async function parseHoroscopeP(zodiac: string, title: string, day: string) {
  const url = "https://horoscopes.rambler.ru/" + zodiac + title + day
  const response = await Axios.get(url)
  const $ = cheerio.load(response.data)
  const classItems = $(
    '#app > main > div._3Hki > div > div > section > div._2eGr > div > div > span> p ',
  ).toArray()
  return classItems[0].children[0].data
}

export const fetchItem = async (zodiac: string, title: string, day: string) => {
  const result: string = await parseHoroscope(zodiac, title, day)
  if (result === undefined) {
    const resultP: string = await parseHoroscopeP(zodiac, title, day)
    return resultP
  } else {
    return result
  }
}

export async function fetchHoroscope(zodiacParametr: string | ZodiacName, title: string, type: 'standart' | 'love' | 'finance') {
  const horoscopes = [
    await fetchItem(zodiacParametr, title, 'yesterday'),
    await fetchItem(zodiacParametr, title, ''),
    await fetchItem(zodiacParametr, title, 'tomorrow')
  ]
  console.log('horoscopes =', horoscopes)
  await entriesList.changeEntries(type, horoscopes)
  storeHoroscope.changeAnimation(type, false)
  console.warn('type', type, 'entriesListCareer = ', entriesList.entriesCareer, 'entriesList = ', entriesList.entries, 'entriesListLove = ', entriesList.entriesLove)
}