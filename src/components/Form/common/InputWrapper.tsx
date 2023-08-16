import { PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '@styles/theme'

export default function InputWrapper({ children }: PropsWithChildren) {
  return <View style={styles.container}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginVertical: 10,
    backgroundColor: colors.white,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
})
