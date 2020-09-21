import React, { useState } from 'react';
import { HoroscopeType } from './CarouselHoroscopeCompatibility';
import { ZodiacName, ZodiacSigns } from './zodiac/ZodiacSign';
import { StyleProp, ViewStyle, View } from 'react-native'

type SelectedZodiac = { [key in HoroscopeType]: ZodiacName }
type SelectZodiac = {
    setSelectedZodiac: (value: SelectedZodiac) => void
}

const ContextSelectedZodiac = React.createContext<SelectedZodiac & SelectZodiac>({
    man: 'gemini',
    woman: "gemini",
    setSelectedZodiac: (value: SelectedZodiac) => {}
});

export const useSelectedZodiac = () => React.useContext(ContextSelectedZodiac)

export const SelectedZodiacProvider: React.FC = props => {
    const [value, setValue] = useState<SelectedZodiac>({
        man: "gemini",
        woman: "gemini",
    })
    return <ContextSelectedZodiac.Provider value={[value, setValue]}>
        {props.children}
    </ContextSelectedZodiac.Provider>
}
