import { PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '../styles'

export default function Layout({ children }: PropsWithChildren) {
  return <View style={styles.container}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: colors.purpleLight,
  },
})
