import { useActionSheet } from '@expo/react-native-action-sheet'
import { Button } from '@react-native-material/core'
import { useDispatch } from 'react-redux'
import { StyleSheet } from 'react-native'
import { colors } from '@styles/theme'
import { cardActions } from '@store/slice/cardSlice'
import { SurveyCardTypeKey } from '@store/slice/cardSlice.type'

interface Props {
  id: string
}

export default function CardTypeSelector({ id }: Props) {
  const dispatch = useDispatch()
  const { showActionSheetWithOptions } = useActionSheet()

  const onPress = () => {
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
        dispatch(cardActions.changeCardType({ id, type }))
      }
    )
  }

  return (
    <Button title="설문지 타입 설정" variant="outlined" onPress={onPress} color={colors.greyDark} />
  )
}

const typeMap: Record<string, SurveyCardTypeKey> = {
  단답형: 'short',
  장문형: 'long',
  '객관식 질문': 'radio',
  체크박스: 'checkbox',
}
