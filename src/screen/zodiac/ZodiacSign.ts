import moment from 'moment'

const strings = {
    zodiac: {
        aquarius: 'Водолей',
        pisces: 'Рыбы',
        aries: 'Овен',
        taurus: 'Телец',
        gemini: 'Близнецы',
        cancer: 'Рак',
        leo: 'Лев',
        virgo: 'Дева',
        libra: 'Весы',
        scorpio: 'Скорпион',
        sagittarius: 'Стрелец',
        capricorn: 'Козерог',
    },
}

export type ZodiacSign = {
    start: [number, number]
    end: [number, number]
    emoji: ()=>any
    title: string
    name: ZodiacName
}


export const ZodiacSigns: Record<string, ZodiacSign> = {

    CARPICORN_START_YEAR: {
        name: 'capricorn',
        title: strings.zodiac.capricorn,
        start: [1, 1],
        end: [1, 19],
        emoji:  require('../../component/capricorn.png'),
    },

    AQUARIUS: {

        start: [1, 20],

        end: [2, 18],

        emoji: require('../../component/aquarius.png'),

        title: strings.zodiac.aquarius,

        name: 'aquarius',

    },

    PISCES: {

        title: strings.zodiac.pisces,

        start: [2, 19],

        end: [3, 20],

        emoji: require('../../component/pisces.png'),

        name: 'pisces',

    },

    ARIES: {

        name: 'aries',

        title: strings.zodiac.aries,

        start: [3, 21],

        end: [4, 19],

        emoji: require('../../component/aries.png'),

    },

    TAURUS: {

        name: 'taurus',

        title: strings.zodiac.taurus,

        start: [4, 20],

        end: [5, 20],

        emoji: require('../../component/taurus.png'),

    },

    GEMINI: {

        name: 'gemini',

        title: strings.zodiac.gemini,

        start: [5, 21],

        end: [6, 20],

        emoji: require('../../component/gemini.png'),

    },

    CANCER: {

        name: 'cancer',

        title: strings.zodiac.cancer,

        start: [6, 21],

        end: [7, 22],

        emoji: require('../../component/cancer.png'),

    },

    LEO: {

        name: 'leo',

        title: strings.zodiac.leo,

        start: [7, 23],

        end: [8, 22],

        emoji: require('../../component/leo.png'),

    },

    VIRGO: {

        name: 'virgo',

        title: strings.zodiac.virgo,

        start: [8, 23],

        end: [9, 22],

        emoji: require('../../component/virgo.png'),

    },

    LIBRA: {

        name: 'libra',

        title: strings.zodiac.libra,

        start: [9, 23],

        end: [10, 22],

        emoji: require('../../component/libra.png'),

    },

    SCORPIO: {

        name: 'scorpio',

        title: strings.zodiac.scorpio,

        start: [10, 23],

        end: [11, 21],

        emoji: require('../../component/scorpio.png'),

    },

    SAGITTARIUS: {

        name: 'sagittarius',

        title: strings.zodiac.sagittarius,

        start: [11, 22],

        end: [12, 21],

        emoji: require('../../component/sagittarius.png'),

    },

    CARPICORN_END_YEAR: {

        name: 'capricorn',

        title: strings.zodiac.capricorn,

        start: [12, 22],

        end: [12, 31],

        emoji: require('../../component/capricorn.png'),

    },

}

export type ZodiacName =
    | 'aquarius'
    | 'pisces'
    | 'aries'
    | 'taurus'
    | 'gemini'
    | 'cancer'
    | 'leo'
    | 'virgo'
    | 'libra'
    | 'scorpio'
    | 'sagittarius'
    | 'capricorn'


export function getZodiacSign(day: number, month: number): ZodiacSign | undefined {
    return Object.values(ZodiacSigns).find(zodiac => {
        if (!month || !day) return false

        const itemDate = moment()
            .set('date', day)
            .set('month', month + 1)
        const startDate = moment()
            .set('date', zodiac.start[1])
            .set('month', zodiac.start[0] + 1)
        const endDate = moment()
            .set('date', zodiac.end[1])
            .set('month', zodiac.end[0] + 1)

        const isBetween = itemDate.isBetween(startDate, endDate)
        if (isBetween) return true

        const isSame = itemDate.isSame(startDate, 'date') || itemDate.isSame(endDate, 'date')

        return isSame
    })
}