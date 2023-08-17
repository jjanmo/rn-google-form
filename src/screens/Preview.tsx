import { Alert, ScrollView, StyleSheet, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'
import { RootState } from '@store/root'
import { CardType } from '@store/slice/cardSlice.type'
import { isSurveyCard } from '@store/helper'
import { FormData, answerActions } from '@store/slice/answerSlice'
import { InputCheckbox, InputRadio, InputTextField } from '@components/Form'
import Layout from '@components/Layout'
import TitleView from '@components/TitleView'
import Button, { ButtonCustomStyles } from '@components/Button'
import { colors } from '@styles/theme'

export default function Preview() {
  const cards = useSelector<RootState, CardType[]>((state) => state.cards.data)
  const dispatch = useDispatch()
  const methods = useForm()
  const navigation = useNavigation()

  const onSubmit = (data: FormData) => {
    if (cards.length <= 1) return Alert.alert('설문지를 생성 후 제출할 수 있습니다.')

    Alert.alert('설문 응답을 제출합니다.', '설문을 제출하면 기존 응답은 삭제됩니다.', [
      {
        text: '취소',
      },
      {
        text: '제출',
        onPress: () => {
          dispatch(answerActions.updateAnswers({ data }))
          dispatch(answerActions.copyPrevCards({ cards: cards.filter(isSurveyCard) }))
          navigation.navigate('Result')
          methods.reset()
        },
      },
    ])
  }

  return (
    <Layout>
      <FormProvider {...methods}>
        <View style={styles.buttonContainer}>
          <Button
            buttonText="제출"
            onPress={methods.handleSubmit(onSubmit)}
            renderIcon={() => <FontAwesome name="paper-plane" size={16} color={colors.white} />}
            styles={buttonCustomStyles}
          />
        </View>
        <ScrollView contentContainerStyle={styles.scrollview}>
          {cards.map((card) => {
            if (card.type === 'title') return <TitleView key={card.id} {...card} />
            if (card.type === 'checkbox') return <InputCheckbox key={card.id} {...card} />
            if (card.type === 'radio') return <InputRadio key={card.id} {...card} />
            if (card.type === 'long' || card.type === 'short')
              return <InputTextField key={card.id} {...card} />
          })}
        </ScrollView>
      </FormProvider>
    </Layout>
  )
}

const styles = StyleSheet.create({
  scrollview: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
})

const buttonCustomStyles: ButtonCustomStyles = {
  button: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: colors.purpleDark,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: colors.white,
    marginRight: 10,
  },
}
