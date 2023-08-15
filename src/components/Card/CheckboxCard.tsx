import { Text } from '@react-native-material/core'
import { StyleSheet, View } from 'react-native'
import CardWrapper from './CardWrapper'

export default function CheckboxCard() {
  return (
    <CardWrapper>
      <View style={styles.container}>
        <Text>체크박스 뷰</Text>
      </View>
    </CardWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 100,
  },
})
