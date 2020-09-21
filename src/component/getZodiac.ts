import { TypeZodiac } from './TypeZodiac'
export function getZodiac(): TypeZodiac[] {
    return [{
        id: 'aries',
        title: 'aries',
        getImage: () => require('./image/aries.png')
    },
    {
        id: 'aquarius',
        title: 'aquarius',
        getImage: () => require('./image/aquarius.png')
    },
    {
        id: 'cancer',
        title: 'cancer',
        getImage: () => require('./image/cancer.png')
    },
    {
        id: 'capricorn',
        title: 'capricorn',
        getImage: () => require('./image/capricorn.png')
    },
    {
        id: 'gemini',
        title: 'gemini',
        getImage: () => require('./image/gemini.png')
    },
    {
        id: 'leo',
        title: 'leo',
        getImage: () => require('./image/leo.png')
    },
    {
        id: 'libra',
        title: 'libra',
        getImage: () => require('./image/libra.png')
    },
    {
        id: 'pisces',
        title: 'pisces',
        getImage:() =>  require('./image/pisces.png')
    },
    {
        id: 'sagittarius',
        title: 'sagittarius',
        getImage: () => require('./image/sagittarius.png')
    },
    {
        id: 'scorpio',
        title: 'scorpio',
        getImage: () => require('./image/scorpio.png')
    },
    {
        id: 'taurus',
        title: 'taurus',
        getImage: () => require('./image/taurus.png')
    },
    {
        id: 'virgo',
        title: 'virgo',
        getImage: () => require('./image/virgo.png')
    }

    ]
}

