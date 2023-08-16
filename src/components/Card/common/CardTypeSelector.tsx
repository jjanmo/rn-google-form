import { useActionSheet } from '@expo/react-native-action-sheet'
import { Button, Text } from '@react-native-material/core'
import { useDispatch } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import { colors } from '@styles/theme'
import { cardActions } from '@store/slice/cardSlice'
import { SurveyCardTypeKey } from '@store/slice/cardSlice.type'
import { useState } from 'react'

interface Props {
  id: string
  type: SurveyCardTypeKey
}

export default function CardTypeSelector({ id, type }: Props) {
  const dispatch = useDispatch()
  const { showActionSheetWithOptions } = useActionSheet()
  const [optionType, setOptionType] = useState(type)

  const handlePress = () => {
    showActionSheetWithOptions(
      {
        options: options.map((o) => o.ko).concat(['취소']),
        cancelButtonIndex: 4,
      },
      (i?: number) => {
        if (i === 4) return

        const option = options[i!]
        const type = option.type
        dispatch(cardActions.updateCardType({ id, type }))
        setOptionType(type)
      }
    )
  }

  return (
    <View style={styles.container}>
      <Button
        title="설문지 타입 설정"
        variant="outlined"
        onPress={handlePress}
        color={colors.greyDark}
        style={styles.button}
      />
      <Text style={styles.text}>{options.find((option) => option.type === optionType)?.ko}</Text>
    </View>
  )
}

type Option = {
  ko: string
  type: SurveyCardTypeKey
}
const options: Option[] = [
  {
    ko: '단답형',
    type: 'short',
  },
  {
    ko: '장문형',
    type: 'long',
  },
  {
    ko: '객관식 질문',
    type: 'radio',
  },
  {
    ko: '체크박스',
    type: 'checkbox',
  },
]

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: '50%',
  },
  text: {
    width: '45%',
    paddingVertical: 8,
    fontSize: 18,
    textAlign: 'center',
    color: colors.greyDark,
    backgroundColor: colors.greyLight,
  },
})
