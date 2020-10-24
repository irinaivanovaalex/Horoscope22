import { action, computed, makeObservable, observable } from 'mobx'
import Axios from 'axios'
import cheerio from 'react-native-cheerio'
import { storeCompatibility } from './StoreCompatibility'

export async function parseH(zodiacWomen: string, zodiacMan: string) {
    const url = "https://horoscopes.rambler.ru/" + 'sovmestimost-znakov-zodiaka/zhenshhina-' + zodiacWomen + '-muzhchina-' + zodiacMan
    const response = await Axios.get(url)
    const $ = cheerio.load(response.data)
    const classItems = $(
        '#app > main > div.content._3Hki > div > div > section > div._3AUe',
    ).toArray()
    const textParse = [
        {
            title: classItems[0].children[0].children[1].children[0].data || '',
            text: classItems[0].children[0].children[2].children[0].data || '',
        },
        {
            title: classItems[0].children[2].children[1].children[0].data || '',
            text: classItems[0].children[2].children[2].children[0].data || '',
        },
        {
            title: classItems[0].children[3].children[3].children[0].data || '',
            text: classItems[0].children[3].children[4].children[0].data || '',
        },
        {
            title: classItems[0].children[4].children[1].children[0].data || '',
            text: classItems[0].children[4].children[2].children[0].data || '',
        }
    ]
    console.log('parseH', textParse)
    return textParse
}

export class StoreCompatibilityParser {
    dataParser = [{
        title: '',
        text: '',
    },
    {
        title: '',
        text: '',
    },
    {
        title: '',
        text: '',
    },
    {
        title: '',
        text: '',
    }]

    async setDataParser(zodiacWomen: string, zodiacMan: string) {
        this.dataParser = await parseH(zodiacWomen, zodiacMan)
        storeCompatibility.changeAnimatedCompatibility(0)
        storeCompatibility.changeAnimatedCompatibility(1)
        storeCompatibility.changeAnimatedCompatibility(2)
        storeCompatibility.changeAnimatedCompatibility(3)
    }

    constructor() {
        makeObservable(this, {
            dataParser: observable,
            setDataParser: action,
        })
    }

}
export const storeCompatibilityParser = new StoreCompatibilityParser()