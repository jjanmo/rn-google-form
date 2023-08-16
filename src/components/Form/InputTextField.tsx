import { useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from '@react-native-material/core'
import { SurveyCardType } from '@store/slice/cardSlice.type'
import { colors } from '@styles/theme'
import InputQuestion from './common/InputQuestion'
import InputWrapper from './common/InputWrapper'

export default function InputTextField({ question, required, type }: SurveyCardType) {
  const isShort = useRef<boolean>(type === 'short')
  const [value, setValue] = useState('')

  const handleChangeAnswer = (text: string) => {
    setValue(text)
  }

  return (
    <InputWrapper>
      <InputQuestion question={question} required={required} />

      <TextInput
        value={value}
        onChangeText={handleChangeAnswer}
        placeholder="내 답변"
        variant="standard"
        inputContainerStyle={isShort.current ? styles.half : null}
        selectionColor="grey"
        color={colors.purpleDark}
      />
    </InputWrapper>
  )
}

const styles = StyleSheet.create({
  half: {
    width: '50%',
  },
})
