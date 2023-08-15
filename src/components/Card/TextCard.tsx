import { Text } from '@react-native-material/core'
import { StyleSheet, View } from 'react-native'
import CardWrapper from './CardWrapper'

export default function ShortCard() {
  return (
    <CardWrapper>
      <View style={styles.container}>
        <Text>Short 뷰</Text>
      </View>
    </CardWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 100,
  },
})
