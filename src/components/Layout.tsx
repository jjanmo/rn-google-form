import { PropsWithChildren } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { colors } from '@styles/theme'
import { useDispatch } from 'react-redux'
import { cardActions } from '@store/slice/cardSlice'
import { Button } from '@react-native-material/core'

export default function Layout({ children }: PropsWithChildren) {
  const dispatch = useDispatch()

  const handlePress = () => {
    console.log('aaaa')
    dispatch(cardActions.addCard())
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Button onPress={handlePress} title="+" />
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
    alignItems: 'center',
  },
})
