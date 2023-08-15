import { StyleSheet, View } from 'react-native'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Button, Text, TextInput } from '@react-native-material/core'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { SurveyCardType } from '@store/slice/cardSlice.type'
import { cardActions } from '@store/slice/cardSlice'
import { RootState } from '@store/root'
import CardTypeSelector from '@components/CardTypeSelector'
import Option from '@components/Option'
import { colors } from '@styles/theme'
import CardWrapper from './CardWrapper'

export default function RadioCard({ id, type, question, options }: SurveyCardType) {
  const activeCard = useSelector<RootState, string>((state) => state.cards.activeCard, shallowEqual)
  const dispatch = useDispatch()

  const handleChangeQuestion = (text: string) => {
    dispatch(cardActions.editSurveyCardText({ question: text, id }))
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
          <CardTypeSelector id={id} />
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
          <Text style={styles.readOnlyQuestionText}>{question || '질문'}</Text>
          <View style={styles.readOnlyOptionsContainer}>
            {options.map((option, index) => (
              <View key={option.id} style={styles.readOnlyOptionContainer}>
                {type === 'checkbox' ? (
                  <MaterialCommunityIcons
                    name="checkbox-blank-outline"
                    size={24}
                    color={colors.greyDark}
                  />
                ) : (
                  <MaterialCommunityIcons name="radiobox-blank" size={24} color={colors.greyDark} />
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
    marginLeft: 10,
  },
})
