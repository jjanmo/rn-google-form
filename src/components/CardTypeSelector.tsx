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
}

export default function CardTypeSelector({ id }: Props) {
  const dispatch = useDispatch()
  const { showActionSheetWithOptions } = useActionSheet()
  const [type, setType] = useState('객관식 질문')

  const handlePress = () => {
    const options = ['단답형', '장문형', '객관식 질문', '체크박스', '취소']

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: 4,
      },
      (i?: number) => {
        if (i === 4) return

        const typeKey = options[i as number]
        const type = typeMap[typeKey]
        dispatch(cardActions.updateCardType({ id, type }))
        setType(typeKey)
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
      <Text style={styles.text}>{type}</Text>
    </View>
  )
}

const typeMap: Record<string, SurveyCardTypeKey> = {
  단답형: 'short',
  장문형: 'long',
  '객관식 질문': 'radio',
  체크박스: 'checkbox',
}

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
