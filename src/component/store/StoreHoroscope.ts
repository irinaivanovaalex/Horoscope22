import { action, makeObservable, observable } from "mobx";
import { getZodiacSign, ZodiacName, ZodiacSign } from "../../screen/zodiac/ZodiacSign";
import { fetchHoroscope } from "../fetchHoroscope";
import { getDataDate, storeDataDate } from "../Store";
import { entriesList } from "./StoreEntries";


export class StoreHoroscope {

    dateBirthday: Date = new Date
    animationStandart: boolean = false
    animationLove: boolean = false
    animationFinance: boolean = false
    zodiacSing: ZodiacSign = {
        name: 'capricorn',
        title: 'Козерог',
        titleru: 'kozerog',
        start: [1, 1],
        end: [1, 19],
        emoji: require('../../component/image/capricorn.png'),
    }

    async init() {
        if (await getDataDate()) this.dateBirthday = await getDataDate()
        this.zodiacSing = getZodiacSign(this.dateBirthday.getDate(), this.dateBirthday.getMonth() + 1)
        this.fetchHoroscopeStore(this.zodiacSing.name)
    }

    changeDateBirthday(date: Date) {
        this.dateBirthday = date
        storeDataDate(date)
        this.zodiacSing = getZodiacSign(date.getDate(), date.getMonth() + 1)
        this.fetchHoroscopeStore(this.zodiacSing.name)
    }
    changeAnimation(type: 'standart' | 'love' | 'finance', value: boolean) {
        if (type === 'standart') {
            this.animationStandart = value
        } else if (type === 'finance') {
            this.animationFinance = value
        } else this.animationLove = value
    }
    async fetchHoroscopeStore(name: ZodiacName) {
        await entriesList.clearEntries()
        await fetchHoroscope(name, '/career/', 'finance')
        await fetchHoroscope(name, '/', 'standart')
        await fetchHoroscope(name, '/erotic/', 'love')
        console.warn('fetchHoroscopeStore = ', name)
    }
    constructor() {
        makeObservable(this, {
            dateBirthday: observable,
            animationFinance: observable,
            animationLove: observable,
            animationStandart: observable,
            zodiacSing: observable,
            init: action,
            changeAnimation: action,
            changeDateBirthday: action
        })
    }
}

export const storeHoroscope = new StoreHoroscope()