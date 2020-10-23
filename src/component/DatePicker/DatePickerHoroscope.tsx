import { observer } from 'mobx-react'
import React from 'react'
import { StyleProp, ViewStyle, View, StyleSheet } from 'react-native'
import DatePicker, { DatePickerCustomStylesProps } from 'react-native-datepicker'
import { storeHoroscope } from '../store/StoreHoroscope'

interface DatePickerHoroscopeProps {
    style?: StyleProp<ViewStyle>
}

export const DatePickerHoroscope: React.FC<DatePickerHoroscopeProps> = observer(props => {
    return <DatePicker
        date={storeHoroscope.dateBirthday}
        mode="date"
        format="DD-MM-YYYY"
        minDate="01-05-1900"
        maxDate={new Date()}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        androidMode="spinner"
        showIcon={false}
        allowFontScaling={true}
        customStyles={customStylesDatePiker}
        onDateChange={async (dateStr, date) => {
            storeHoroscope.changeDateBirthday(date)
        }}
    >
    </DatePicker>
})

const customStylesDatePiker: DatePickerCustomStylesProps = {

    dateText: {
        fontFamily: 'Montserrat-Light',
        fontSize: 18,
        color: '#e6e4e2'
    },
    dateIcon: {
        left: 0,
        top: 0,
        marginLeft: 0,
    },
    dateInput: {
        borderWidth: 0,
        marginEnd: 1,
        alignItems: 'flex-end',

    },
}