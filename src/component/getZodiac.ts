import { TypeZodiac } from './TypeZodiac'
export function getZodiac(): TypeZodiac[] {
    return [{
        id: 'aries',
        title: 'aries',
        getImage: () => require('./aries.png')
    },
    {
        id: 'aquarius',
        title: 'aquarius',
        getImage: () => require('./aquarius.png')
    },
    {
        id: 'cancer',
        title: 'cancer',
        getImage: () => require('./cancer.png')
    },
    {
        id: 'capricorn',
        title: 'capricorn',
        getImage: () => require('./capricorn.png')
    },
    {
        id: 'gemini',
        title: 'gemini',
        getImage: () => require('./gemini.png')
    },
    {
        id: 'leo',
        title: 'leo',
        getImage: () => require('./leo.png')
    },
    {
        id: 'libra',
        title: 'libra',
        getImage: () => require('./libra.png')
    },
    {
        id: 'pisces',
        title: 'pisces',
        getImage:() =>  require('./pisces.png')
    },
    {
        id: 'sagittarius',
        title: 'sagittarius',
        getImage: () => require('./sagittarius.png')
    },
    {
        id: 'scorpio',
        title: 'scorpio',
        getImage: () => require('./scorpio.png')
    },
    {
        id: 'taurus',
        title: 'taurus',
        getImage: () => require('./taurus.png')
    },
    {
        id: 'virgo',
        title: 'virgo',
        getImage: () => require('./virgo.png')
    }

    ]
}

