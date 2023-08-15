import { cardActions } from '@store/slice/cardSlice'
import { SurveyCardTypeKey } from '@store/slice/cardSlice.type'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '@styles/theme'
import { useState } from 'react'
import { TextInput } from '@react-native-material/core'

interface Props {
  type: SurveyCardTypeKey
  id: string
  index: number
  optionText: string
  length: number
}

export default function Option({ type, id, index, optionText, length }: Props) {
  const dispatch = useDispatch()
  const [value, setValue] = useState(optionText)

  const handleChangeOption = (text: string) => {
    setValue(text)
  }
  const handleBlur = () => {
    const optionText = value || `옵션 ${index + 1}`
    dispatch(cardActions.editSurveyCardOption({ id, index, option: optionText }))
  }
  const handlePressDeleteOption = () => {
    dispatch(cardActions.deleteOption({ id, index, option: optionText }))
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {type === 'checkbox' ? (
          <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color={colors.greyDark} />
        ) : (
          <MaterialCommunityIcons name="radiobox-blank" size={24} color={colors.greyDark} />
        )}

        <TextInput
          style={styles.questionInput}
          value={value}
          onChangeText={handleChangeOption}
          selectionColor={colors.greyDark}
          onBlur={handleBlur}
          variant="standard"
        />
      </View>

      {length > 1 && (
        <TouchableOpacity onPress={handlePressDeleteOption}>
          <MaterialCommunityIcons name="delete" size={24} color={colors.greyDark} />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  innerContainer: {
    width: '92%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: '500',
  },
})
