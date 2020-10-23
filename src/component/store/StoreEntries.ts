import { action, makeObservable, observable } from "mobx";
import moment from "moment";
import { acc } from "react-native-reanimated";


export type EntriesType = {
    id: string;
    description: string | Promise<String>;
    date: string;
}

export class Entries {
    entriesItem: EntriesType[] = []
    entriesCareer: EntriesType[] = [
        {
            id: '7',
            description: '',
            date: moment().add(0, 'day').format('LL').toString()
        },
        {
            id: '8',
            description: '',
            date: moment().add(0, 'day').format('LL').toString()
        },
        {
            id: '9',
            description: '',
            date: moment().add(0, 'day').format('LL').toString()
        }
    ]
    entries: EntriesType[] = [
        {
            id: '1',
            description: '',
            date: moment().add(-1, 'day').format('LL').toString(),
        },
        {
            id: '2',
            description: '',
            date: moment().add(0, 'day').format('LL').toString(),
        },
        {
            id: '3',
            description: '',
            date: moment().add(1, 'day').format('LL').toString(),
        }]

    entriesLove: EntriesType[] = [
        {
            id: '4',
            description: '',
            date: moment().add(-1, 'day').format('LL').toString(),
        },
        {
            id: '5',
            description: '',
            date: moment().add(0, 'day').format('LL').toString(),
        },
        {
            id: '6',
            description: '',
            date: moment().add(1, 'day').format('LL').toString(),
        },
    ]
    async changeEntries(type: 'standart' | 'love' | 'finance', horoscopes: string[]) {
        if (type === 'finance') {
            this.entriesCareer = this.entriesCareer.map((item, index) => {
                return {
                    ...item,
                    description: horoscopes[index],
                }
            }
            )
        } else if (type === 'love') {
            this.entriesLove = this.entriesLove.map((item, index) => {
                return {
                    ...item,
                    description: horoscopes[index],
                }
            })
        } else {
            this.entries = this.entries.map((item, index) => {
                return {
                    ...item,
                    description: horoscopes[index],
                }
            })
        }
    }
    constructor() {
        makeObservable(this, {
            entries: observable,
            entriesCareer: observable,
            entriesItem: observable,
            entriesLove: observable,
            changeEntries: action
        })
    }
}

export const entriesList = new Entries()