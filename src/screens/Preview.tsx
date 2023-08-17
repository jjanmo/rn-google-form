import { Alert, ScrollView, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { FormProvider, useForm } from 'react-hook-form'
import { FontAwesome } from '@expo/vector-icons'
import { RootState } from '@store/root'
import { CardType } from '@store/slice/cardSlice.type'
import { InputCheckbox, InputRadio, InputTextField } from '@components/Form'
import Layout from '@components/Layout'
import TitleView from '@components/TitleView'
import Button, { ButtonCustomStyles } from '@components/Button'
import { colors } from '@styles/theme'

interface FormData {
  [key: string]: string | boolean[]
}

export default function Preview() {
  const cards = useSelector<RootState, CardType[]>((state) => state.cards.data)

  const methods = useForm()
  const onSubmit = (data: FormData) => {
    console.log('🤬', data)

    // dispatch response
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
          {cards.map((card, index) => {
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
    width: 80,
    paddingVertical: 8,
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
