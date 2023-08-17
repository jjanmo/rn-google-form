import { StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '@styles/theme'

interface Props {
  message: string
}

export default function ErrorNotice({ message }: Props) {
  return (
    <View style={styles.container}>
      <MaterialIcons name="error-outline" size={18} color={colors.red} />
      <Text style={styles.error}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  error: {
    marginLeft: 5,
    color: colors.red,
  },
})
