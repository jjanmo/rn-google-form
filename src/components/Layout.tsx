import { SafeAreaView, StyleSheet, View } from 'react-native'
import { PropsWithChildren } from 'react'
import { colors } from '@styles/theme'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>{children}</View>
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
})
