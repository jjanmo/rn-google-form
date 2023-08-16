import { SurveyCardType } from '@store/slice/cardSlice.type'
import { StyleSheet, Text, View } from 'react-native'
import InputWrapper from './InputWrapper'
import { colors } from '@styles/theme'
import { TextInput } from '@react-native-material/core'
import { useRef, useState } from 'react'

export default function InputTextField({ question, required, type }: SurveyCardType) {
  const isShort = useRef<boolean>(type === 'short')
  const [value, setValue] = useState('')

  const handleChangeAnswer = (text: string) => {
    setValue(text)
  }

  return (
    <InputWrapper>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question}</Text>
        {required && <Text style={styles.required}>*</Text>}
      </View>
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
  questionContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  questionText: {
    fontSize: 20,
  },
  required: {
    fontSize: 20,
    color: colors.red,
  },
  half: {
    width: '50%',
  },
})
