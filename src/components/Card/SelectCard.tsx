import { StyleSheet, View } from 'react-native'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Button, Text, TextInput } from '@react-native-material/core'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { SurveyCardType } from '@store/slice/cardSlice.type'
import { cardActions } from '@store/slice/cardSlice'
import { RootState } from '@store/root'
import CardTypeSelector from '@components/Card/common/CardTypeSelector'
import Option from '@components/Card/common/Option'
import { colors } from '@styles/theme'
import CardWrapper from './common/CardWrapper'

export default function SelectCard({ id, type, question, options, required }: SurveyCardType) {
  const activeCard = useSelector<RootState, string>((state) => state.cards.activeCard, shallowEqual)
  const dispatch = useDispatch()

  const handleChangeQuestion = (text: string) => {
    dispatch(cardActions.editSurveyCardQuestion({ question: text, id }))
  }
  const handlePressAddOption = () => {
    dispatch(cardActions.addOption({ id }))
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
            selectionColor={colors.greyDark}
            color={colors.purpleDark}
          />

          <CardTypeSelector id={id} type={type} />

          <View style={styles.optionsContainer}>
            {options.map((option, index, options) => (
              <Option
                key={option.id}
                type={type}
                id={id}
                index={index}
                optionText={option.text}
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
      )}

      {activeCard !== id && (
        <View style={styles.container}>
          <View style={styles.readOnlyQuestionContainer}>
            <Text style={styles.readOnlyQuestionText}>{question || '질문'}</Text>
            {required && <Text style={styles.required}>*</Text>}
          </View>
          <View style={styles.readOnlyOptionsContainer}>
            {options.map((option, index) => (
              <View key={option.id} style={styles.readOnlyOptionContainer}>
                {type === 'checkbox' ? (
                  <MaterialCommunityIcons
                    name="checkbox-blank-outline"
                    size={20}
                    color={colors.greyDark}
                  />
                ) : (
                  <MaterialCommunityIcons name="radiobox-blank" size={20} color={colors.greyDark} />
                )}
                <Text style={styles.readOnlyOptionText}>{option.text || `옵션 ${index}`}</Text>
              </View>
            ))}
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
    paddingHorizontal: 30,
  },
  questionInputContainer: {
    marginBottom: 10,
  },
  questionInput: {
    fontSize: 20,
    fontWeight: '500',
    backgroundColor: colors.greyLight,
  },
  readOnlyQuestionContainer: {
    flexDirection: 'row',
  },
  readOnlyQuestionText: {
    fontSize: 20,
  },
  optionsContainer: {
    marginVertical: 10,
  },
  readOnlyOptionsContainer: {
    marginTop: 20,
  },
  readOnlyOptionContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  readOnlyOptionText: {
    marginLeft: 6,
  },
  required: {
    color: colors.red,
    fontSize: 18,
  },
})
