import { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { TextInput } from '@react-native-material/core'
import { SurveyCardType } from '@store/slice/cardSlice.type'
import { colors } from '@styles/theme'
import InputQuestion from './common/InputQuestion'
import InputWrapper from './common/InputWrapper'
import { Controller, useFormContext } from 'react-hook-form'
import ErrorNotice from '@components/ErrorNotice'

export default function InputTextField({ id, question, required, type }: SurveyCardType) {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const [isShort, setIsShort] = useState<boolean>(false)

  useEffect(() => {
    setIsShort(type === 'short' ? true : false)
  }, [type])

  return (
    <InputWrapper>
      <InputQuestion question={question} required={required} />
      <Controller
        control={control}
        rules={{
          required,
        }}
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="내 답변"
              variant={isShort ? 'standard' : 'outlined'}
              inputContainerStyle={isShort ? styles.shortInputContainer : null}
              inputStyle={isShort ? null : styles.longInput}
              selectionColor="grey"
              color={colors.purpleDark}
              maxLength={isShort ? 10 : 500}
              multiline={!isShort}
            />
            {errors[id] && <ErrorNotice message={'필수 질문입니다.'} />}
          </>
        )}
        name={id}
      />
    </InputWrapper>
  )
}

const styles = StyleSheet.create({
  shortInputContainer: {
    width: '50%',
  },
  longInput: {
    height: 100,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
  },
})
