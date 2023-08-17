import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import { Checkbox } from 'react-native-paper'
import { Controller, FieldValues, useFormContext } from 'react-hook-form'
import { SurveyCardType } from '@store/slice/cardSlice.type'
import { colors } from '@styles/theme'
import InputQuestion from './common/InputQuestion'
import InputWrapper from './common/InputWrapper'
import ErrorNotice from '@components/ErrorNotice'

export default function InputCheckbox({ id, question, options, required }: SurveyCardType) {
  const { control } = useFormContext()

  const [isError, setIsError] = useState<boolean>(false)

  const customValidate = (_: any, values: FieldValues) => {
    if (required) {
      const isValid = values[id].filter(Boolean).length > 0
      setIsError(!isValid)
      return isValid
    }

    return undefined
  }

  return (
    <InputWrapper>
      <InputQuestion question={question} required={required} />

      <View>
        {options.map((option, index) => (
          <Controller
            key={option.id}
            defaultValue={false}
            control={control}
            rules={{
              validate: customValidate,
            }}
            render={({ field: { onChange, value } }) => (
              <View key={option.id} style={styles.optionContainer}>
                <Checkbox.Android
                  style={styles.checkbox}
                  color={colors.purpleDark}
                  status={value ? 'checked' : 'unchecked'}
                  onPress={() => {
                    onChange(!value)
                  }}
                />
                <Text>{option.text}</Text>
              </View>
            )}
            name={`${id}[${index}]`}
          />
        ))}
      </View>
      {!!isError && <ErrorNotice message={'필수 질문입니다.'} />}
    </InputWrapper>
  )
}

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,
  },
})
