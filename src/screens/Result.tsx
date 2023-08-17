import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import ActionNotice from '@components/ActionNotice'
import { RootState } from '@store/root'
import { isSurveyCard } from '@store/helper'
import { AnswerState, answerActions } from '@store/slice/answerSlice'
import { SurveyCardType, SurveyCardTypeKey } from '@store/slice/cardSlice.type'
import Button, { ButtonCustomStyles } from '@components/Button'
import Layout from '@components/Layout'
import { colors } from '@styles/theme'

export default function Result() {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const answers = useSelector<RootState, AnswerState['data']>((state) => state.answers.data)
  const prevCards = useSelector<RootState, SurveyCardType[]>((state) => state.answers.prevCards)

  if (prevCards.length < 2)
    return (
      <Layout>
        <ActionNotice
          message="설문지를 생성하지 않았습니다. 😜"
          actionText="설문지 생성하러 가기"
          action={() => navigation.navigate('Home')}
        />
      </Layout>
    )
  if (Object.keys(answers).length === 0)
    return (
      <Layout>
        <ActionNotice
          message="설문지를 작성하지 않았습니다. 😇"
          actionText="설문지 작성하러 가기"
          action={() => navigation.navigate('Preview')}
        />
      </Layout>
    )

  const handlePressReset = () => {
    dispatch(answerActions.resetAnswers())
  }

  return (
    <Layout>
      <Text style={styles.title}>응답 확인</Text>
      <View style={styles.buttonContainer}>
        <Button buttonText="응답 초기화" onPress={handlePressReset} styles={resetCustomStyles} />
      </View>
      <ScrollView style={styles.listContainer}>
        {prevCards.map((card, index) => {
          if (isSurveyCard(card)) {
            const { id, options, question, type } = card

            const selectAnswer = getOptionResponse(type, answers[id], options)

            return (
              <View key={id}>
                <Text style={styles.label}>{`질문 ${index + 1}`}</Text>
                <View style={styles.questionContainer}>
                  <Text style={styles.question}>{question || '질문'}</Text>
                  {card.required && <Text style={styles.required}>*</Text>}
                </View>
                <View style={styles.answerContainer}>
                  {Array.isArray(selectAnswer) ? (
                    selectAnswer.map((answer, index) => (
                      <View key={index}>
                        <Text>{answer}</Text>
                      </View>
                    ))
                  ) : (
                    <Text>{selectAnswer || '응답안함'}</Text>
                  )}
                </View>
              </View>
            )
          }

          return null
        })}
      </ScrollView>
    </Layout>
  )
}

function getOptionResponse(
  type: SurveyCardTypeKey,
  response: string | boolean[],
  options: SurveyCardType['options']
) {
  if (type === 'checkbox') {
    if (Array.isArray(response)) {
      const result = response.reduce<string[]>((acc, cur, i) => {
        if (cur) return [...acc, options[i].text]
        return acc
      }, [])
      return result.length === 0 ? '' : result
    }
  }
  if (type === 'radio' && response) {
    return options.filter((option) => option.id === response)?.[0].text || ''
  }

  return response || ''
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 5,
  },
  buttonContainer: {
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  label: {
    marginVertical: 10,
    paddingVertical: 6,
    color: colors.greyDark,
    backgroundColor: colors.blueLight,
  },
  questionContainer: {
    flexDirection: 'row',
  },
  question: {
    fontSize: 18,
    color: colors.greyDark,
  },
  required: {
    color: colors.red,
    fontSize: 18,
  },
  answerContainer: {
    marginVertical: 10,
  },
})

const resetCustomStyles: ButtonCustomStyles = {
  button: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginRight: 20,
    backgroundColor: colors.greyLight,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.greyDark,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 14,
    color: colors.greyDark,
    marginRight: 5,
  },
}
