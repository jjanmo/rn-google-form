import { Text } from '@react-native-material/core'
import { StyleSheet, View } from 'react-native'
import CardWrapper from './CardWrapper'

export default function RadioCard() {
  return (
    <CardWrapper>
      <View style={styles.container}>
        <Text>Radio 뷰</Text>
      </View>
    </CardWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 100,
  },
})
