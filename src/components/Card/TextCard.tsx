import { Text, TextInput } from '@react-native-material/core'
import { StyleSheet, View } from 'react-native'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { RootState } from '@store/root'
import { SurveyCardType } from '@store/slice/cardSlice.type'
import { cardActions } from '@store/slice/cardSlice'
import CardTypeSelector from '@components/CardTypeSelector'
import { colors } from '@styles/theme'
import CardWrapper from './CardWrapper'

export default function TextCard({ id, question, type, required }: SurveyCardType) {
  const activeCard = useSelector<RootState, string>((state) => state.cards.activeCard, shallowEqual)
  const dispatch = useDispatch()

  const handleChangeQuestion = (text: string) => {
    dispatch(cardActions.editSurveyCardQuestion({ id, question: text }))
  }

  return (
    <CardWrapper id={id}>
      {activeCard === id && (
        <View style={styles.container}>
          <TextInput
            value={question}
            onChangeText={handleChangeQuestion}
            placeholder="질문"
            variant="filled"
            inputStyle={styles.questionInput}
            inputContainerStyle={styles.questionInputContainer}
            selectionColor="grey"
            color={colors.purpleDark}
          />
          <CardTypeSelector id={id} type={type} />
          <View style={[styles.readOnlyAnswerContainer, type === 'short' ? styles.half : null]}>
            <Text style={styles.readOnlyAnswerText}>
              {type === 'short' ? '단답형 텍스트' : '장문형 텍스트'}
            </Text>
          </View>
        </View>
      )}
      {activeCard !== id && (
        <View style={styles.readonlyContainer}>
          <View style={styles.readOnlyQuestionContainer}>
            <Text style={styles.readOnlyQuestion}>{question || '질문'}</Text>
            {required && <Text style={styles.required}>*</Text>}
          </View>
          <View style={[styles.readOnlyAnswerContainer, type === 'short' ? styles.half : null]}>
            <Text style={styles.readOnlyAnswerText}>
              {type === 'short' ? '단답형 텍스트' : '장문형 텍스트'}
            </Text>
          </View>
        </View>
      )}
    </CardWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  questionInputContainer: {
    marginBottom: 10,
  },
  questionInput: {
    fontSize: 20,
    fontWeight: '500',
    backgroundColor: colors.greyLight,
  },

  readonlyContainer: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 25,
  },
  readOnlyQuestionContainer: {
    flexDirection: 'row',
  },
  readOnlyQuestion: {
    fontSize: 20,
  },
  readOnlyAnswerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.greyDark,
  },
  readOnlyAnswerText: {
    color: colors.greyDark,
  },
  half: {
    width: '50%',
  },
  required: {
    color: colors.red,
    fontSize: 18,
  },
})
