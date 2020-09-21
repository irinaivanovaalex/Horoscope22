import moment from 'moment';
import React, { useState } from 'react'
import { StyleProp, ViewStyle, View } from 'react-native'
import { EntriesType } from '../screen/ProfileScreen';

interface EntriesLoveComponentProps {
  style?: StyleProp<ViewStyle>
}

export const EntriesLoveComponent: React.FC<EntriesLoveComponentProps> = props => {
  const { style } = props
  const [entriesLove, setEntriesLove] = useState<EntriesType[]>([
    {
      id: '4',
      description: '',
      date: moment().add(-1, 'day').format('LL').toString(),
      subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
      illustration: 'https://5sfer.com/wp-content/uploads/2015/08/8ipwnn.jpg',
    },
    {
      id: '5',
      description: '',
      date: moment().add(0, 'day').format('LL').toString(),
      subtitle: 'Lorem ipsum dolor sit amet',
      illustration: 'https://i.ytimg.com/vi/dX8kSHknlyU/maxresdefault.jpg',
    },
    {
      id: '6',
      description: '',
      date: moment().add(1, 'day').format('LL').toString(),
      subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
      illustration: 'https://cdni.rt.com/russian/images/2019.08/article/5d63aa84370f2c6e1d8b4589.jpg',
    },

  ]);
  return <View style={style}></View>
}
