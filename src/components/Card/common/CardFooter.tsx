import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Switch, Divider } from '@react-native-material/core'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '@store/root'
import { SurveyCardType } from '@store/slice/cardSlice.type'
import { cardActions } from '@store/slice/cardSlice'
import { findCardData } from '@store/helper'
import { colors } from '@styles/theme'
import Button from '@components/Button'

interface Props {
  id: string
}

export default function CardFooter({ id }: Props) {
  const required = useSelector<RootState, boolean>(
    (state) => (findCardData(state.cards.data, id).card as SurveyCardType).required,
    shallowEqual
  )
  const dispatch = useDispatch()

  const handleChange = () => {
    dispatch(cardActions.updateRequired({ id }))
  }
  const handlePressCopy = () => {
    dispatch(cardActions.copyCard({ id }))
  }
  const handlePressDelete = () => {
    dispatch(cardActions.deleteCard({ id }))
  }

  return (
    <>
      <Divider style={styles.divider} />
      <View style={styles.container}>
        <View style={styles.switchContainer}>
          <Text>필수</Text>
          <Switch
            value={required}
            onValueChange={handleChange}
            thumbColor={required ? colors.purpleDark : colors.white}
            trackColor={{ true: colors.purpleLight, false: colors.grey }}
            style={styles.switch}
          />
        </View>
        <Button
          buttonText="항목 복제"
          renderIcon={() => (
            <MaterialCommunityIcons name="content-copy" size={18} color={colors.greyDark} />
          )}
          onPress={handlePressCopy}
        />
        <Button
          buttonText="항목 삭제"
          renderIcon={() => (
            <MaterialCommunityIcons name="delete-outline" size={22} color={colors.greyDark} />
          )}
          onPress={handlePressDelete}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  divider: {
    marginTop: 10,
  },
  container: {
    paddingRight: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  switchContainer: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  switch: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
  },
  button: {
    marginHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    marginRight: 5,
  },
})
