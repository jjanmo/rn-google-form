import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Controller, useFormContext } from 'react-hook-form'
import { RadioButton } from 'react-native-paper'
import { SurveyCardType } from '@store/slice/cardSlice.type'
import { colors } from '@styles/theme'
import InputQuestion from './common/InputQuestion'
import InputWrapper from './common/InputWrapper'

export default function InputRadio({ id, question, options, required }: SurveyCardType) {
  const { control } = useFormContext()

  return (
    <InputWrapper>
      <InputQuestion question={question} required={required} />

      <View>
        <Controller
          control={control}
          rules={{
            required,
          }}
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              {options.map((option) => (
                <View key={option.id} style={styles.optionContainer}>
                  <RadioButton.Android
                    value={option.id}
                    color={colors.purpleDark}
                    uncheckedColor={colors.grey}
                  />
                  <Text>{option.text}</Text>
                </View>
              ))}
            </RadioButton.Group>
          )}
          name={`${id}`}
        />
      </View>
    </InputWrapper>
  )
}

const styles = StyleSheet.create({
  questionContainer: {
    flexDirection: 'row',
    marginBottom: 5,
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
})
