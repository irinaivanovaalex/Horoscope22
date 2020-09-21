import Axios from "axios"
import { EntriesType } from "../screen/ProfileScreen"
import cheerio from 'react-native-cheerio'
import { ZodiacSigns,ZodiacName } from "../screen/zodiac/ZodiacSign"
import { useColorScheme } from "react-native"

export async function parseHoroscope(zodiac: string, title: string, day: string) {
    const url = "https://horoscopes.rambler.ru/" + zodiac + title + day
    const response = await Axios.get(url)
    const $ = cheerio.load(response.data)
    const classItems = $(
      '#app > main > div._3Hki > div > div > section > div._2eGr > div > div > span ',
    ).toArray()
        console.log('?',classItems[0].children[0].data)
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
    if (result === undefined){
        const resultP: string = await parseHoroscopeP(zodiac, title, day)
        return resultP
    } else {
        return result
    }
  }

export async function fetchHoroscope(
    zodiacParametr: string | ZodiacName,
    title: string,
    setAnimated: (isEnabled: React.SetStateAction<boolean>) => void,
    entriesItem: EntriesType[],
    setEntriesItem: (entriesItemIndex: React.SetStateAction<EntriesType[]>) => void) {
    const horoscopes = [
      await fetchItem( zodiacParametr, title, 'yesterday'),
      await fetchItem( zodiacParametr, title, ''),
      await fetchItem( zodiacParametr, title, 'tomorrow')
    ]
    setAnimated(false)
    const dateHoroscope = entriesItem.map((item, index) => {
      return {
        ...item,
        description: horoscopes[index],

      }

    })
    setEntriesItem(dateHoroscope)
  }
