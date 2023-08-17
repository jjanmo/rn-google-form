import { StyleSheet, Text, View } from 'react-native'
import { Checkbox } from 'react-native-paper'
import { Controller, useFormContext } from 'react-hook-form'
import { SurveyCardType } from '@store/slice/cardSlice.type'
import { colors } from '@styles/theme'
import InputQuestion from './common/InputQuestion'
import InputWrapper from './common/InputWrapper'
import ErrorNotice from '@components/ErrorNotice'

export default function InputCheckbox({ id, question, options, required }: SurveyCardType) {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <InputWrapper>
      <InputQuestion question={question} required={required} />

      <View>
        {options.map((option, index) => (
          <Controller
            key={option.id}
            control={control}
            rules={{
              required,
            }}
            render={({ field: { onChange, value } }) => (
              <>
                <View style={styles.optionContainer}>
                  <Checkbox.Android
                    style={styles.checkbox}
                    color={colors.purpleDark}
                    status={value ? 'checked' : 'unchecked'}
                    onPress={() => onChange(!value)}
                  />
                  <Text>{option.text}</Text>
                </View>
                {errors[id] && <ErrorNotice message={'필수 질문입니다.'} />}
              </>
            )}
            name={`${id}[${index}]`}
          />
        ))}
      </View>
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
