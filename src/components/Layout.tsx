import {
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { PropsWithChildren } from 'react'
import { useDispatch } from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons'
import { cardActions } from '@store/slice/cardSlice'
import { colors } from '@styles/theme'
import Button, { ButtonCustomStyles } from './Button'

export default function Layout({ children }: PropsWithChildren) {
  const dispatch = useDispatch()

  const handlePressAdd = () => {
    dispatch(cardActions.addCard())
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Button
          buttonText="항목 추가"
          onPress={handlePressAdd}
          renderIcon={() => (
            <MaterialIcons name="add-circle-outline" size={20} color={colors.greyDark} />
          )}
          styles={buttonCustomStyles}
        />
        <ScrollView contentContainerStyle={styles.scrollview}>{children}</ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: colors.purpleLight,
  },
  scrollview: {
    paddingBottom: 30,
    marginVertical: 20,
    alignItems: 'center',
  },
})

const buttonCustomStyles: ButtonCustomStyles = {
  button: {
    paddingVertical: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: colors.purple,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: colors.greyDark,
  },
}
