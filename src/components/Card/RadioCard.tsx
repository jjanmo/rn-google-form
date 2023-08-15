import { Button, TextInput } from '@react-native-material/core'
import { StyleSheet, View } from 'react-native'
import CardWrapper from './CardWrapper'
import { colors } from '@styles/theme'
import CardTypeSelector from '@components/CardTypeSelector'
import { SurveyCardType } from '@store/slice/cardSlice.type'
import { useDispatch } from 'react-redux'
import { cardActions } from '@store/slice/cardSlice'
import Option from '@components/Option'

export default function RadioCard({ id, type, question, options }: SurveyCardType) {
  const dispatch = useDispatch()
  const handleChangeQuestion = (text: string) => {
    dispatch(cardActions.editSurveyCardText({ question: text, id }))
  }
  const handlePressAddOption = () => {
    dispatch(cardActions.addOption({ id }))
  }

  return (
    <CardWrapper id={id}>
      <View style={styles.container}>
        <TextInput
          value={question}
          onChangeText={handleChangeQuestion}
          placeholder="질문"
          variant="filled"
          inputStyle={styles.questionInput}
          inputContainerStyle={styles.questionInputContainer}
          selectionColor={colors.greyDark}
          color={colors.purpleDark}
        />
        <CardTypeSelector id={id} />
        <View style={styles.optionContainer}>
          {options.map((option, index, options) => (
            <Option
              key={`${option}-${index}`}
              type={type}
              id={id}
              index={index}
              optionText={option}
              length={options.length}
            />
          ))}
        </View>
        <Button
          title="옵션 추가"
          variant="outlined"
          color={colors.greyDark}
          onPress={handlePressAddOption}
        />
      </View>
    </CardWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  questionInput: {
    fontSize: 16,
    fontWeight: '500',
    backgroundColor: colors.greyLight,
  },
  questionInputContainer: {
    marginBottom: 10,
  },
  optionContainer: {
    marginVertical: 10,
  },
})
