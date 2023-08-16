import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Checkbox } from 'react-native-paper'
import { SurveyCardType } from '@store/slice/cardSlice.type'
import { colors } from '@styles/theme'
import InputWrapper from './InputWrapper'

export default function InputCheckbox({ question, options, required }: SurveyCardType) {
  const [checkboxes, setCheckboxes] = useState(
    options.reduce<Record<string, boolean>>((acc, cur) => ({ ...acc, [cur.id]: false }), {})
  )

  const handleCheckboxToggle = (id: string) => () => {
    const updatedCheckboxes = {
      ...checkboxes,
      [id]: !checkboxes[id],
    }
    setCheckboxes(updatedCheckboxes)
  }

  return (
    <InputWrapper>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question}</Text>
        {required && <Text style={styles.required}>*</Text>}
      </View>
      <View>
        {options.map((option) => (
          <View key={option.id} style={styles.optionContainer}>
            <Checkbox.Android
              style={styles.checkbox}
              color={colors.purpleDark}
              status={checkboxes[option.id] ? 'checked' : 'unchecked'}
              onPress={handleCheckboxToggle(option.id)}
            />
            <Text>{option.text}</Text>
          </View>
        ))}
      </View>
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
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,
  },
})
